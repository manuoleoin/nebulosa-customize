import { useId } from "react";
import { IconeEstrela } from "./Icones";

/** Exibe a nota com estrelas cheias, meias e vazias */
export default function Estrelas({ nota, className = "size-5" }) {
  const id = useId();
  return (
    <span className="inline-flex gap-0.5 text-amarelo-escuro" role="img" aria-label={`Nota ${nota.toFixed(1)} de 5`}>
      {[1, 2, 3, 4, 5].map((i) => {
        if (nota >= i - 0.25) return <IconeEstrela key={i} className={className} />;
        if (nota >= i - 0.75)
          return (
            <svg key={i} viewBox="0 0 24 24" className={className} aria-hidden>
              <defs>
                <linearGradient id={`${id}-${i}`}>
                  <stop offset="50%" stopColor="currentColor" />
                  <stop offset="50%" stopColor="#D5CCE6" />
                </linearGradient>
              </defs>
              <path fill={`url(#${id}-${i})`} d="m12 2.5 2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z" />
            </svg>
          );
        return <IconeEstrela key={i} className={`${className} text-[#D5CCE6]`} />;
      })}
    </span>
  );
}
