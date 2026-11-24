import { useEffect } from "react";
import { useLocation } from "react-router";

/** Volta ao topo ao trocar de página; se houver #âncora, rola até ela */
export default function RolarParaTopo() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const alvo = hash && document.getElementById(hash.slice(1));
    // não usar `return alvo.scrollIntoView()`: nos navegadores novos ele devolve uma Promise,
    // e o React trata o retorno do useEffect como função de limpeza ("destroy is not a function")
    if (alvo) alvo.scrollIntoView();
    else window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
