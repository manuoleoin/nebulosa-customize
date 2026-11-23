import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { useCarrinho } from "../hooks/useCarrinho";
import { useAuthStore } from "../stores/authStore";
import { useCartStore } from "../stores/cartStore";
import { toast } from "../stores/toastStore";
import { primeiroNome } from "../utils/formatar";
import { IconeCarrinho, IconeMenu, IconeSair, IconeUsuario } from "./Icones";
import Logo from "./Logo";

const LINKS = [
  { to: "/", texto: "Início", end: true },
  { to: "/produtos", texto: "Produtos" },
  { to: "/sobre", texto: "Sobre Nós" },
];

const iconeBtn = "relative grid size-11 place-items-center rounded-full text-white hover:bg-white/10 hover:text-amarelo cursor-pointer";

export default function Header() {
  const usuario = useAuthStore((s) => s.usuario);
  const sair = useAuthStore((s) => s.sair);
  const abrirCarrinho = useCartStore((s) => s.abrir);
  const { quantidade } = useCarrinho();
  const [menuAberto, setMenuAberto] = useState(false);
  const navigate = useNavigate();

  async function handleSair() {
    navigate("/"); // sai de rotas protegidas antes de limpar o usuário
    await sair();
    toast("Você saiu da sua conta. Até logo! ✨");
  }

  return (
    <header className="sticky top-0 z-50 bg-noite text-white shadow-[0_2px_12px_rgb(0_0_0/.18)]">
      <div className="container-site flex h-[84px] items-center justify-between gap-6">
        <Logo />

        <nav
          id="nav-principal"
          aria-label="Principal"
          className={`${menuAberto ? "absolute inset-x-0 top-[84px] block bg-noite px-5 pt-3 pb-5 shadow-lg" : "hidden"} lg:static lg:block lg:p-0 lg:shadow-none`}
        >
          <ul className="flex flex-col gap-1 lg:flex-row lg:gap-9">
            {LINKS.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  end={l.end}
                  onClick={() => setMenuAberto(false)}
                  className={({ isActive }) =>
                    `block border-b-2 py-3 text-[1.05rem] tracking-[0.08em] text-white no-underline hover:text-amarelo lg:py-1.5 ${
                      isActive ? "border-amarelo" : "border-transparent"
                    }`
                  }
                >
                  {l.texto}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-0.5 sm:gap-2.5">
          {usuario ? (
            <>
              <span className="mr-1 hidden text-sm whitespace-nowrap text-lilas lg:inline">Olá, {primeiroNome(usuario.nome)}</span>
              <NavLink to="/perfil" className={iconeBtn} aria-label="Meu perfil">
                <IconeUsuario className="size-7" />
              </NavLink>
            </>
          ) : (
            <Link to="/login" className={iconeBtn} aria-label="Entrar ou criar conta">
              <IconeUsuario className="size-7" />
            </Link>
          )}

          <button type="button" onClick={abrirCarrinho} className={iconeBtn} aria-label={`Abrir carrinho (${quantidade} ${quantidade === 1 ? "item" : "itens"})`}>
            <IconeCarrinho className="size-7" />
            {quantidade > 0 && (
              <span className="absolute top-0.5 right-0 grid h-5 min-w-5 place-items-center rounded-full bg-amarelo px-1.5 text-[.72rem] font-bold text-roxo-escuro">
                {quantidade > 99 ? "99+" : quantidade}
              </span>
            )}
          </button>

          {usuario && (
            <button
              type="button"
              onClick={handleSair}
              className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border-[1.5px] border-amarelo px-2.5 py-1.5 text-sm font-semibold text-amarelo hover:bg-amarelo hover:text-roxo-escuro sm:px-4"
            >
              <IconeSair className="size-4" />
              <span className="hidden sm:inline">Sair</span>
            </button>
          )}

          <button
            type="button"
            className={`${iconeBtn} lg:hidden`}
            aria-label="Abrir menu"
            aria-expanded={menuAberto}
            aria-controls="nav-principal"
            onClick={() => setMenuAberto((v) => !v)}
          >
            <IconeMenu className="size-7" />
          </button>
        </div>
      </div>
    </header>
  );
}
