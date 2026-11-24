import { z } from "zod";
import { CATEGORIAS_PRODUTO } from "../utils/regras.js";

export const ORDENS = ["relevancia", "recentes", "menor-preco", "maior-preco", "avaliacao"];

export const listarProdutosSchema = z.object({
  busca: z.string().trim().max(100).optional(),
  categoria: z.string().trim().max(100).optional(),
  ordem: z.enum(ORDENS).default("relevancia"),
  destaque: z.stringbool().optional(), // ?destaque=true
  limite: z.coerce.number().int().min(1).max(100).optional(),
});

const textoOpcional = (max) =>
  z
    .string()
    .trim()
    .max(max, `Máximo de ${max} caracteres.`)
    .optional()
    .transform((v) => v || null); // "" -> NULL

const preco = (campo) =>
  z.coerce.number({ error: `Informe o ${campo}.` }).positive(`O ${campo} deve ser maior que zero.`).max(99_999_999.99);

// Vem de multipart/form-data: tudo chega como string, por isso o coerce
export const produtoSchema = z
  .object({
    nome: z.string({ error: "Informe o nome." }).trim().min(2, "Informe o nome.").max(255),
    preco: preco("preço"),
    precoDesconto: preco("preço com desconto"),
    emDestaque: z
      .stringbool()
      .optional()
      // ausente = não altera | true = destaca agora | false = remove destaque
      .transform((v) => (v === undefined ? undefined : v ? new Date() : null)),
    descricao: textoOpcional(5000),
    cor: textoOpcional(45),
    tamanho: textoOpcional(45),
    // VARCHAR no banco, mas só aceita as categorias da lista (ver README)
    categoria: z
      .union([z.literal(""), z.enum(CATEGORIAS_PRODUTO, { error: `Categoria inválida. Use: ${CATEGORIAS_PRODUTO.join(", ")}.` })])
      .optional()
      .transform((v) => v || null),
  })
  .refine((d) => d.precoDesconto <= d.preco, {
    error: "O preço com desconto não pode ser maior que o preço.",
    path: ["precoDesconto"],
  });

export const avaliacaoSchema = z.object({
  nota: z.coerce
    .number({ error: "Escolha uma nota." })
    .min(1, "A nota mínima é 1.")
    .max(5, "A nota máxima é 5.")
    .multipleOf(0.5, "Use notas inteiras ou meia estrela."),
});
