import { Link, Navigate, useNavigate, useSearchParams } from "react-router";
import Campo from "../components/Campo";
import { Alerta } from "../components/Feedback";
import { Envelope, Lock } from "@phosphor-icons/react";
import { useFormulario } from "../hooks/useFormulario";
import { useTitulo } from "../hooks/useTitulo";
import AuthLayout from "../layouts/AuthLayout";
import { useAuthStore } from "../stores/authStore";
import { toast } from "../stores/toastStore";
import { destinoSeguro, primeiroNome } from "../utils/formatar";

export default function Login() {
  useTitulo("Entrar");
  const [params] = useSearchParams();
  const volta = destinoSeguro(params.get("volta"));
  const navigate = useNavigate();
  const usuario = useAuthStore((s) => s.usuario);
  const entrar = useAuthStore((s) => s.entrar);
  const { valores, alterar, erros, erroGeral, enviando, enviar } = useFormulario({ email: "", senha: "" });

  // já logado (ou acabou de entrar): segue para o destino
  if (usuario) return <Navigate to={volta || "/"} replace />;

  async function handleSubmit(e) {
    e.preventDefault();
    const logado = await enviar(entrar);
    if (!logado) return;
    toast(`Olá, ${primeiroNome(logado.nome)}! Você entrou na sua conta.`);
    navigate(volta || "/", { replace: true });
  }

  return (
    <AuthLayout
      titulo="Que bom ter você de volta à sua galáxia."
      texto="Entre para acompanhar seus pedidos, avaliar produtos e finalizar suas compras com mais rapidez."
    >
      <form onSubmit={handleSubmit} noValidate>
        <h1 className="text-[2.2rem]">Acesse sua conta</h1>
        <p className="mb-5.5 text-texto-suave">Que bom te ver por aqui ✨</p>

        {volta && !erroGeral && (
          <Alerta>{volta.startsWith("/pedido") ? "Faça login para finalizar seu pedido. Seu carrinho está salvo!" : "Faça login para continuar."}</Alerta>
        )}
        <Alerta tipo="erro">{erroGeral}</Alerta>

        <Campo rotulo="E-mail" name="email" type="email" autoComplete="email" placeholder="seuemail@exemplo.com" icone={Envelope} value={valores.email} onChange={alterar()} erro={erros.email} required />
        <Campo rotulo="Senha" name="senha" type="password" autoComplete="current-password" placeholder="Sua senha" icone={Lock} value={valores.senha} onChange={alterar()} erro={erros.senha} required />

        <button type="submit" className="btn btn-primario w-full" disabled={enviando}>
          {enviando ? "Entrando..." : "Entrar"}
        </button>
        <p className="mt-4 text-center text-sm text-texto-suave">
          Não tem uma conta?{" "}
          <Link to={volta ? `/cadastro?volta=${encodeURIComponent(volta)}` : "/cadastro"} className="link font-bold">
            Cadastre-se
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
