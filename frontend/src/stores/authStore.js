import { create } from "zustand";
import { authService } from "../services/authService";

/**
 * Usuário logado. O token fica num cookie httpOnly (o JS não lê);
 * aqui guardamos só os dados públicos devolvidos pela API.
 */
export const useAuthStore = create((set) => ({
  usuario: null,
  carregando: true, // true até a primeira checagem de sessão terminar

  /** Chamado uma vez ao abrir o site: recupera a sessão a partir do cookie */
  carregarSessao: async () => {
    try {
      set({ usuario: await authService.me() });
    } catch {
      set({ usuario: null });
    } finally {
      set({ carregando: false });
    }
  },

  entrar: async (credenciais) => {
    const usuario = await authService.login(credenciais);
    set({ usuario });
    return usuario;
  },

  cadastrar: async (dados) => {
    const usuario = await authService.cadastrar(dados);
    set({ usuario });
    return usuario;
  },

  sair: async () => {
    try {
      await authService.logout();
    } finally {
      set({ usuario: null });
    }
  },

  /** Depois de editar o perfil ou excluir a conta */
  definirUsuario: (usuario) => set({ usuario }),
}));
