import { useState } from "react";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router";
import Campo from "../components/Campo";
import { Alerta } from "../components/Feedback";
import { IconeCadeado, IconeEmail, IconePessoa, IconeTelefone } from "../components/Icones";
import { useFormulario } from "../hooks/useFormulario";
import { useTitulo } from "../hooks/useTitulo";
import AuthLayout from "../layouts/AuthLayout";
import { useAuthStore } from "../stores/authStore";
import { toast } from "../stores/toastStore";
import { destinoSeguro, mascaraTelefone, primeiroNome } from "../utils/formatar";

export default function Cadastro() {
  useTitulo("Criar conta");
  const [params] = useSearchParams();
  const volta = destinoSeguro(params.get("volta"));
  const navigate = useNavigate();
  const usuario = useAuthStore((s) => s.usuario);
  const cadastrar = useAuthStore((s) => s.cadastrar);
  const [termos, setTermos] = useState(false);
  const [erroTermos, setErroTermos] = useState(false);
  const { valores, alterar, erros, setErros, erroGeral, enviando, enviar } = useFormulario({
    nome: "",
    email: "",
    telefone: "",
    senha: "",
    confirmacaoSenha: "",
  });

  if (usuario && !enviando) return <Navigate to={volta || "/perfil"} replace />;

  async function handleSubmit(e) {
    e.preventDefault();
    // checagem rápida no cliente; a validação de verdade é a do backend (zod)
    if (valores.senha !== valores.confirmacaoSenha) {
      return setErros({ confirmacaoSenha: "As senhas não conferem." });
    }
    if (!termos) return setErroTermos(true);

    const novo = await enviar(cadastrar);
    if (!novo) return;
    toast(`Conta criada! Bem-vindo(a), ${primeiroNome(novo.nome)} ✨`);
    navigate(volta || "/perfil", { replace: true });
  }

  return (
    <AuthLayout
      titulo="Crie sua conta e personalize o universo."
      texto="Com uma conta você acompanha seus pedidos, salva seus dados de entrega e avalia os produtos que comprou."
    >
      <form onSubmit={handleSubmit} noValidate>
        <h1 className="text-[2.2rem]">Criar conta</h1>
        <p className="mb-5.5 text-texto-suave">Leva menos de um minuto 🚀</p>
        {erroGeral && !Object.keys(erros).length && <Alerta tipo="erro">{erroGeral}</Alerta>}

        <Campo rotulo="Nome completo" name="nome" autoComplete="name" maxLength={100} placeholder="Como está no seu documento" icone={IconePessoa} value={valores.nome} onChange={alterar()} erro={erros.nome} />
        <Campo rotulo="E-mail" name="email" type="email" autoComplete="email" maxLength={255} placeholder="seuemail@exemplo.com" icone={IconeEmail} value={valores.email} onChange={alterar()} erro={erros.email} />
        <Campo rotulo="Telefone / WhatsApp" name="telefone" type="tel" inputMode="numeric" autoComplete="tel" placeholder="(11) 98765-4321" icone={IconeTelefone} value={valores.telefone} onChange={alterar(mascaraTelefone)} erro={erros.telefone} />
        <Campo rotulo="Senha" name="senha" type="password" autoComplete="new-password" icone={IconeCadeado} ajuda="Mínimo de 8 caracteres, com letras e números." value={valores.senha} onChange={alterar()} erro={erros.senha} />
        <Campo rotulo="Confirmar senha" name="confirmacaoSenha" type="password" autoComplete="new-password" icone={IconeCadeado} value={valores.confirmacaoSenha} onChange={alterar()} erro={erros.confirmacaoSenha} />

        <label className="mb-4.5 flex items-start gap-2.5 text-sm">
          <input
            type="checkbox"
            checked={termos}
            onChange={(e) => {
              setTermos(e.target.checked);
              setErroTermos(false);
            }}
            className="mt-1 size-4.5 accent-roxo"
          />
          <span>
            Li e aceito os <a href="#" className="link">termos de uso</a> e a <a href="#" className="link">política de privacidade</a>.
          </span>
        </label>
        {erroTermos && <Alerta tipo="erro">Você precisa aceitar os termos para continuar.</Alerta>}

        <button type="submit" className="btn btn-primario w-full" disabled={enviando}>
          {enviando ? "Criando conta..." : "Criar minha conta"}
        </button>
        <p className="mt-4 text-center text-sm text-texto-suave">
          Já tem conta?{" "}
          <Link to={volta ? `/login?volta=${encodeURIComponent(volta)}` : "/login"} className="link font-bold">
            Entrar
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
