// Regras de negócio compartilhadas

export const FRETE_GRATIS_A_PARTIR = 199;
export const FRETE_PADRAO = 19.9;

// "ENUMs" guardados como VARCHAR no banco. Lista completa no README da raiz.

/** pedido.status — fluxo normal: pendente → pago → em produção → enviado → entregue */
export const STATUS_PEDIDO = [
  "pendente", // aguardando pagamento (status inicial de todo pedido)
  "pago", // pagamento confirmado
  "em produção", // personalização sendo feita no ateliê
  "enviado", // entregue à transportadora
  "entregue", // recebido pelo cliente
  "cancelado", // cancelado antes do envio (pagamento recusado/expirado ou desistência)
  "devolução solicitada", // cliente pediu devolução depois de receber
  "devolvido", // produto voltou e o valor foi reembolsado
];

/** Pedidos nesses status já chegaram ao cliente: os produtos deles podem ser avaliados */
export const STATUS_PERMITE_AVALIAR = ["entregue", "devolução solicitada", "devolvido"];

/** produto.categoria */
export const CATEGORIAS_PRODUTO = ["Acessórios", "Casa", "Garrafas e copos", "Informática", "Papelaria", "Vestuário"];

/** usuario.tipo */
export const TIPO_USUARIO = { CLIENTE: "cliente", ADMIN: "admin" };

/** Frete fixo, grátis a partir de R$ 199. Retorna null quando grátis (pedido.frete é NULL). */
export function calcularFrete(subtotal) {
  return subtotal >= FRETE_GRATIS_A_PARTIR ? null : FRETE_PADRAO;
}

/** Arredonda em centavos para evitar 0.1 + 0.2 */
export const centavos = (valor) => Math.round(valor * 100) / 100;

/** Converte Decimal do Prisma (ou null) em number */
export const num = (decimal) => (decimal == null ? null : Number(decimal));
