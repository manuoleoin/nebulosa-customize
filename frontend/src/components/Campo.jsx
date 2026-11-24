import { useId, useState } from "react";
import { Eye, EyeSlash } from "@phosphor-icons/react";

/**
 * Campo de formulário com rótulo, ícone opcional, ajuda e erro.
 * Qualquer prop extra vai para o <input> (name, value, onChange, type...).
 */
export default function Campo({ rotulo, erro, ajuda, icone: Icone, opcional, className = "", type = "text", ...input }) {
  const id = useId();
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const ehSenha = type === "password";
  const descricao = [ajuda && `${id}-ajuda`, erro && `${id}-erro`].filter(Boolean).join(" ") || undefined;

  return (
    <div className={`mb-4 grid content-start gap-1.5 ${className}`}>
      <label htmlFor={id} className="text-[.92rem] font-semibold">
        {rotulo} {opcional && <small className="font-normal text-texto-suave">(opcional)</small>}
      </label>
      <div
        className={`flex items-center gap-2.5 rounded-xl border-[1.5px] bg-white px-3 transition focus-within:border-roxo focus-within:ring-3 focus-within:ring-roxo/20 ${
          erro ? "border-perigo" : "border-borda"
        }`}
      >
        {Icone && <Icone className="size-5 shrink-0" />}
        <input
          id={id}
          type={ehSenha && mostrarSenha ? "text" : type}
          aria-invalid={!!erro}
          aria-describedby={descricao}
          className="min-w-0 flex-1 bg-transparent py-3 outline-none read-only:text-texto-suave"
          {...input}
        />
        {ehSenha && (
          // tabIndex -1: o Tab pula o olho e vai direto para o próximo campo
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setMostrarSenha((v) => !v)}
            aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
            aria-pressed={mostrarSenha}
            className="grid cursor-pointer p-1"
          >
            {mostrarSenha ? <EyeSlash className="size-5" /> : <Eye className="size-5" />}
          </button>
        )}
      </div>
      {ajuda && !erro && <span id={`${id}-ajuda`} className="text-xs text-texto-suave">{ajuda}</span>}
      {erro && <span id={`${id}-erro`} className="text-[.82rem] text-perigo">{erro}</span>}
    </div>
  );
}
