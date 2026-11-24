// Mesmas regras do backend (src/utils/regras.js). O backend recalcula tudo no checkout.
export const FRETE_GRATIS_A_PARTIR = 199;
export const FRETE_PADRAO = 19.9;

export const calcularFrete = (subtotal) => (subtotal === 0 || subtotal >= FRETE_GRATIS_A_PARTIR ? 0 : FRETE_PADRAO);

/** Fluxo normal do pedido (linha do tempo no perfil) */
export const ETAPAS_PEDIDO = ["pendente", "pago", "em produção", "enviado", "entregue"];

/** Todos os valores de pedido.status (lista completa no README) */
export const ROTULO_STATUS = {
  pendente: "Aguardando pagamento",
  pago: "Pago",
  "em produção": "Em produção",
  enviado: "Enviado",
  entregue: "Entregue",
  cancelado: "Cancelado",
  "devolução solicitada": "Devolução solicitada",
  devolvido: "Devolvido",
};

/** Pedidos que já chegaram ao cliente: os produtos podem ser avaliados */
export const STATUS_PERMITE_AVALIAR = ["entregue", "devolução solicitada", "devolvido"];

export const UFS = ["AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"];
