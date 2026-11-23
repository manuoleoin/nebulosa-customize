// Regras de negócio compartilhadas

export const FRETE_GRATIS_A_PARTIR = 199;
export const FRETE_PADRAO = 19.9;

export const STATUS_PEDIDO = ["pendente", "pago", "em produção", "enviado", "entregue", "cancelado"];

export const TIPO_USUARIO = { CLIENTE: "cliente", ADMIN: "admin" };

/** Frete fixo, grátis a partir de R$ 199. Retorna null quando grátis (pedido.frete é NULL). */
export function calcularFrete(subtotal) {
  return subtotal >= FRETE_GRATIS_A_PARTIR ? null : FRETE_PADRAO;
}

/** Arredonda em centavos para evitar 0.1 + 0.2 */
export const centavos = (valor) => Math.round(valor * 100) / 100;

/** Converte Decimal do Prisma (ou null) em number */
export const num = (decimal) => (decimal == null ? null : Number(decimal));
