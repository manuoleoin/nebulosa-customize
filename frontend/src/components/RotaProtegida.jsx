import { Navigate, useLocation } from "react-router";
import { useAuthStore } from "../stores/authStore";
import { Carregando } from "./Feedback";

/** Só renderiza os filhos com usuário logado; senão manda para o login e volta depois */
export default function RotaProtegida({ children }) {
  const usuario = useAuthStore((s) => s.usuario);
  const carregando = useAuthStore((s) => s.carregando);
  const location = useLocation();

  if (carregando) return <Carregando texto="Verificando sua sessão..." />;
  if (!usuario) {
    const volta = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?volta=${volta}`} replace />;
  }
  return children;
}
