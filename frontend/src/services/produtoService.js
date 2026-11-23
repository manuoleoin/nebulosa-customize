import { api } from "./api";

export const produtoService = {
  /** filtros: { busca, categoria, ordem, destaque, limite } */
  listar: (filtros = {}) => {
    const params = new URLSearchParams(Object.entries(filtros).filter(([, v]) => v !== undefined && v !== ""));
    const qs = params.toString();
    return api.get(`/produtos${qs ? `?${qs}` : ""}`);
  },
  categorias: () => api.get("/produtos/categorias"),
  buscar: (id) => api.get(`/produtos/${id}`),
  avaliar: (id, nota) => api.put(`/produtos/${id}/avaliacao`, { nota }),
};
