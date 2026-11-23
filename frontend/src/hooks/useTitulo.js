import { useEffect } from "react";

/** Define o <title> da aba */
export function useTitulo(titulo) {
  useEffect(() => {
    document.title = titulo ? `${titulo} — Nebulosa Costumize` : "Nebulosa Costumize — Produtos personalizados";
  }, [titulo]);
}
