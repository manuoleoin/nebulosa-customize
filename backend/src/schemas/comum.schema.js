import { z } from "zod";

export const idParamSchema = z.object({
  id: z.coerce.number({ error: "ID inválido." }).int().positive("ID inválido."),
});

export const nomeSchema = z
  .string({ error: "Informe o nome." })
  .trim()
  .min(3, "Informe o nome completo.")
  .max(100, "Máximo de 100 caracteres.")
  .refine((n) => n.split(/\s+/).length >= 2, "Informe nome e sobrenome.");

export const emailSchema = z
  .email({ error: "Informe um e-mail válido." })
  .trim()
  .toLowerCase()
  .max(255, "Máximo de 255 caracteres.");

/** Aceita qualquer formato e normaliza para (11) 98765-4321 */
export const telefoneSchema = z
  .string({ error: "Informe o telefone." })
  .transform((t) => t.replace(/\D/g, ""))
  .refine((d) => d.length === 10 || d.length === 11, "Informe um telefone com DDD.")
  .transform((d) =>
    d.length === 11 ? `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}` : `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`
  );

// bcrypt considera só os primeiros 72 bytes
export const senhaForteSchema = z
  .string({ error: "Informe a senha." })
  .min(8, "Mínimo de 8 caracteres.")
  .max(72, "Máximo de 72 caracteres.")
  .regex(/[a-z]/i, "Use pelo menos uma letra.")
  .regex(/\d/, "Use pelo menos um número.");
