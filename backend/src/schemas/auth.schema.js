import { z } from "zod";
import { emailSchema, nomeSchema, senhaForteSchema, telefoneSchema } from "./comum.schema.js";

export const cadastroSchema = z
  .object({
    nome: nomeSchema,
    email: emailSchema,
    telefone: telefoneSchema,
    senha: senhaForteSchema,
    confirmacaoSenha: z.string({ error: "Confirme a senha." }),
  })
  .refine((d) => d.senha === d.confirmacaoSenha, {
    error: "As senhas não conferem.",
    path: ["confirmacaoSenha"],
  });

export const loginSchema = z.object({
  email: emailSchema,
  senha: z.string({ error: "Informe a senha." }).min(1, "Informe a senha."),
});
