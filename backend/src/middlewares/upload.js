import { randomUUID } from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import createError from "http-errors";
import multer from "multer";
import { env } from "../config/env.js";

export const PASTA_UPLOADS = path.resolve(env.UPLOAD_DIR);
const PASTA_PRODUTOS = path.join(PASTA_UPLOADS, "produtos");
fs.mkdirSync(PASTA_PRODUTOS, { recursive: true });

// SVG fica de fora de propósito: pode conter <script>
const TIPOS = { "image/jpeg": ".jpg", "image/png": ".png", "image/webp": ".webp" };

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, PASTA_PRODUTOS),
  // nome aleatório: nunca usar o nome enviado pelo cliente
  filename: (req, file, cb) => cb(null, `${randomUUID()}${TIPOS[file.mimetype]}`),
});

export const uploadImagemProduto = multer({
  storage,
  limits: { fileSize: env.UPLOAD_MAX_MB * 1024 * 1024, files: 1 },
  fileFilter: (req, file, cb) => {
    if (TIPOS[file.mimetype]) return cb(null, true);
    cb(createError(400, "Envie uma imagem JPG, PNG ou WEBP."));
  },
}).single("fotoCapa");

/** Caminho salvo em produto.fotoCapa (relativo a /uploads) */
export const caminhoRelativo = (file) => `produtos/${file.filename}`;

/** Remove um arquivo enviado (ex.: quando a validação falha depois do upload) */
export function removerUpload(relativo) {
  if (!relativo) return;
  const alvo = path.join(PASTA_UPLOADS, relativo);
  if (!alvo.startsWith(PASTA_UPLOADS)) return; // evita path traversal
  fs.rm(alvo, { force: true }, () => {});
}
