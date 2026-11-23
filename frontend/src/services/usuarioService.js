import { api } from "./api";

export const usuarioService = {
  atualizar: (dados) => api.put("/usuarios/me", dados),
  excluir: (senha) => api.delete("/usuarios/me", { senha }),
};
