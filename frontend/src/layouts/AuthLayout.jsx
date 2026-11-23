import { Brilho } from "../components/Icones";

/** Tela dividida usada no login e no cadastro: arte à esquerda, formulário à direita */
export default function AuthLayout({ titulo, texto, children }) {
  return (
    <div className="grid min-h-[calc(100vh-84px-160px)] lg:grid-cols-2">
      <section aria-hidden className="relative flex min-h-[220px] flex-col justify-center overflow-hidden bg-noite px-6 py-10 text-white lg:p-14">
        <Brilho className="absolute top-[12%] right-[18%] size-10 text-amarelo" />
        <Brilho className="absolute bottom-[15%] left-[12%] size-6 text-amarelo" />
        <span className="absolute top-[20%] left-[10%] size-1 rounded-full bg-lilas/70" />
        <span className="absolute top-[60%] right-[8%] size-1 rounded-full bg-lilas/70" />
        <span className="absolute bottom-[8%] left-[55%] size-1.5 rounded-full bg-lilas/70" />
        <div className="absolute -right-24 -bottom-24 size-72 rounded-full border-2 border-roxo" />
        <h2 className="relative max-w-md text-[clamp(2.2rem,4vw,3.4rem)] text-white">{titulo}</h2>
        <p className="relative mt-3 max-w-sm text-lilas">{texto}</p>
      </section>
      <section className="grid place-items-center px-6 py-12">
        <div className="w-full max-w-[440px] rounded-[20px] border-[1.5px] border-borda bg-white p-8 shadow-card">{children}</div>
      </section>
    </div>
  );
}
