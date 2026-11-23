import { z } from "zod";

export const UFS = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"];
export const METODOS_PAGAMENTO = ["Pix", "Cartão de crédito", "Boleto"];

const obrigatorio = (msg, max = 100) => z.string({ error: msg }).trim().min(1, msg).max(max);

export const criarPedidoSchema = z
  .object({
    endereco: z.object({
      destinatario: obrigatorio("Informe quem vai receber."),
      cep: z
        .string({ error: "Informe o CEP." })
        .transform((c) => c.replace(/\D/g, ""))
        .refine((c) => c.length === 8, "CEP inválido.")
        .transform((c) => `${c.slice(0, 5)}-${c.slice(5)}`),
      rua: obrigatorio("Informe a rua."),
      numero: obrigatorio("Informe o número.", 10),
      complemento: z.string().trim().max(60).optional(),
      bairro: obrigatorio("Informe o bairro.", 60),
      cidade: obrigatorio("Informe a cidade.", 60),
      uf: z.enum(UFS, { error: "Selecione a UF." }),
    }),
    metodoPagamento: z.enum(METODOS_PAGAMENTO, { error: "Escolha a forma de pagamento." }),
    parcelas: z.coerce.number().int().min(1).max(3).default(1),
    itens: z
      .array(
        z.object({
          produtoId: z.coerce.number().int().positive(),
          quantidade: z.coerce.number().int().min(1, "Quantidade mínima é 1.").max(99, "Quantidade máxima é 99."),
        }),
        { error: "Envie os itens do pedido." }
      )
      .min(1, "O carrinho está vazio."),
  })
  .refine((d) => new Set(d.itens.map((i) => i.produtoId)).size === d.itens.length, {
    error: "Produto repetido no pedido.",
    path: ["itens"],
  });
