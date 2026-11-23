import bcrypt from "bcryptjs";
import createError from "http-errors";
import { prisma } from "../lib/prisma.js";

// nunca devolver a senha
export const camposPublicos = { id: true, nome: true, email: true, telefone: true, tipo: true };

export function buscarUsuarioPorId(id) {
  return prisma.usuario.findUnique({ where: { id }, select: camposPublicos });
}

async function conferirSenha(id, senha) {
  const usuario = await prisma.usuario.findUnique({ where: { id }, select: { senha: true } });
  if (!usuario) throw createError(404, "Usuário não encontrado.");
  const ok = await bcrypt.compare(senha, usuario.senha.trim()); // CHAR(80) completa com espaços
  if (!ok) {
    const erro = createError(400, "Senha atual incorreta.");
    erro.erros = { senhaAtual: ["Senha atual incorreta."], senha: ["Senha incorreta."] };
    throw erro;
  }
}

export async function atualizarUsuario(id, dados) {
  await conferirSenha(id, dados.senhaAtual);

  const emailEmUso = await prisma.usuario.findFirst({
    where: { email: dados.email, NOT: { id } },
    select: { id: true },
  });
  if (emailEmUso) {
    const erro = createError(409, "Este e-mail já está em uso.");
    erro.erros = { email: ["Este e-mail já está em uso."] };
    throw erro;
  }

  return prisma.usuario.update({
    where: { id },
    data: {
      nome: dados.nome,
      email: dados.email,
      telefone: dados.telefone,
      ...(dados.novaSenha ? { senha: await bcrypt.hash(dados.novaSenha, 10) } : {}),
    },
    select: camposPublicos,
  });
}

/**
 * Exclui a conta. As FKs são NO ACTION, então removemos antes as avaliações,
 * os itens e os pedidos do usuário, tudo na mesma transação.
 */
export async function excluirUsuario(id, senha) {
  await conferirSenha(id, senha);

  await prisma.$transaction(async (tx) => {
    const pedidos = await tx.pedido.findMany({ where: { usuarioId: id }, select: { id: true } });
    const idsPedidos = pedidos.map((p) => p.id);
    await tx.avaliacao.deleteMany({ where: { usuarioId: id } });
    await tx.itemPedido.deleteMany({ where: { pedidoId: { in: idsPedidos } } });
    await tx.pedido.deleteMany({ where: { usuarioId: id } });
    await tx.usuario.delete({ where: { id } });
  });
}
