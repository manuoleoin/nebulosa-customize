import { Link } from "react-router";
import { IconeFacebook, IconeInstagram, IconeTiktok, IconeWhatsapp } from "./Icones";
import Logo from "./Logo";

const REDES = [
  { nome: "WhatsApp", Icone: IconeWhatsapp },
  { nome: "Instagram", Icone: IconeInstagram },
  { nome: "Facebook", Icone: IconeFacebook },
  { nome: "TikTok", Icone: IconeTiktok },
];

export default function Footer() {
  return (
    <footer className="mt-auto bg-noite pt-9 pb-7 text-white">
      <div className="container-site grid items-center justify-items-center gap-6 text-center md:grid-cols-[1fr_auto_1fr] md:justify-items-stretch md:text-left">
        <div>
          <small className="text-[.95rem] leading-snug text-[#EDE6FA]">
            © 2026 Nebulosa Costumize.
            <br />
            Todos os direitos reservados.
          </small>
          <ul className="mt-2 flex justify-center gap-5 text-sm md:justify-start">
            <li><Link to="/produtos" className="text-lilas no-underline hover:text-amarelo">Produtos</Link></li>
            <li><Link to="/sobre" className="text-lilas no-underline hover:text-amarelo">Sobre nós</Link></li>
            <li><Link to="/#faq" className="text-lilas no-underline hover:text-amarelo">Dúvidas</Link></li>
          </ul>
        </div>
        <Logo />
        <div className="flex flex-col items-center gap-3 md:items-end">
          <ul className="flex gap-4.5">
            {REDES.map(({ nome, Icone }) => (
              <li key={nome}>
                <a href="#" aria-label={nome} className="text-white hover:text-amarelo">
                  <Icone className="size-[34px]" />
                </a>
              </li>
            ))}
          </ul>
          <span className="text-sm text-[#EDE6FA]">
            <u>Contato:</u>{" "}
            <a href="mailto:atendimento@nebulosacostumize.com.br" className="text-[#EDE6FA]">
              atendimento@nebulosacostumize.com.br
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
