import { SignJWT, jwtVerify } from "jose";
import { env } from "../config/env.js";

const segredo = new TextEncoder().encode(env.JWT_SECRET);
const ALG = "HS256";

/** Converte "7d", "12h", "30m", "45s" em milissegundos (para o maxAge do cookie) */
function duracaoEmMs(texto) {
  const m = /^(\d+)\s*([smhd])$/.exec(texto);
  if (!m) throw new Error(`JWT_EXPIRES_IN inválido: ${texto} (use 30m, 12h, 7d...)`);
  const fator = { s: 1e3, m: 6e4, h: 36e5, d: 864e5 }[m[2]];
  return Number(m[1]) * fator;
}

export const DURACAO_TOKEN_MS = duracaoEmMs(env.JWT_EXPIRES_IN);

/** Token único e simples: guarda só o id e o tipo do usuário */
export function gerarToken(usuario) {
  return new SignJWT({ tipo: usuario.tipo })
    .setProtectedHeader({ alg: ALG })
    .setSubject(String(usuario.id))
    .setIssuedAt()
    .setExpirationTime(env.JWT_EXPIRES_IN)
    .sign(segredo);
}

/** Retorna o payload ou lança erro se o token for inválido/expirado */
export async function verificarToken(token) {
  const { payload } = await jwtVerify(token, segredo, { algorithms: [ALG] });
  return payload;
}

export const opcoesCookie = {
  httpOnly: true, // inacessível ao JavaScript do navegador
  sameSite: "lax",
  secure: env.isProd, // só HTTPS em produção
  path: "/",
};

export function definirCookieToken(res, token) {
  res.cookie(env.COOKIE_NAME, token, { ...opcoesCookie, maxAge: DURACAO_TOKEN_MS });
}

export function limparCookieToken(res) {
  res.clearCookie(env.COOKIE_NAME, opcoesCookie);
}
