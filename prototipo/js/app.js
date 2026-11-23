/* =========================================================
   Nebulosa — scripts compartilhados do protótipo
   - header / footer / drawer do carrinho (injetados em todas as páginas)
   - sessão simulada (localStorage) e carrinho (localStorage)
   ========================================================= */

const FRETE_GRATIS_A_PARTIR = 199;
const FRETE_PADRAO = 19.9;

/* ---------- Ícones (SVG inline) ---------- */
const ICONES = {
  busca: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="7"/><path d="m16 16 5.5 5.5"/></svg>',
  usuario: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><circle cx="12" cy="7.5" r="4.5"/><path d="M3.5 21.5c.6-4.6 4.2-7.5 8.5-7.5s7.9 2.9 8.5 7.5z"/></svg>',
  carrinho: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M1.5 3h3l2.4 11.2a1.5 1.5 0 0 0 1.5 1.2h9.3a1.5 1.5 0 0 0 1.5-1.1L21.5 7H6"/><path d="M9 10.5h9.5"/><circle cx="9.5" cy="19.5" r="1.4"/><circle cx="17.5" cy="19.5" r="1.4"/></svg>',
  sair: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/></svg>',
  fechar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  menu: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
  estrela: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="m12 2.5 2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z"/></svg>',
  estrelaMeia: '<svg viewBox="0 0 24 24"><defs><linearGradient id="meia"><stop offset="50%" stop-color="currentColor"/><stop offset="50%" stop-color="#D5CCE6"/></linearGradient></defs><path fill="url(#meia)" d="m12 2.5 2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z"/></svg>',
  estrelaVazia: '<svg viewBox="0 0 24 24" fill="#D5CCE6"><path d="m12 2.5 2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.3l-5.9 3.3 1.3-6.6-4.9-4.6 6.6-.8z"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m4 12.5 5 5L20 6.5"/></svg>',
  cadeado: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><rect x="4" y="10.5" width="16" height="11" rx="2"/><path d="M8 10.5V7a4 4 0 0 1 8 0v3.5"/></svg>',
  email: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><rect x="2.5" y="5" width="19" height="14" rx="2"/><path d="m3 6 9 7 9-7"/></svg>',
  olho: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M1.5 12S5.5 5 12 5s10.5 7 10.5 7-4 7-10.5 7S1.5 12 1.5 12z"/><circle cx="12" cy="12" r="3"/></svg>',
  telefone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2z"/></svg>',
  pessoa: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="8" r="4"/><path d="M4 21c.5-4 3.8-6.5 8-6.5s7.5 2.5 8 6.5"/></svg>',
  caixa: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M3 7.5 12 3l9 4.5v9L12 21l-9-4.5z"/><path d="M3 7.5 12 12l9-4.5M12 12v9"/></svg>',
  seta: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>',
  setaDir: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="1em" height="1em" style="display:inline"><path d="M4 12h15M13 6l6 6-6 6"/></svg>',
  whatsapp: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M3.5 20.5 5 16a8.5 8.5 0 1 1 3.2 3.1z"/><path d="M9 8.5c0 3.4 3 6.5 6.5 6.5l1-1.6-2-1-1 .9a5 5 0 0 1-2.4-2.4l.9-1-1-2z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r="1" fill="currentColor"/></svg>',
  facebook: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 0 0-1.6 19.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 12 2z"/></svg>',
  tiktok: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.6 2h-3.4v13.2a2.9 2.9 0 1 1-2-2.8V9a6.3 6.3 0 1 0 5.4 6.2V8.6a7.7 7.7 0 0 0 4.4 1.4V6.6a4.4 4.4 0 0 1-4.4-4.6z"/></svg>',
  cartao: '<svg viewBox="0 0 64 44"><rect x="2" y="2" width="44" height="28" rx="4" fill="#3A246B"/><rect x="2" y="9" width="44" height="5" fill="#1E1033"/><rect x="16" y="14" width="46" height="28" rx="4" fill="#E7D8FF" stroke="#3A246B" stroke-width="2"/><rect x="16" y="21" width="46" height="5" fill="#3A246B"/><rect x="22" y="32" width="14" height="3" rx="1.5" fill="#3A246B"/></svg>',
  pix: '<svg viewBox="0 0 48 48"><path fill="#3A246B" d="M24 3c1.4 0 2.8.6 3.8 1.6l6.4 6.4h-2.1c-1.6 0-3.1.6-4.2 1.7L24 16.6l-3.9-3.9A5.9 5.9 0 0 0 15.9 11h-2.1l6.4-6.4A5.4 5.4 0 0 1 24 3zM9.8 15h6.1c.6 0 1.2.2 1.6.7l4.5 4.5a2.8 2.8 0 0 0 4 0l4.5-4.5c.4-.4 1-.7 1.6-.7h6.1l5.2 5.2a5.4 5.4 0 0 1 0 7.6L38.2 33h-6.1c-.6 0-1.2-.2-1.6-.7l-4.5-4.5a2.8 2.8 0 0 0-4 0l-4.5 4.5c-.4.4-1 .7-1.6.7H9.8l-5.2-5.2a5.4 5.4 0 0 1 0-7.6zm4 22h2.1c1.6 0 3.1-.6 4.2-1.7l3.9-3.9 3.9 3.9a5.9 5.9 0 0 0 4.2 1.7h2.1l-6.4 6.4a5.4 5.4 0 0 1-7.6 0z"/></svg>',
  boleto: '<svg viewBox="0 0 48 36" fill="#3A246B"><rect x="2" y="4" width="3" height="28"/><rect x="8" y="4" width="1.5" height="28"/><rect x="12" y="4" width="4" height="28"/><rect x="19" y="4" width="1.5" height="28"/><rect x="23" y="4" width="3" height="28"/><rect x="29" y="4" width="1.5" height="28"/><rect x="33" y="4" width="4" height="28"/><rect x="40" y="4" width="1.5" height="28"/><rect x="44" y="4" width="2" height="28"/></svg>',
  caminhao: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M2 5h12v11H2zM14 9h4l4 4v3h-8z"/><circle cx="6" cy="18" r="2"/><circle cx="18" cy="18" r="2"/></svg>',
  folha: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20c0-9 6-15 16-16-1 10-7 16-16 16z"/><path d="M4 20 14 10"/></svg>',
  editar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M4 20h4L19 9l-4-4L4 16z"/><path d="m13.5 6.5 4 4"/></svg>',
  lixeira: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6"/></svg>'
};

// planeta usado no logotipo e nos detalhes
const PLANETA_SVG = `<svg class="logo-planeta" viewBox="0 0 60 60" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round">
  <circle cx="30" cy="30" r="15"/>
  <path d="M17 26c6 2 18 2 26-1M18 34c8 2 17 2 25 0" stroke-width="1.6"/>
  <ellipse cx="30" cy="31" rx="28" ry="8" transform="rotate(-16 30 31)"/>
  <path d="M49 6l1.2 3 3 1.2-3 1.2L49 14.4l-1.2-3-3-1.2 3-1.2z" fill="currentColor" stroke="none"/>
</svg>`;

/* ---------- Utilidades ---------- */
const brl = (v) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const dataBR = (iso, comHora = false) => {
  if (!iso) return "—";
  const d = new Date(iso);
  return comHora
    ? d.toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" })
    : d.toLocaleDateString("pt-BR");
};
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const qs = (sel, el = document) => el.querySelector(sel);
const qsa = (sel, el = document) => [...el.querySelectorAll(sel)];
const iniciais = (nome) => nome.trim().split(/\s+/).filter(Boolean).map((p) => p[0]).slice(0, 2).join("").toUpperCase();
const getProduto = (id) => window.PRODUTOS.find((p) => p.id === Number(id));
const store = {
  get(k, padrao) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : padrao; } catch { return padrao; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* sem storage */ } },
  del(k) { try { localStorage.removeItem(k); } catch { /* sem storage */ } }
};

/* ---------- Sessão (simulada) ---------- */
const Auth = {
  usuario() { return store.get("nebulosa:usuario", null); },
  logado() { return !!this.usuario(); },
  entrar(dados) { store.set("nebulosa:usuario", dados); },
  atualizar(dados) { store.set("nebulosa:usuario", { ...this.usuario(), ...dados }); },
  sair() { store.del("nebulosa:usuario"); },
  exigir() {
    if (!this.logado()) {
      const volta = encodeURIComponent(location.pathname.split("/").pop() + location.search);
      location.replace(`login.html?volta=${volta}`);
      return false;
    }
    return true;
  }
};

/* ---------- Carrinho ---------- */
const Carrinho = {
  itens() { return store.get("nebulosa:carrinho", []); },
  salvar(itens) { store.set("nebulosa:carrinho", itens); atualizarBadge(); renderDrawer(); },
  adicionar(id, qtd = 1) {
    const itens = this.itens();
    const item = itens.find((i) => i.id === id);
    if (item) item.qtd = Math.min(99, item.qtd + qtd); else itens.push({ id, qtd });
    this.salvar(itens);
  },
  alterar(id, qtd) {
    let itens = this.itens();
    if (qtd <= 0) itens = itens.filter((i) => i.id !== id);
    else itens.find((i) => i.id === id).qtd = Math.min(99, qtd);
    this.salvar(itens);
  },
  remover(id) { this.salvar(this.itens().filter((i) => i.id !== id)); },
  limpar() { this.salvar([]); },
  quantidade() { return this.itens().reduce((s, i) => s + i.qtd, 0); },
  detalhado() {
    return this.itens().map((i) => ({ ...i, produto: getProduto(i.id) })).filter((i) => i.produto);
  },
  totais() {
    const linhas = this.detalhado();
    const bruto = linhas.reduce((s, i) => s + i.produto.preco * i.qtd, 0);
    const subtotal = linhas.reduce((s, i) => s + i.produto.precoDesconto * i.qtd, 0);
    const frete = subtotal === 0 || subtotal >= FRETE_GRATIS_A_PARTIR ? 0 : FRETE_PADRAO;
    return { bruto, subtotal, economia: bruto - subtotal, frete, total: subtotal + frete };
  }
};

/* ---------- Avaliações ---------- */
function avaliacoesDo(produtoId) {
  const extras = store.get("nebulosa:avaliacoes", []);
  return [...extras, ...window.AVALIACOES].filter((a) => a.produto_id === produtoId);
}
function notaMedia(produtoId) {
  const av = avaliacoesDo(produtoId);
  if (!av.length) return null;
  return av.reduce((s, a) => s + Number(a.nota), 0) / av.length;
}
function estrelasHTML(nota) {
  let h = "";
  for (let i = 1; i <= 5; i++) {
    if (nota >= i - 0.25) h += ICONES.estrela;
    else if (nota >= i - 0.75) h += ICONES.estrelaMeia;
    else h += ICONES.estrelaVazia;
  }
  return `<span class="estrelas" aria-label="Nota ${nota.toFixed(1)} de 5">${h}</span>`;
}

/* ---------- Card de produto ---------- */
function cardProduto(p) {
  const temDesconto = p.precoDesconto < p.preco;
  const pct = temDesconto ? Math.round((1 - p.precoDesconto / p.preco) * 100) : 0;
  const media = notaMedia(p.id);
  return `
  <article class="card-produto">
    ${pct >= 15 ? `<span class="card-tag">-${pct}%</span>` : ""}
    <div class="card-img"><img src="${p.fotoCapa}" alt="" loading="lazy"></div>
    <div class="card-corpo">
      <a class="card-nome" href="produto.html?id=${p.id}">${esc(p.nome)}</a>
      ${media ? `<span class="card-nota">${ICONES.estrela} ${media.toFixed(1)}</span>` : ""}
      <div class="card-rodape">
        <div>
          ${temDesconto ? `<span class="preco-de"><span class="sr-only">De </span>${brl(p.preco)}</span>` : `<span class="preco-de" aria-hidden="true">&nbsp;</span>`}
          <span class="preco-por">${temDesconto ? '<span class="sr-only">por </span>' : ""}${brl(p.precoDesconto)}</span>
        </div>
        <button class="btn-carrinho-redondo" data-add="${p.id}" aria-label="Adicionar ${esc(p.nome)} ao carrinho">${ICONES.carrinho}</button>
      </div>
    </div>
  </article>`;
}

/* ---------- Header ---------- */
function renderHeader() {
  const pagina = document.body.dataset.pagina || "";
  const user = Auth.usuario();
  const link = (href, txt, chave) => `<li><a href="${href}" ${pagina === chave ? 'aria-current="page"' : ""}>${txt}</a></li>`;
  const header = document.createElement("header");
  header.className = "site-header";
  header.innerHTML = `
    <div class="container header-inner">
      <a class="logo" href="index.html" aria-label="Nebulosa — página inicial">Nebul${PLANETA_SVG}sa</a>
      <nav class="nav-principal" id="nav-principal" aria-label="Principal">
        <ul>
          ${link("index.html", "Início", "inicio")}
          ${link("produtos.html", "Produtos", "produtos")}
          ${link("sobre.html", "Sobre Nós", "sobre")}
        </ul>
      </nav>
      <div class="header-acoes">
        ${user
          ? `<span class="saudacao">Olá, ${esc(user.nome.split(" ")[0])}</span>
             <a class="icone-btn" href="perfil.html" aria-label="Meu perfil" ${pagina === "perfil" ? 'aria-current="page"' : ""}>${ICONES.usuario}</a>`
          : `<a class="icone-btn" href="login.html" aria-label="Entrar ou criar conta">${ICONES.usuario}</a>`}
        <button class="icone-btn" id="abrir-carrinho" aria-label="Abrir carrinho" aria-controls="drawer-carrinho" aria-expanded="false">
          ${ICONES.carrinho}<span class="badge" id="badge-carrinho" hidden>0</span>
        </button>
        ${user ? `<button class="btn-sair" id="btn-sair">${ICONES.sair}<span class="txt">Sair</span></button>` : ""}
        <button class="icone-btn menu-toggle" id="menu-toggle" aria-label="Abrir menu" aria-expanded="false" aria-controls="nav-principal">${ICONES.menu}</button>
      </div>
    </div>`;
  document.body.prepend(header);

  qs("#abrir-carrinho").addEventListener("click", abrirDrawer);
  qs("#menu-toggle").addEventListener("click", (e) => {
    const nav = qs("#nav-principal");
    const aberto = nav.classList.toggle("aberto");
    e.currentTarget.setAttribute("aria-expanded", aberto);
  });
  const sair = qs("#btn-sair");
  if (sair) sair.addEventListener("click", () => {
    Auth.sair();
    sessionStorage.setItem("nebulosa:toast", "Você saiu da sua conta. Até logo! ✨");
    location.href = "index.html";
  });
}

/* ---------- Footer ---------- */
function renderFooter() {
  const footer = document.createElement("footer");
  footer.className = "site-footer";
  footer.innerHTML = `
    <div class="container footer-inner">
      <div>
        <small>© 2026 Nebulosa Costumize.<br>Todos os direitos reservados.</small>
        <ul class="footer-links">
          <li><a href="produtos.html">Produtos</a></li>
          <li><a href="sobre.html">Sobre nós</a></li>
          <li><a href="index.html#faq">Dúvidas</a></li>
        </ul>
      </div>
      <a class="logo" href="index.html" aria-label="Nebulosa — página inicial">Nebul${PLANETA_SVG}sa</a>
      <div class="footer-redes">
        <ul>
          <li><a href="#" aria-label="WhatsApp">${ICONES.whatsapp}</a></li>
          <li><a href="#" aria-label="Instagram">${ICONES.instagram}</a></li>
          <li><a href="#" aria-label="Facebook">${ICONES.facebook}</a></li>
          <li><a href="#" aria-label="TikTok">${ICONES.tiktok}</a></li>
        </ul>
        <span class="footer-contato"><u>Contato:</u> <a href="mailto:atendimento@nebulosacostumize.com.br">atendimento@nebulosacostumize.com.br</a></span>
      </div>
    </div>`;
  document.body.append(footer);
}

/* ---------- Drawer do carrinho ---------- */
let ultimoFoco = null;

function montarDrawer() {
  const fundo = document.createElement("div");
  fundo.className = "drawer-fundo";
  fundo.id = "drawer-fundo";
  fundo.addEventListener("click", fecharDrawer);

  const drawer = document.createElement("aside");
  drawer.className = "drawer";
  drawer.id = "drawer-carrinho";
  drawer.setAttribute("role", "dialog");
  drawer.setAttribute("aria-modal", "true");
  drawer.setAttribute("aria-labelledby", "drawer-titulo");
  drawer.innerHTML = `
    <div class="drawer-cab">
      <h2 id="drawer-titulo">${ICONES.carrinho} Seu carrinho</h2>
      <button class="icone-btn" id="fechar-carrinho" aria-label="Fechar carrinho">${ICONES.fechar}</button>
    </div>
    <div id="drawer-conteudo" style="display:flex;flex-direction:column;flex:1;min-height:0"></div>`;
  document.body.append(fundo, drawer);

  qs("#fechar-carrinho").addEventListener("click", fecharDrawer);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer.classList.contains("aberto")) fecharDrawer();
    if (e.key === "Tab" && drawer.classList.contains("aberto")) prenderFoco(e, drawer);
  });

  // delegação: + / - / remover
  drawer.addEventListener("click", (e) => {
    const b = e.target.closest("button[data-acao]");
    if (!b) return;
    const id = Number(b.dataset.id);
    const item = Carrinho.itens().find((i) => i.id === id);
    if (b.dataset.acao === "mais") Carrinho.alterar(id, item.qtd + 1);
    if (b.dataset.acao === "menos") Carrinho.alterar(id, item.qtd - 1);
    if (b.dataset.acao === "remover") Carrinho.remover(id);
    const alvo = qs(`button[data-acao="${b.dataset.acao}"][data-id="${id}"]`, drawer) || qs("#fechar-carrinho");
    alvo.focus();
  });
  drawer.addEventListener("change", (e) => {
    if (e.target.matches("input[data-qtd]")) {
      Carrinho.alterar(Number(e.target.dataset.qtd), parseInt(e.target.value, 10) || 0);
    }
  });
  renderDrawer();
}

function prenderFoco(e, el) {
  const focaveis = qsa('a[href], button:not([disabled]), input', el);
  if (!focaveis.length) return;
  const primeiro = focaveis[0], ultimo = focaveis[focaveis.length - 1];
  if (e.shiftKey && document.activeElement === primeiro) { e.preventDefault(); ultimo.focus(); }
  else if (!e.shiftKey && document.activeElement === ultimo) { e.preventDefault(); primeiro.focus(); }
}

function renderDrawer() {
  const alvo = qs("#drawer-conteudo");
  if (!alvo) return;
  const linhas = Carrinho.detalhado();
  if (!linhas.length) {
    alvo.innerHTML = `
      <div class="drawer-vazio">
        <div>
          ${ICONES.carrinho}
          <p><strong>Seu carrinho está vazio.</strong><br>Que tal explorar nossa galáxia de produtos?</p>
          <a class="btn btn-primario" href="produtos.html">Ver produtos ${ICONES.setaDir}</a>
        </div>
      </div>`;
    return;
  }
  const t = Carrinho.totais();
  const falta = Math.max(0, FRETE_GRATIS_A_PARTIR - t.subtotal);
  const pct = Math.min(100, (t.subtotal / FRETE_GRATIS_A_PARTIR) * 100);
  const destinoCheckout = Auth.logado() ? "pedido.html" : "login.html?volta=pedido.html";
  alvo.innerHTML = `
    <div class="frete-barra">
      ${falta > 0 ? `Faltam <strong>${brl(falta)}</strong> para ganhar <strong>frete grátis</strong> ✨` : `🎉 Você ganhou <strong>frete grátis</strong>!`}
      <div class="trilho"><i style="width:${pct}%"></i></div>
    </div>
    <ul class="drawer-itens">
      ${linhas.map(({ produto: p, qtd }) => `
        <li class="drawer-item">
          <img src="${p.fotoCapa}" alt="">
          <div>
            <a class="nome" href="produto.html?id=${p.id}">${esc(p.nome)}</a>
            <span class="unit">${brl(p.precoDesconto)} / un.${p.cor ? ` · ${esc(p.cor)}` : ""}${p.tamanho ? ` · ${esc(p.tamanho)}` : ""}</span>
            <div class="linha">
              <div class="qtd pequena" role="group" aria-label="Quantidade de ${esc(p.nome)}">
                <button type="button" data-acao="menos" data-id="${p.id}" aria-label="Diminuir">−</button>
                <input type="number" min="0" max="99" value="${qtd}" data-qtd="${p.id}" aria-label="Quantidade">
                <button type="button" data-acao="mais" data-id="${p.id}" aria-label="Aumentar">+</button>
              </div>
              <span class="total-item">${brl(p.precoDesconto * qtd)}</span>
            </div>
            <button class="btn-remover" data-acao="remover" data-id="${p.id}">Remover</button>
          </div>
        </li>`).join("")}
    </ul>
    <div class="drawer-rodape">
      <div class="resumo-linhas">
        <div><span>Subtotal (${Carrinho.quantidade()} ${Carrinho.quantidade() === 1 ? "item" : "itens"})</span><span>${brl(t.subtotal)}</span></div>
        ${t.economia > 0 ? `<div class="desconto"><span>Você economiza</span><span>− ${brl(t.economia)}</span></div>` : ""}
        <div><span>Frete</span><span>${t.frete === 0 ? "Grátis" : brl(t.frete)}</span></div>
        <div class="total"><span>Total</span><span>${brl(t.total)}</span></div>
      </div>
      <a class="btn btn-primario btn-bloco" href="${destinoCheckout}">Finalizar pedido ${ICONES.setaDir}</a>
      <button class="btn btn-contorno btn-bloco" type="button" id="continuar-comprando">Continuar comprando</button>
      <p class="nota-seg">${ICONES.cadeado} Compra 100% segura · até 3x sem juros</p>
    </div>`;
  qs("#continuar-comprando").addEventListener("click", fecharDrawer);
}

function abrirDrawer() {
  ultimoFoco = document.activeElement;
  qs("#drawer-carrinho").classList.add("aberto");
  qs("#drawer-fundo").classList.add("aberto");
  qs("#abrir-carrinho").setAttribute("aria-expanded", "true");
  document.body.classList.add("sem-scroll");
  setTimeout(() => qs("#fechar-carrinho").focus(), 50);
}
function fecharDrawer() {
  qs("#drawer-carrinho").classList.remove("aberto");
  qs("#drawer-fundo").classList.remove("aberto");
  qs("#abrir-carrinho").setAttribute("aria-expanded", "false");
  document.body.classList.remove("sem-scroll");
  if (ultimoFoco) ultimoFoco.focus();
}

function atualizarBadge() {
  const b = qs("#badge-carrinho");
  if (!b) return;
  const n = Carrinho.quantidade();
  b.textContent = n > 99 ? "99+" : n;
  b.hidden = n === 0;
  qs("#abrir-carrinho").setAttribute("aria-label", `Abrir carrinho (${n} ${n === 1 ? "item" : "itens"})`);
}

/* ---------- Toast ---------- */
function toast(msg, acao) {
  let area = qs(".toast-area");
  if (!area) {
    area = document.createElement("div");
    area.className = "toast-area";
    area.setAttribute("role", "status");
    area.setAttribute("aria-live", "polite");
    document.body.append(area);
  }
  const t = document.createElement("div");
  t.className = "toast";
  t.innerHTML = `${ICONES.check}<span>${msg}</span>`;
  if (acao) {
    const b = document.createElement("button");
    b.textContent = acao.texto;
    b.addEventListener("click", acao.fn);
    t.append(b);
  }
  area.append(t);
  setTimeout(() => t.remove(), 3500);
}

/* ---------- Inicialização ---------- */
document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  renderFooter();
  montarDrawer();
  atualizarBadge();

  // botões "adicionar ao carrinho" em qualquer card
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-add]");
    if (!b) return;
    e.preventDefault();
    const p = getProduto(b.dataset.add);
    Carrinho.adicionar(p.id, 1);
    toast(`<b>${esc(p.nome)}</b> adicionado ao carrinho`, { texto: "Ver carrinho", fn: abrirDrawer });
  });

  const pendente = sessionStorage.getItem("nebulosa:toast");
  if (pendente) { sessionStorage.removeItem("nebulosa:toast"); setTimeout(() => toast(pendente), 200); }
});
