import createError from "http-errors";
import { env } from "../config/env.js";
import { verificarToken } from "../services/token.service.js";
import { buscarUsuarioPorId } from "../services/usuario.service.js";
import { TIPO_USUARIO } from "../utils/regras.js";

async function usuarioDoCookie(req) {
  const token = req.cookies?.[env.COOKIE_NAME];
  if (!token) return null;
  try {
    const payload = await verificarToken(token);
    // busca no banco: garante que a conta ainda existe e traz dados atualizados
    return await buscarUsuarioPorId(Number(payload.sub));
  } catch {
    return null; // token inválido ou expirado
  }
}

/** Exige usuário logado. Disponibiliza req.usuario (sem a senha). */
export async function autenticar(req, res, next) {
  const usuario = await usuarioDoCookie(req);
  if (!usuario) return next(createError(401, "Faça login para continuar."));
  req.usuario = usuario;
  next();
}

/** Não exige login, mas preenche req.usuario quando houver sessão. */
export async function autenticarOpcional(req, res, next) {
  req.usuario = await usuarioDoCookie(req);
  next();
}

/** Usar depois de `autenticar`. */
export function exigirAdmin(req, res, next) {
  if (req.usuario?.tipo !== TIPO_USUARIO.ADMIN) {
    return next(createError(403, "Acesso restrito a administradores."));
  }
  next();
}
