import bcrypt from "bcryptjs";
import createError from "http-errors";
import { prisma } from "../lib/prisma.js";
import { TIPO_USUARIO } from "../utils/regras.js";
import { camposPublicos } from "./usuario.service.js";

export async function cadastrar({ nome, email, telefone, senha }) {
  const existe = await prisma.usuario.findUnique({ where: { email }, select: { id: true } });
  if (existe) {
    const erro = createError(409, "Este e-mail já está cadastrado.");
    erro.erros = { email: ["Este e-mail já está cadastrado. Que tal entrar?"] };
    throw erro;
  }

  return prisma.usuario.create({
    data: {
      nome,
      email,
      telefone,
      senha: await bcrypt.hash(senha, 10),
      tipo: TIPO_USUARIO.CLIENTE, // cadastro público sempre cria cliente
    },
    select: camposPublicos,
  });
}

export async function login({ email, senha }) {
  const usuario = await prisma.usuario.findUnique({ where: { email } });
  // mesma mensagem para e-mail ou senha errados (não revela quais e-mails existem)
  const ok = usuario && (await bcrypt.compare(senha, usuario.senha.trim()));
  if (!ok) throw createError(401, "E-mail ou senha incorretos.");

  const { senha: _senha, ...publico } = usuario;
  return publico;
}
