import { useEffect, useState } from "react";

/** Atrasa a atualização de um valor (ex.: busca enquanto digita) */
export function useDebounce(valor, atraso = 350) {
  const [atrasado, setAtrasado] = useState(valor);
  useEffect(() => {
    const t = setTimeout(() => setAtrasado(valor), atraso);
    return () => clearTimeout(t);
  }, [valor, atraso]);
  return atrasado;
}
