import { useToastStore } from "../stores/toastStore";
import { IconeCheck } from "./Icones";

export default function Toasts() {
  const toasts = useToastStore((s) => s.toasts);
  const remover = useToastStore((s) => s.remover);

  return (
    <div role="status" aria-live="polite" className="pointer-events-none fixed bottom-6 left-1/2 z-[200] grid -translate-x-1/2 gap-2">
      {toasts.map((t) => (
        <div key={t.id} className="pointer-events-auto flex animate-entrar items-center gap-2.5 rounded-full bg-roxo-escuro px-5 py-3 font-medium text-white shadow-forte">
          <IconeCheck className="size-5 shrink-0 text-amarelo" />
          <span>{t.mensagem}</span>
          {t.acao && (
            <button
              type="button"
              className="cursor-pointer font-semibold whitespace-nowrap text-amarelo underline"
              onClick={() => {
                t.acao.onClick();
                remover(t.id);
              }}
            >
              {t.acao.texto}
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
