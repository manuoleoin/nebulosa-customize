import { Outlet } from "react-router";
import CarrinhoDrawer from "../components/CarrinhoDrawer";
import Footer from "../components/Footer";
import Header from "../components/Header";
import RolarParaTopo from "../components/RolarParaTopo";
import Toasts from "../components/Toasts";

/** Estrutura de todas as páginas: header, conteúdo, footer, carrinho e toasts */
export default function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <RolarParaTopo />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CarrinhoDrawer />
      <Toasts />
    </div>
  );
}
