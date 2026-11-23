// Ícones SVG inline (herdam a cor via currentColor)

const base = (props) => ({ viewBox: "0 0 24 24", "aria-hidden": true, focusable: false, ...props });
const traco = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" };

export const IconeUsuario = (p) => (
  <svg {...base(p)} {...traco} strokeWidth={1.6}><circle cx="12" cy="7.5" r="4.5" /><path d="M3.5 21.5c.6-4.6 4.2-7.5 8.5-7.5s7.9 2.9 8.5 7.5z" /></svg>
);
export const IconeCarrinho = (p) => (
  <svg {...base(p)} {...traco} strokeWidth={1.7}><path d="M1.5 3h3l2.4 11.2a1.5 1.5 0 0 0 1.5 1.2h9.3a1.5 1.5 0 0 0 1.5-1.1L21.5 7H6" /><path d="M9 10.5h9.5" /><circle cx="9.5" cy="19.5" r="1.4" /><circle cx="17.5" cy="19.5" r="1.4" /></svg>
);
export const IconeSair = (p) => (
  <svg {...base(p)} {...traco} strokeWidth={2}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="m16 17 5-5-5-5" /><path d="M21 12H9" /></svg>
);
export const IconeFechar = (p) => (
  <svg {...base(p)} {...traco} strokeWidth={2}><path d="M6 6l12 12M18 6 6 18" /></svg>
);
export const IconeMenu = (p) => (
  <svg {...base(p)} {...traco} strokeWidth={2}><path d="M3 6h18M3 12h18M3 18h18" /></svg>
);
export const IconeBusca = (p) => (
  <svg {...base(p)} {...traco}><circle cx="10.5" cy="10.5" r="7" /><path d="m16 16 5.5 5.5" /></svg>
);
export const IconeEstrela = (p) => (
  <svg {...base(p)} fill="currentColor"><path d="m12 2.5 2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z" /></svg>
);
export const IconeCheck = (p) => (
  <svg {...base(p)} {...traco} strokeWidth={2.4}><path d="m4 12.5 5 5L20 6.5" /></svg>
);
export const IconeCadeado = (p) => (
  <svg {...base(p)} {...traco}><rect x="4" y="10.5" width="16" height="11" rx="2" /><path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" /></svg>
);
export const IconeEmail = (p) => (
  <svg {...base(p)} {...traco}><rect x="2.5" y="5" width="19" height="14" rx="2" /><path d="m3 6 9 7 9-7" /></svg>
);
export const IconeOlho = (p) => (
  <svg {...base(p)} {...traco}><path d="M1.5 12S5.5 5 12 5s10.5 7 10.5 7-4 7-10.5 7S1.5 12 1.5 12z" /><circle cx="12" cy="12" r="3" /></svg>
);
export const IconeTelefone = (p) => (
  <svg {...base(p)} {...traco}><path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2z" /></svg>
);
export const IconePessoa = (p) => (
  <svg {...base(p)} {...traco}><circle cx="12" cy="8" r="4" /><path d="M4 21c.5-4 3.8-6.5 8-6.5s7.5 2.5 8 6.5" /></svg>
);
export const IconeCaixa = (p) => (
  <svg {...base(p)} {...traco}><path d="M3 7.5 12 3l9 4.5v9L12 21l-9-4.5z" /><path d="M3 7.5 12 12l9-4.5M12 12v9" /></svg>
);
export const IconeSeta = (p) => (
  <svg {...base(p)} {...traco} strokeWidth={2}><path d="m6 9 6 6 6-6" /></svg>
);
export const IconeSetaDireita = (p) => (
  <svg {...base(p)} {...traco} strokeWidth={2}><path d="M4 12h15M13 6l6 6-6 6" /></svg>
);
export const IconeCaminhao = (p) => (
  <svg {...base(p)} {...traco}><path d="M2 5h12v11H2zM14 9h4l4 4v3h-8z" /><circle cx="6" cy="18" r="2" /><circle cx="18" cy="18" r="2" /></svg>
);
export const IconeFolha = (p) => (
  <svg {...base(p)} {...traco}><path d="M4 20c0-9 6-15 16-16-1 10-7 16-16 16z" /><path d="M4 20 14 10" /></svg>
);
export const IconeEditar = (p) => (
  <svg {...base(p)} {...traco}><path d="M4 20h4L19 9l-4-4L4 16z" /><path d="m13.5 6.5 4 4" /></svg>
);
export const IconeLixeira = (p) => (
  <svg {...base(p)} {...traco}><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6" /></svg>
);
export const IconeWhatsapp = (p) => (
  <svg {...base(p)} {...traco} strokeWidth={1.6}><path d="M3.5 20.5 5 16a8.5 8.5 0 1 1 3.2 3.1z" /><path d="M9 8.5c0 3.4 3 6.5 6.5 6.5l1-1.6-2-1-1 .9a5 5 0 0 1-2.4-2.4l.9-1-1-2z" /></svg>
);
export const IconeInstagram = (p) => (
  <svg {...base(p)} {...traco}><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.3" cy="6.7" r="1" fill="currentColor" /></svg>
);
export const IconeFacebook = (p) => (
  <svg {...base(p)} fill="currentColor"><path d="M12 2a10 10 0 0 0-1.6 19.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 12 2z" /></svg>
);
export const IconeTiktok = (p) => (
  <svg {...base(p)} fill="currentColor"><path d="M16.6 2h-3.4v13.2a2.9 2.9 0 1 1-2-2.8V9a6.3 6.3 0 1 0 5.4 6.2V8.6a7.7 7.7 0 0 0 4.4 1.4V6.6a4.4 4.4 0 0 1-4.4-4.6z" /></svg>
);

// Meios de pagamento (coloridos)
export const IconeCartao = (p) => (
  <svg viewBox="0 0 64 44" aria-hidden {...p}><rect x="2" y="2" width="44" height="28" rx="4" fill="#3A246B" /><rect x="2" y="9" width="44" height="5" fill="#1E1033" /><rect x="16" y="14" width="46" height="28" rx="4" fill="#E7D8FF" stroke="#3A246B" strokeWidth="2" /><rect x="16" y="21" width="46" height="5" fill="#3A246B" /><rect x="22" y="32" width="14" height="3" rx="1.5" fill="#3A246B" /></svg>
);
export const IconePix = (p) => (
  <svg viewBox="0 0 48 48" aria-hidden {...p}><path fill="#3A246B" d="M24 3c1.4 0 2.8.6 3.8 1.6l6.4 6.4h-2.1c-1.6 0-3.1.6-4.2 1.7L24 16.6l-3.9-3.9A5.9 5.9 0 0 0 15.9 11h-2.1l6.4-6.4A5.4 5.4 0 0 1 24 3zM9.8 15h6.1c.6 0 1.2.2 1.6.7l4.5 4.5a2.8 2.8 0 0 0 4 0l4.5-4.5c.4-.4 1-.7 1.6-.7h6.1l5.2 5.2a5.4 5.4 0 0 1 0 7.6L38.2 33h-6.1c-.6 0-1.2-.2-1.6-.7l-4.5-4.5a2.8 2.8 0 0 0-4 0l-4.5 4.5c-.4.4-1 .7-1.6.7H9.8l-5.2-5.2a5.4 5.4 0 0 1 0-7.6zm4 22h2.1c1.6 0 3.1-.6 4.2-1.7l3.9-3.9 3.9 3.9a5.9 5.9 0 0 0 4.2 1.7h2.1l-6.4 6.4a5.4 5.4 0 0 1-7.6 0z" /></svg>
);
export const IconeBoleto = (p) => (
  <svg viewBox="0 0 48 36" fill="#3A246B" aria-hidden {...p}><rect x="2" y="4" width="3" height="28" /><rect x="8" y="4" width="1.5" height="28" /><rect x="12" y="4" width="4" height="28" /><rect x="19" y="4" width="1.5" height="28" /><rect x="23" y="4" width="3" height="28" /><rect x="29" y="4" width="1.5" height="28" /><rect x="33" y="4" width="4" height="28" /><rect x="40" y="4" width="1.5" height="28" /><rect x="44" y="4" width="2" height="28" /></svg>
);

/** Planeta do logotipo */
export const Planeta = (p) => (
  <svg viewBox="0 0 60 60" aria-hidden fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" {...p}>
    <circle cx="30" cy="30" r="15" />
    <path d="M17 26c6 2 18 2 26-1M18 34c8 2 17 2 25 0" strokeWidth="1.6" />
    <ellipse cx="30" cy="31" rx="28" ry="8" transform="rotate(-16 30 31)" />
    <path d="M49 6l1.2 3 3 1.2-3 1.2L49 14.4l-1.2-3-3-1.2 3-1.2z" fill="currentColor" stroke="none" />
  </svg>
);

/** Brilho de 4 pontas usado como decoração */
export const Brilho = ({ className, ...p }) => (
  <svg viewBox="-10 -10 20 20" aria-hidden className={className} {...p}>
    <path fill="currentColor" d="M0-10 2.2-2.2 10 0 2.2 2.2 0 10-2.2 2.2-10 0-2.2-2.2z" />
  </svg>
);
