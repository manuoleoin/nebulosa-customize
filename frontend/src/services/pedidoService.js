import { api } from "./api";

export const pedidoService = {
  listar: () => api.get("/pedidos"),
  buscar: (id) => api.get(`/pedidos/${id}`),
  /** { endereco: {...}, metodoPagamento, parcelas, itens: [{ produtoId, quantidade }] } */
  criar: (dados) => api.post("/pedidos", dados),
};
