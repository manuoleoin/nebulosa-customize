import createError from "http-errors";
import { prisma } from "../lib/prisma.js";
import { calcularFrete, centavos, num } from "../utils/regras.js";

const incluirItens = {
  itens: {
    include: { produto: { select: { id: true, nome: true, fotoCapa: true } } },
  },
};

function formatarPedido(p) {
  const itens = p.itens.map((i) => ({
    produtoId: i.produtoId,
    nome: i.produto.nome,
    fotoCapa: i.produto.fotoCapa ? `/uploads/${i.produto.fotoCapa}` : null,
    quantidade: i.quantidade,
    preco: num(i.preco),
    subtotal: centavos(num(i.preco) * i.quantidade),
  }));
  return {
    ...p,
    frete: num(p.frete),
    total: num(p.total),
    subtotal: centavos(itens.reduce((s, i) => s + i.subtotal, 0)),
    itens,
  };
}

export async function listarPedidosDoUsuario(usuarioId) {
  const pedidos = await prisma.pedido.findMany({
    where: { usuarioId },
    orderBy: { data: "desc" },
    include: incluirItens,
  });
  return pedidos.map(formatarPedido);
}

export async function buscarPedidoDoUsuario(id, usuarioId) {
  const pedido = await prisma.pedido.findFirst({ where: { id, usuarioId }, include: incluirItens });
  if (!pedido) throw createError(404, "Pedido não encontrado.");
  return formatarPedido(pedido);
}

/** pedido.endereco é VARCHAR(255): junta os campos em uma linha */
function montarEndereco(e) {
  const complemento = e.complemento ? `, ${e.complemento}` : "";
  return `${e.destinatario} — ${e.rua}, ${e.numero}${complemento} - ${e.bairro}, ${e.cidade}/${e.uf} - CEP ${e.cep}`.slice(0, 255);
}

/**
 * Cria o pedido com status "pendente".
 * Os preços vêm SEMPRE do banco (precoDesconto), nunca do cliente.
 */
export async function criarPedido(usuarioId, { endereco, metodoPagamento, parcelas, itens }) {
  const ids = itens.map((i) => i.produtoId);
  const produtos = await prisma.produto.findMany({
    where: { id: { in: ids } },
    select: { id: true, precoDesconto: true },
  });

  if (produtos.length !== ids.length) {
    throw createError(400, "Algum produto do carrinho não está mais disponível.");
  }

  const precoPorId = new Map(produtos.map((p) => [p.id, num(p.precoDesconto)]));
  const linhas = itens.map((i) => ({
    produtoId: i.produtoId,
    quantidade: i.quantidade,
    preco: precoPorId.get(i.produtoId),
  }));

  const subtotal = centavos(linhas.reduce((s, l) => s + l.preco * l.quantidade, 0));
  const frete = calcularFrete(subtotal);
  const total = centavos(subtotal + (frete ?? 0));

  const pedido = await prisma.pedido.create({
    data: {
      usuarioId,
      endereco: montarEndereco(endereco),
      metodoPagamento: metodoPagamento === "Cartão de crédito" ? `Cartão de crédito (${parcelas}x)` : metodoPagamento,
      frete,
      total,
      status: "pendente", // demais status: alterados pelo Prisma Studio
      itens: { create: linhas },
    },
    include: incluirItens,
  });

  return formatarPedido(pedido);
}
