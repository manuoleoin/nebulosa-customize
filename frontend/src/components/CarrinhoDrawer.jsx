import { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router";
import { useCarrinho } from "../hooks/useCarrinho";
import { useAuthStore } from "../stores/authStore";
import { useCartStore } from "../stores/cartStore";
import { brl } from "../utils/formatar";
import { FRETE_GRATIS_A_PARTIR } from "../utils/regras";
import CampoQuantidade from "./CampoQuantidade";
import { IconeCadeado, IconeCarrinho, IconeFechar, IconeSetaDireita } from "./Icones";

/** Carrinho lateral (abre pela direita) */
export default function CarrinhoDrawer() {
  const aberto = useCartStore((s) => s.aberto);
  const fechar = useCartStore((s) => s.fechar);
  const alterarQtd = useCartStore((s) => s.alterarQtd);
  const remover = useCartStore((s) => s.remover);
  const usuario = useAuthStore((s) => s.usuario);
  const { itens, totais, quantidade } = useCarrinho();
  const navigate = useNavigate();
  const painel = useRef(null);
  const btnFechar = useRef(null);

  // foco, ESC, trava de rolagem e "focus trap"
  useEffect(() => {
    if (!aberto) return;
    const anterior = document.activeElement;
    document.body.style.overflow = "hidden";
    setTimeout(() => btnFechar.current?.focus(), 50);

    function teclado(e) {
      if (e.key === "Escape") fechar();
      if (e.key !== "Tab") return;
      const focaveis = painel.current.querySelectorAll("a[href], button:not([disabled]), input");
      const primeiro = focaveis[0];
      const ultimo = focaveis[focaveis.length - 1];
      if (e.shiftKey && document.activeElement === primeiro) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault();
        primeiro.focus();
      }
    }
    document.addEventListener("keydown", teclado);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", teclado);
      anterior?.focus?.();
    };
  }, [aberto, fechar]);

  function finalizar() {
    fechar();
    navigate(usuario ? "/pedido" : "/login?volta=/pedido");
  }

  const falta = Math.max(0, FRETE_GRATIS_A_PARTIR - totais.subtotal);
  const pct = Math.min(100, (totais.subtotal / FRETE_GRATIS_A_PARTIR) * 100);

  return (
    <>
      <div
        onClick={fechar}
        className={`fixed inset-0 z-[90] bg-quase-preto/50 transition-opacity ${aberto ? "opacity-100" : "pointer-events-none opacity-0"}`}
      />
      <aside
        ref={painel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="titulo-carrinho"
        className={`fixed inset-y-0 right-0 z-[100] flex w-[min(440px,100%)] flex-col bg-creme shadow-[-12px_0_30px_rgb(30_16_51/.25)] transition-transform duration-300 ${
          aberto ? "visible translate-x-0" : "invisible translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between bg-noite px-5 py-4.5 text-white">
          <h2 id="titulo-carrinho" className="m-0 flex items-center gap-2.5 text-[1.7rem] text-white">
            <IconeCarrinho className="size-6.5 text-amarelo" /> Seu carrinho
          </h2>
          <button ref={btnFechar} type="button" onClick={fechar} aria-label="Fechar carrinho" className="grid size-11 cursor-pointer place-items-center rounded-full hover:bg-white/10 hover:text-amarelo">
            <IconeFechar className="size-6" />
          </button>
        </div>

        {itens.length === 0 ? (
          <div className="grid flex-1 place-items-center p-8 text-center text-texto-suave">
            <div>
              <IconeCarrinho className="mx-auto mb-2.5 size-24 text-lilas" />
              <p>
                <strong>Seu carrinho está vazio.</strong>
                <br />
                Que tal explorar nossa galáxia de produtos?
              </p>
              <Link to="/produtos" onClick={fechar} className="btn btn-primario mt-4">
                Ver produtos <IconeSetaDireita />
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="bg-lilas-2 px-5 py-3 text-sm">
              {falta > 0 ? (
                <>Faltam <strong>{brl(falta)}</strong> para ganhar <strong>frete grátis</strong> ✨</>
              ) : (
                <>🎉 Você ganhou <strong>frete grátis</strong>!</>
              )}
              <div className="mt-1.5 h-2 overflow-hidden rounded bg-white">
                <i className="block h-full rounded bg-linear-to-r from-roxo to-amarelo-2 transition-all" style={{ width: `${pct}%` }} />
              </div>
            </div>

            <ul className="flex-1 overflow-y-auto px-5 py-2">
              {itens.map((i) => (
                <li key={i.id} className="grid grid-cols-[76px_1fr] gap-3.5 border-b border-borda py-3.5">
                  <img src={i.fotoCapa} alt="" className="size-[76px] rounded-[10px] border-[1.5px] border-roxo bg-foto object-cover" />
                  <div>
                    <Link to={`/produtos/${i.id}`} onClick={fechar} className="block font-rotulo text-xs leading-snug font-semibold tracking-widest text-roxo uppercase no-underline">
                      {i.nome}
                    </Link>
                    <span className="text-xs text-texto-suave">
                      {brl(i.precoDesconto)} / un.{i.cor && ` · ${i.cor}`}{i.tamanho && ` · ${i.tamanho}`}
                    </span>
                    <div className="mt-2 flex items-center justify-between gap-2">
                      <CampoQuantidade pequeno valor={i.qtd} min={0} onChange={(q) => alterarQtd(i.id, q)} rotulo={`Quantidade de ${i.nome}`} />
                      <span className="font-preco font-bold">{brl(i.precoDesconto * i.qtd)}</span>
                    </div>
                    <button type="button" onClick={() => remover(i.id)} className="mt-1 cursor-pointer text-xs text-texto-suave underline hover:text-perigo">
                      Remover
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t-2 border-borda bg-white px-5 pt-4 pb-5">
              <dl className="mb-3.5 grid gap-1.5 text-[.95rem]">
                <div className="flex justify-between"><dt>Subtotal ({quantidade} {quantidade === 1 ? "item" : "itens"})</dt><dd>{brl(totais.subtotal)}</dd></div>
                {totais.economia > 0 && (
                  <div className="flex justify-between text-sucesso"><dt>Você economiza</dt><dd>− {brl(totais.economia)}</dd></div>
                )}
                <div className="flex justify-between"><dt>Frete</dt><dd>{totais.frete === 0 ? "Grátis" : brl(totais.frete)}</dd></div>
                <div className="mt-1 flex justify-between border-t border-dashed border-borda pt-2 text-xl font-bold"><dt>Total</dt><dd>{brl(totais.total)}</dd></div>
              </dl>
              <button type="button" onClick={finalizar} className="btn btn-primario w-full">
                Finalizar pedido <IconeSetaDireita />
              </button>
              <button type="button" onClick={fechar} className="btn btn-contorno mt-2 w-full">
                Continuar comprando
              </button>
              <p className="mt-2.5 flex items-center justify-center gap-1.5 text-xs text-texto-suave">
                <IconeCadeado className="size-3.5" /> Compra 100% segura · até 3x sem juros
              </p>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
