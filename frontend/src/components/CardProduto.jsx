import { Link } from "react-router";
import { useCarrinho } from "../hooks/useCarrinho";
import { brl } from "../utils/formatar";
import { ShoppingCartSimple, Star } from "@phosphor-icons/react";

export default function CardProduto({ produto: p, escuro = false }) {
  const { adicionarComAviso } = useCarrinho();
  const temDesconto = p.precoDesconto < p.preco;
  const pct = temDesconto ? Math.round((1 - p.precoDesconto / p.preco) * 100) : 0;

  return (
    <article
      className={`relative flex flex-col overflow-hidden rounded-[10px] border-2 bg-creme transition hover:-translate-y-1 hover:shadow-forte ${
        escuro ? "border-[#8B78D6] shadow-[0_10px_28px_rgb(123_93_201/.35)]" : "border-roxo shadow-card"
      }`}
    >
      {pct >= 15 && (
        <span className="absolute top-2.5 left-2.5 z-10 rounded-full bg-amarelo px-2.5 py-0.5 text-xs font-bold text-roxo-escuro">-{pct}%</span>
      )}
      <div className="aspect-square bg-foto">
        {p.fotoCapa && <img src={p.fotoCapa} alt="" loading="lazy" className="size-full object-cover" />}
      </div>
      <div className="flex flex-1 flex-col px-3 pt-3.5 pb-3">
        {/* o ::after deixa o card inteiro clicável */}
        <Link
          to={`/produtos/${p.id}`}
          className="mb-1.5 flex-1 font-rotulo text-sm leading-relaxed font-semibold tracking-[0.2em] text-roxo uppercase no-underline after:absolute after:inset-0 hover:text-roxo-escuro"
        >
          {p.nome}
        </Link>
        {p.notaMedia != null && (
          <span className="mb-1 flex items-center gap-1 text-xs text-texto-suave">
            <Star weight="fill" className="size-3.5 text-roxo" /> {p.notaMedia.toFixed(1)}
          </span>
        )}
        <div className="flex items-end justify-between gap-2">
          <div>
            <span className={`block text-sm leading-none font-bold text-amarelo-2 line-through ${temDesconto ? "" : "invisible"}`}>
              <span className="sr-only">De </span>
              {brl(p.preco)}
            </span>
            <span className="pl-2 font-preco text-2xl leading-tight font-bold text-roxo-escuro">
              {temDesconto && <span className="sr-only">por </span>}
              {brl(p.precoDesconto)}
            </span>
          </div>
          <button
            type="button"
            onClick={() => adicionarComAviso(p)}
            aria-label={`Adicionar ${p.nome} ao carrinho`}
            className="relative z-10 grid size-[50px] shrink-0 cursor-pointer place-items-center rounded-full bg-amarelo-2 text-roxo-escuro transition hover:scale-105 hover:bg-amarelo-escuro"
          >
            <ShoppingCartSimple className="size-7" />
          </button>
        </div>
      </div>
    </article>
  );
}
