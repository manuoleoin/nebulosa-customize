import "dotenv/config";
import { z } from "zod";

// Valida as variáveis de ambiente na inicialização: falha cedo se faltar algo
const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(3000),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  CORS_ORIGIN: z.string().default("http://localhost:5173"),
  DATABASE_URL: z.string().startsWith("mysql://", "DATABASE_URL deve começar com mysql://"),
  JWT_SECRET: z.string().min(32, "JWT_SECRET precisa ter pelo menos 32 caracteres"),
  JWT_EXPIRES_IN: z.string().default("7d"),
  COOKIE_NAME: z.string().default("nebulosa_token"),
  UPLOAD_DIR: z.string().default("uploads"),
  UPLOAD_MAX_MB: z.coerce.number().positive().default(5),
});

const resultado = envSchema.safeParse(process.env);

if (!resultado.success) {
  console.error("❌ Variáveis de ambiente inválidas:\n" + z.prettifyError(resultado.error));
  process.exit(1);
}

export const env = {
  ...resultado.data,
  // aceita uma lista separada por vírgula
  CORS_ORIGIN: resultado.data.CORS_ORIGIN.split(",").map((o) => o.trim()),
  isProd: resultado.data.NODE_ENV === "production",
};
