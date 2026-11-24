import createError from "http-errors";
import { prisma } from "../lib/prisma.js";
import { removerUpload } from "../middlewares/upload.js";
import { num, STATUS_PERMITE_AVALIAR } from "../utils/regras.js";

/** Decimal -> number e caminho da foto -> URL pública */
function formatarProduto(p, notas) {
  const resumo = notas?.get(p.id);
  return {
    ...p,
    preco: num(p.preco),
    precoDesconto: num(p.precoDesconto),
    fotoCapa: p.fotoCapa ? `/uploads/${p.fotoCapa}` : null,
    notaMedia: resumo?.media ?? null,
    totalAvaliacoes: resumo?.total ?? 0,
  };
}

/** Média e quantidade de avaliações por produto (Map produtoId -> {media, total}) */
async function resumoNotas(ids) {
  if (!ids.length) return new Map();
  const grupos = await prisma.avaliacao.groupBy({
    by: ["produtoId"],
    where: { produtoId: { in: ids } },
    _avg: { nota: true },
    _count: { _all: true },
  });
  return new Map(
    grupos.map((g) => [g.produtoId, { media: Math.round(num(g._avg.nota) * 10) / 10, total: g._count._all }])
  );
}

const ORDENACAO = {
  relevancia: [{ emDestaque: "desc" }, { id: "asc" }], // no MySQL, NULL fica por último no DESC
  recentes: [{ id: "desc" }],
  "menor-preco": [{ precoDesconto: "asc" }],
  "maior-preco": [{ precoDesconto: "desc" }],
  avaliacao: [{ id: "asc" }], // ordenado depois, em memória
};

export async function listarProdutos({ busca, categoria, ordem, destaque, limite }) {
  const where = {
    ...(categoria ? { categoria } : {}),
    ...(destaque ? { emDestaque: { not: null } } : {}),
    ...(busca
      ? { OR: [{ nome: { contains: busca } }, { descricao: { contains: busca } }, { categoria: { contains: busca } }] }
      : {}),
  };

  const produtos = await prisma.produto.findMany({
    where,
    orderBy: destaque ? [{ emDestaque: "desc" }] : ORDENACAO[ordem],
    take: ordem === "avaliacao" ? undefined : limite,
  });

  const notas = await resumoNotas(produtos.map((p) => p.id));
  let lista = produtos.map((p) => formatarProduto(p, notas));

  if (ordem === "avaliacao") {
    lista.sort((a, b) => (b.notaMedia ?? 0) - (a.notaMedia ?? 0));
    if (limite) lista = lista.slice(0, limite);
  }
  return lista;
}

export async function listarCategorias() {
  const grupos = await prisma.produto.groupBy({
    by: ["categoria"],
    where: { categoria: { not: null } },
    orderBy: { categoria: "asc" },
  });
  return grupos.map((g) => g.categoria);
}

/** usuarioId (opcional): quando logado, informa se ele pode avaliar o produto */
export async function buscarProduto(id, usuarioId) {
  const produto = await prisma.produto.findUnique({
    where: { id },
    include: {
      avaliacoes: {
        orderBy: { data: "desc" },
        include: { usuario: { select: { id: true, nome: true } } },
      },
    },
  });
  if (!produto) throw createError(404, "Produto não encontrado.");

  const { avaliacoes, ...resto } = produto;
  const notas = await resumoNotas([id]);
  return {
    ...formatarProduto(resto, notas),
    podeAvaliar: usuarioId ? await podeAvaliar(usuarioId, id) : false,
    avaliacoes: avaliacoes.map((a) => ({
      usuarioId: a.usuarioId,
      nome: a.usuario.nome,
      nota: num(a.nota),
      data: a.data,
    })),
  };
}

export async function criarProduto(dados, fotoCapa) {
  const produto = await prisma.produto.create({ data: { ...dados, fotoCapa } });
  return formatarProduto(produto);
}

export async function atualizarProduto(id, dados, novaFoto) {
  const atual = await prisma.produto.findUnique({ where: { id }, select: { fotoCapa: true } });
  if (!atual) throw createError(404, "Produto não encontrado.");

  const produto = await prisma.produto.update({
    where: { id },
    data: { ...dados, ...(novaFoto ? { fotoCapa: novaFoto } : {}) },
  });
  if (novaFoto && atual.fotoCapa?.startsWith("produtos/")) removerUpload(atual.fotoCapa);
  return formatarProduto(produto);
}

export async function removerProduto(id) {
  const vendidos = await prisma.itemPedido.count({ where: { produtoId: id } });
  if (vendidos) throw createError(409, "Este produto já tem pedidos e não pode ser excluído.");

  const produto = await prisma.$transaction(async (tx) => {
    await tx.avaliacao.deleteMany({ where: { produtoId: id } });
    return tx.produto.delete({ where: { id } });
  });
  removerUpload(produto.fotoCapa);
}

/** O usuário só pode avaliar produtos que vieram em algum pedido dele já entregue */
export async function podeAvaliar(usuarioId, produtoId) {
  const comprados = await prisma.itemPedido.count({
    where: { produtoId, pedido: { usuarioId, status: { in: STATUS_PERMITE_AVALIAR } } },
  });
  return comprados > 0;
}

/** Uma avaliação por usuário/produto (PK composta): enviar de novo atualiza a nota */
export async function avaliarProduto(usuarioId, produtoId, nota) {
  const existe = await prisma.produto.count({ where: { id: produtoId } });
  if (!existe) throw createError(404, "Produto não encontrado.");
  if (!(await podeAvaliar(usuarioId, produtoId))) {
    throw createError(403, "Só é possível avaliar produtos que você já comprou e recebeu.");
  }

  const avaliacao = await prisma.avaliacao.upsert({
    where: { usuarioId_produtoId: { usuarioId, produtoId } },
    create: { usuarioId, produtoId, nota },
    update: { nota, data: new Date() },
  });
  return { ...avaliacao, nota: num(avaliacao.nota) };
}
