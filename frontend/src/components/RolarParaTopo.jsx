import { useEffect } from "react";
import { useLocation } from "react-router";

/** Volta ao topo ao trocar de página; se houver #âncora, rola até ela */
export default function RolarParaTopo() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const alvo = document.getElementById(hash.slice(1));
      if (alvo) return alvo.scrollIntoView();
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);

  return null;
}
