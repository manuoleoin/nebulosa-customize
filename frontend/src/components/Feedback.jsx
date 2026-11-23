// Componentes pequenos de estado: carregando, vazio, alerta

export function Carregando({ texto = "Carregando..." }) {
  return (
    <div role="status" className="flex flex-col items-center gap-3 py-16 text-texto-suave">
      <span className="size-10 animate-spin rounded-full border-4 border-lilas border-t-roxo" />
      {texto}
    </div>
  );
}

export function EstadoVazio({ icone: Icone, titulo, children }) {
  return (
    <div className="px-5 py-14 text-center text-texto-suave">
      {Icone && <Icone className="mx-auto mb-3 size-20 text-roxo opacity-60" />}
      {titulo && <p className="font-bold text-roxo-escuro">{titulo}</p>}
      {children}
    </div>
  );
}

const ESTILOS = {
  info: "bg-lilas-2 border-borda",
  erro: "bg-[#FDECEA] border-[#F2B8B0] text-[#8E2A1F]",
  ok: "bg-[#E8F6EE] border-[#A9DDBE] text-[#1E5E3A]",
};

export function Alerta({ tipo = "info", children, className = "" }) {
  if (!children) return null;
  return (
    <div role={tipo === "erro" ? "alert" : undefined} className={`mb-4 rounded-xl border px-4 py-3 text-[.92rem] ${ESTILOS[tipo]} ${className}`}>
      {children}
    </div>
  );
}
