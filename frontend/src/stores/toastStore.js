import { create } from "zustand";

let proximoId = 1;

/** Notificações rápidas: toast("Mensagem", { texto: "Desfazer", onClick }) */
export const useToastStore = create((set) => ({
  toasts: [],
  remover: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
  mostrar: (mensagem, acao) => {
    const id = proximoId++;
    set((s) => ({ toasts: [...s.toasts, { id, mensagem, acao }] }));
    setTimeout(() => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })), 3500);
  },
}));

export const toast = (mensagem, acao) => useToastStore.getState().mostrar(mensagem, acao);
