import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { calcularFrete } from "../utils/regras";

/**
 * Carrinho salvo no localStorage. Guarda uma "foto" do produto para exibir no drawer;
 * no checkout o backend busca os preços atuais no banco.
 */
export const useCartStore = create(
  persist(
    (set, get) => ({
      itens: [], // [{ id, nome, preco, precoDesconto, fotoCapa, cor, tamanho, qtd }]
      aberto: false,

      abrir: () => set({ aberto: true }),
      fechar: () => set({ aberto: false }),

      adicionar: (produto, qtd = 1) =>
        set((s) => {
          const existente = s.itens.find((i) => i.id === produto.id);
          if (existente) {
            return { itens: s.itens.map((i) => (i.id === produto.id ? { ...i, qtd: Math.min(99, i.qtd + qtd) } : i)) };
          }
          const { id, nome, preco, precoDesconto, fotoCapa, cor, tamanho } = produto;
          return { itens: [...s.itens, { id, nome, preco, precoDesconto, fotoCapa, cor, tamanho, qtd }] };
        }),

      alterarQtd: (id, qtd) =>
        set((s) => ({
          itens: qtd <= 0 ? s.itens.filter((i) => i.id !== id) : s.itens.map((i) => (i.id === id ? { ...i, qtd: Math.min(99, qtd) } : i)),
        })),

      remover: (id) => set((s) => ({ itens: s.itens.filter((i) => i.id !== id) })),
      limpar: () => set({ itens: [] }),

      quantidade: () => get().itens.reduce((s, i) => s + i.qtd, 0),
    }),
    {
      name: "nebulosa:carrinho",
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ itens: s.itens }), // não persiste "aberto"
    }
  )
);

/** Totais derivados (use dentro de componentes: const t = useTotaisCarrinho()) */
export function totaisDoCarrinho(itens) {
  const bruto = itens.reduce((s, i) => s + i.preco * i.qtd, 0);
  const subtotal = itens.reduce((s, i) => s + i.precoDesconto * i.qtd, 0);
  const frete = calcularFrete(subtotal);
  return { bruto, subtotal, economia: bruto - subtotal, frete, total: subtotal + frete };
}
