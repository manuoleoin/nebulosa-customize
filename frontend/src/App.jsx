import { useEffect } from "react";
import { Route, Routes } from "react-router";
import RotaProtegida from "./components/RotaProtegida";
import MainLayout from "./layouts/MainLayout";
import Cadastro from "./pages/Cadastro";
import Checkout from "./pages/Checkout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NaoEncontrada from "./pages/NaoEncontrada";
import Perfil from "./pages/Perfil";
import Produto from "./pages/Produto";
import Produtos from "./pages/Produtos";
import Sobre from "./pages/Sobre";
import { useAuthStore } from "./stores/authStore";

// React Router v8 — modo declarativo (<Routes>/<Route>)
export default function App() {
  const carregarSessao = useAuthStore((s) => s.carregarSessao);

  useEffect(() => {
    carregarSessao(); // recupera o usuário a partir do cookie
  }, [carregarSessao]);

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="produtos" element={<Produtos />} />
        <Route path="produtos/:id" element={<Produto />} />
        <Route path="sobre" element={<Sobre />} />
        <Route path="login" element={<Login />} />
        <Route path="cadastro" element={<Cadastro />} />
        <Route
          path="perfil"
          element={
            <RotaProtegida>
              <Perfil />
            </RotaProtegida>
          }
        />
        <Route
          path="pedido"
          element={
            <RotaProtegida>
              <Checkout />
            </RotaProtegida>
          }
        />
        <Route path="*" element={<NaoEncontrada />} />
      </Route>
    </Routes>
  );
}
