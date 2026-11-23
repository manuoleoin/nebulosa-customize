import { z } from "zod";
import { emailSchema, nomeSchema, senhaForteSchema, telefoneSchema } from "./comum.schema.js";

export const atualizarUsuarioSchema = z
  .object({
    nome: nomeSchema,
    email: emailSchema,
    telefone: telefoneSchema,
    senhaAtual: z.string({ error: "Confirme sua senha atual." }).min(1, "Confirme sua senha atual."),
    // opcionais: só troca a senha se vierem preenchidas
    novaSenha: z.union([senhaForteSchema, z.literal("")]).optional(),
    confirmacaoNovaSenha: z.string().optional(),
  })
  .refine((d) => !d.novaSenha || d.novaSenha === d.confirmacaoNovaSenha, {
    error: "As senhas não conferem.",
    path: ["confirmacaoNovaSenha"],
  });

export const excluirContaSchema = z.object({
  senha: z.string({ error: "Confirme sua senha." }).min(1, "Confirme sua senha."),
});
