import { Link } from "react-router";
import { Planet } from "@phosphor-icons/react";
import { useTitulo } from "../hooks/useTitulo";

export default function NaoEncontrada() {
  useTitulo("Página não encontrada");
  return (
    <section className="container-site py-20 text-center">
      <Planet className="mx-auto mb-4 size-28 text-roxo" />
      <h1 className="text-5xl">404</h1>
      <p className="mt-2 mb-6 text-lg text-texto-suave">Essa página se perdeu no espaço. Que tal voltar para a loja?</p>
      <Link to="/" className="btn btn-primario">Voltar ao início</Link>
    </section>
  );
}
