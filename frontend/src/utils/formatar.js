export const brl = (valor) => Number(valor).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export const dataBR = (iso, comHora = false) => {
  if (!iso) return "—";
  const d = new Date(iso);
  return comHora
    ? d.toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" })
    : d.toLocaleDateString("pt-BR");
};

export const iniciais = (nome = "") =>
  nome
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

export const primeiroNome = (nome = "") => nome.trim().split(/\s+/)[0];

export function mascaraTelefone(valor) {
  const d = valor.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

export function mascaraCep(valor) {
  const d = valor.replace(/\D/g, "").slice(0, 8);
  return d.length > 5 ? `${d.slice(0, 5)}-${d.slice(5)}` : d;
}

/** Só aceita caminhos internos no ?volta= (evita open redirect) */
export const destinoSeguro = (volta) => (volta && volta.startsWith("/") && !volta.startsWith("//") ? volta : null);
