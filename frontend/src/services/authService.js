import { api } from "./api";

export const authService = {
  me: () => api.get("/auth/me"),
  login: (dados) => api.post("/auth/login", dados),
  cadastrar: (dados) => api.post("/auth/cadastro", dados),
  logout: () => api.post("/auth/logout"),
};
