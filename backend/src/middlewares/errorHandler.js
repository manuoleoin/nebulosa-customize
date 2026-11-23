import createError, { isHttpError } from "http-errors";
import multer from "multer";
import { z } from "zod";
import { env } from "../config/env.js";

/** 404 para rotas inexistentes (registrar depois de todas as rotas) */
export function rotaNaoEncontrada(req, res, next) {
  next(createError(404, `Rota não encontrada: ${req.method} ${req.originalUrl}`));
}

// Erros conhecidos do Prisma -> HTTP
const ERROS_PRISMA = {
  P2002: [409, "Já existe um registro com esses dados."],
  P2003: [409, "Operação não permitida: o registro está vinculado a outros dados."],
  P2025: [404, "Registro não encontrado."],
};

const MENSAGENS_MULTER = {
  LIMIT_FILE_SIZE: `Arquivo muito grande (máximo ${env.UPLOAD_MAX_MB} MB).`,
  LIMIT_UNEXPECTED_FILE: "Campo de arquivo inesperado.",
};

/** Error handler global: toda exceção (inclusive async, no Express 5) cai aqui */
// eslint-disable-next-line no-unused-vars
export function errorHandler(err, req, res, next) {
  // 1. Validação (zod v4)
  if (err instanceof z.ZodError) {
    // { "campo": ["msg"], "endereco.cep": ["msg"] } — caminho completo para campos aninhados
    const erros = {};
    for (const issue of err.issues) {
      const campo = issue.path.join(".") || "_";
      (erros[campo] ??= []).push(issue.message);
    }
    return res.status(400).json({ mensagem: "Dados inválidos.", erros });
  }

  // 2. JSON malformado no body (o express.json lança um http-error 400 em inglês)
  if (err?.type === "entity.parse.failed") {
    return res.status(400).json({ mensagem: "JSON inválido no corpo da requisição." });
  }

  // 3. Erros HTTP lançados com http-errors (createError(404, "..."))
  if (isHttpError(err)) {
    const corpo = { mensagem: err.expose ? err.message : "Erro interno." };
    if (err.erros) corpo.erros = err.erros;
    return res.status(err.status).json(corpo);
  }

  // 4. Upload (multer)
  if (err instanceof multer.MulterError) {
    const status = err.code === "LIMIT_FILE_SIZE" ? 413 : 400;
    return res.status(status).json({ mensagem: MENSAGENS_MULTER[err.code] || err.message });
  }

  // 5. Prisma
  if (err?.name === "PrismaClientKnownRequestError" && ERROS_PRISMA[err.code]) {
    const [status, mensagem] = ERROS_PRISMA[err.code];
    return res.status(status).json({ mensagem });
  }

  // 6. Inesperado
  console.error(err);
  res.status(500).json({
    mensagem: "Erro interno do servidor.",
    ...(env.isProd ? {} : { detalhe: err?.message }),
  });
}
