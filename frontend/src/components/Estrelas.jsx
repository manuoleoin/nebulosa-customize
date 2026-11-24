import { Star, StarHalf } from "@phosphor-icons/react";

const VAZIA = "text-[#D5CCE6]";

/** Exibe a nota com estrelas cheias, meias e vazias */
export default function Estrelas({ nota, className = "size-5" }) {
  return (
    <span className="inline-flex gap-0.5 text-amarelo-escuro" role="img" aria-label={`Nota ${nota.toFixed(1)} de 5`}>
      {[1, 2, 3, 4, 5].map((i) => {
        if (nota >= i - 0.25) return <Star key={i} weight="fill" className={className} />;
        if (nota >= i - 0.75)
          return (
            // meia estrela: estrela vazia por baixo + metade preenchida por cima
            <span key={i} className="relative inline-grid">
              <Star weight="fill" className={`${className} ${VAZIA}`} />
              <StarHalf weight="fill" className={`${className} absolute inset-0`} />
            </span>
          );
        return <Star key={i} weight="fill" className={`${className} ${VAZIA}`} />;
      })}
    </span>
  );
}
