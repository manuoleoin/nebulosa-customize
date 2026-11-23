import { useMemo } from "react";
import { totaisDoCarrinho, useCartStore } from "../stores/cartStore";
import { toast } from "../stores/toastStore";

/** Itens, totais e ações do carrinho num lugar só */
export function useCarrinho() {
  const itens = useCartStore((s) => s.itens);
  const abrir = useCartStore((s) => s.abrir);
  const adicionar = useCartStore((s) => s.adicionar);

  const totais = useMemo(() => totaisDoCarrinho(itens), [itens]);
  const quantidade = useMemo(() => itens.reduce((s, i) => s + i.qtd, 0), [itens]);

  /** Adiciona e avisa com um toast (com atalho para abrir o drawer) */
  function adicionarComAviso(produto, qtd = 1) {
    adicionar(produto, qtd);
    toast(`${produto.nome} adicionado ao carrinho`, { texto: "Ver carrinho", onClick: abrir });
  }

  return { itens, totais, quantidade, adicionarComAviso };
}
