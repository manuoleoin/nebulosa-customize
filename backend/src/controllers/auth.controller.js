import { cadastroSchema, loginSchema } from "../schemas/auth.schema.js";
import * as authService from "../services/auth.service.js";
import { definirCookieToken, gerarToken, limparCookieToken } from "../services/token.service.js";

// POST /api/auth/cadastro
export async function cadastrar(req, res) {
  const dados = cadastroSchema.parse(req.body);
  const usuario = await authService.cadastrar(dados);
  definirCookieToken(res, await gerarToken(usuario)); // já entra logado
  res.status(201).json(usuario);
}

// POST /api/auth/login
export async function login(req, res) {
  const dados = loginSchema.parse(req.body);
  const usuario = await authService.login(dados);
  definirCookieToken(res, await gerarToken(usuario));
  res.json(usuario);
}

// POST /api/auth/logout
export function logout(req, res) {
  limparCookieToken(res);
  res.status(204).end();
}

// GET /api/auth/me  -> usuário logado ou null (sem 401, para o site checar a sessão ao abrir)
export function me(req, res) {
  res.json(req.usuario ?? null);
}
