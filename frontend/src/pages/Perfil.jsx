import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import Campo from "../components/Campo";
import { Alerta, Carregando, EstadoVazio } from "../components/Feedback";
import { CaretDown, Package, PencilSimple, Trash, User } from "@phosphor-icons/react";
import { useApi } from "../hooks/useApi";
import { useFormulario } from "../hooks/useFormulario";
import { useTitulo } from "../hooks/useTitulo";
import { pedidoService } from "../services/pedidoService";
import { usuarioService } from "../services/usuarioService";
import { useAuthStore } from "../stores/authStore";
import { toast } from "../stores/toastStore";
import { brl, dataBR, iniciais, mascaraTelefone, primeiroNome } from "../utils/formatar";
import { ETAPAS_PEDIDO, ROTULO_STATUS, STATUS_PERMITE_AVALIAR } from "../utils/regras";

export default function Perfil() {
  useTitulo("Minha conta");
  const usuario = useAuthStore((s) => s.usuario);

  return (
    <>
      <div className="bg-noite pt-10 pb-[90px] text-white">
        <div className="container-site">
          <h1 className="text-[clamp(2rem,4vw,3rem)] text-white">Olá, {primeiroNome(usuario.nome)}!</h1>
          <p className="mt-1 text-lilas">Gerencie seus dados e acompanhe seus pedidos.</p>
        </div>
      </div>

      <div className="container-site -mt-[60px] mb-14 grid items-start gap-7 lg:grid-cols-[260px_1fr]">
        <aside aria-label="Menu da conta" className="rounded-[18px] bg-white p-5.5 shadow-card lg:sticky lg:top-[104px]">
          <div aria-hidden className="mx-auto mb-2.5 grid size-[72px] place-items-center rounded-full bg-roxo text-2xl font-bold text-white">
            {iniciais(usuario.nome)}
          </div>
          <div className="text-center font-bold">{usuario.nome}</div>
          <div className="mb-4 text-center text-sm break-all text-texto-suave">{usuario.email}</div>
          <nav className="grid">
            {[["#dados", User, "Meus dados"], ["#pedidos", Package, "Meus pedidos"], ["#excluir", Trash, "Excluir conta"]].map(([href, Icone, texto]) => (
              <a key={href} href={href} className="flex items-center gap-2.5 rounded-[10px] px-3 py-2.5 font-medium text-roxo-escuro no-underline hover:bg-lilas-2 hover:text-roxo">
                <Icone className="size-5" /> {texto}
              </a>
            ))}
          </nav>
        </aside>

        <div className="grid gap-7">
          <DadosPessoais />
          <MeusPedidos />
          <ExcluirConta />
        </div>
      </div>
    </>
  );
}

/* ---------------- Dados pessoais (ver / editar) ---------------- */
function DadosPessoais() {
  const usuario = useAuthStore((s) => s.usuario);
  const definirUsuario = useAuthStore((s) => s.definirUsuario);
  const [editando, setEditando] = useState(false);
  const form = useFormulario({});

  function iniciarEdicao() {
    form.setValores({ nome: usuario.nome, email: usuario.email, telefone: usuario.telefone, senhaAtual: "", novaSenha: "", confirmacaoNovaSenha: "" });
    form.setErros({});
    form.setErroGeral("");
    setEditando(true);
  }

  async function salvar(e) {
    e.preventDefault();
    const atualizado = await form.enviar(usuarioService.atualizar);
    if (!atualizado) return;
    definirUsuario(atualizado);
    setEditando(false);
    toast(form.valores.novaSenha ? "Dados e senha atualizados!" : "Dados atualizados com sucesso!");
  }

  const { valores, alterar, erros } = form;

  return (
    <section id="dados" className="painel" aria-labelledby="titulo-dados">
      <div className="mb-4.5 flex flex-wrap items-center justify-between gap-4">
        <h2 id="titulo-dados" className="text-[1.9rem]">Meus dados</h2>
        {!editando && (
          <button type="button" className="btn btn-contorno" onClick={iniciarEdicao}>
            <PencilSimple /> Editar dados
          </button>
        )}
      </div>

      {!editando ? (
        <dl className="grid gap-x-7 gap-y-4.5 sm:grid-cols-2">
          {[["Nome completo", usuario.nome], ["E-mail", usuario.email], ["Telefone", usuario.telefone], ["Senha", "••••••••"]].map(([rotulo, valor]) => (
            <div key={rotulo}>
              <dt className="font-rotulo text-xs font-semibold tracking-[0.12em] text-texto-suave uppercase">{rotulo}</dt>
              <dd className="mt-0.5 text-[1.05rem] font-semibold">{valor}</dd>
            </div>
          ))}
        </dl>
      ) : (
        <form onSubmit={salvar} noValidate>
          {form.erroGeral && !Object.keys(erros).length && <Alerta tipo="erro">{form.erroGeral}</Alerta>}
          <div className="grid gap-x-4 sm:grid-cols-2">
            <Campo rotulo="Nome completo" name="nome" autoComplete="name" value={valores.nome} onChange={alterar()} erro={erros.nome} />
            <Campo rotulo="E-mail" name="email" type="email" autoComplete="email" value={valores.email} onChange={alterar()} erro={erros.email} />
            <Campo rotulo="Telefone" name="telefone" type="tel" autoComplete="tel" value={valores.telefone} onChange={alterar(mascaraTelefone)} erro={erros.telefone} />
            <Campo rotulo="Senha atual (obrigatória para salvar)" name="senhaAtual" type="password" autoComplete="current-password" value={valores.senhaAtual} onChange={alterar()} erro={erros.senhaAtual} />
          </div>
          <details className="mb-4" open={!!(erros.novaSenha || erros.confirmacaoNovaSenha)}>
            <summary className="cursor-pointer font-semibold text-roxo">Alterar senha</summary>
            <div className="mt-3 grid gap-x-4 sm:grid-cols-2">
              <Campo rotulo="Nova senha" name="novaSenha" type="password" autoComplete="new-password" ajuda="Mínimo de 8 caracteres, com letras e números." value={valores.novaSenha} onChange={alterar()} erro={erros.novaSenha} />
              <Campo rotulo="Confirmar nova senha" name="confirmacaoNovaSenha" type="password" autoComplete="new-password" value={valores.confirmacaoNovaSenha} onChange={alterar()} erro={erros.confirmacaoNovaSenha} />
            </div>
          </details>
          <div className="flex flex-wrap gap-2.5">
            <button type="submit" className="btn btn-primario" disabled={form.enviando}>
              {form.enviando ? "Salvando..." : "Salvar alterações"}
            </button>
            <button type="button" className="btn btn-contorno" onClick={() => setEditando(false)}>
              Cancelar
            </button>
          </div>
        </form>
      )}
    </section>
  );
}

/* ---------------- Pedidos ---------------- */
const COR_STATUS = {
  pendente: "bg-[#FFF2C8] text-[#8A6400]",
  pago: "bg-[#E3F0FF] text-[#1D5FA8]",
  "em produção": "bg-lilas text-roxo-escuro",
  enviado: "bg-[#E0F4F4] text-[#136B6B]",
  entregue: "bg-[#E8F6EE] text-[#1E6B3E]",
  cancelado: "bg-[#FDECEA] text-[#A23224]",
  "devolução solicitada": "bg-[#FFEBD9] text-[#9A4A0B]",
  devolvido: "bg-[#ECEAF0] text-[#4B4558]",
};

/** Status fora do fluxo normal: mostram um aviso no lugar da linha do tempo */
const AVISO_STATUS = {
  cancelado: ["erro", "Este pedido foi cancelado."],
  "devolução solicitada": ["info", "Recebemos seu pedido de devolução. Assim que o produto chegar ao ateliê, fazemos o reembolso."],
  devolvido: ["info", "Produto devolvido e valor reembolsado."],
};

function Status({ status }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[.82rem] font-bold whitespace-nowrap before:size-2 before:rounded-full before:bg-current ${COR_STATUS[status] || "bg-lilas-2"}`}>
      {ROTULO_STATUS[status] || status}
    </span>
  );
}

const Rotulo = ({ children }) => <span className="block font-rotulo text-[.72rem] font-semibold tracking-[0.12em] text-texto-suave uppercase">{children}</span>;

function MeusPedidos() {
  const { dados: pedidos, carregando, erro } = useApi(() => pedidoService.listar(), []);

  return (
    <section id="pedidos" className="painel" aria-labelledby="titulo-pedidos">
      <div className="mb-4.5 flex flex-wrap items-center justify-between gap-4">
        <h2 id="titulo-pedidos" className="text-[1.9rem]">Meus pedidos</h2>
        {pedidos && <span className="text-texto-suave">{pedidos.length} {pedidos.length === 1 ? "pedido" : "pedidos"}</span>}
      </div>
      {carregando && <Carregando />}
      <Alerta tipo="erro">{erro?.message}</Alerta>
      {pedidos?.length === 0 && (
        <EstadoVazio icone={Package} titulo="Você ainda não fez nenhum pedido.">
          <Link to="/produtos" className="btn btn-primario mt-4">Explorar produtos</Link>
        </EstadoVazio>
      )}
      <div className="grid gap-4">
        {pedidos?.map((p, i) => <Pedido key={p.id} pedido={p} aberto={i === 0} />)}
      </div>
    </section>
  );
}

function Pedido({ pedido: p, aberto }) {
  const etapa = ETAPAS_PEDIDO.indexOf(p.status);
  const qtdItens = p.itens.reduce((s, i) => s + i.quantidade, 0);

  return (
    <details open={aberto} className="group overflow-hidden rounded-[14px] border-[1.5px] border-borda">
      <summary className="grid cursor-pointer list-none grid-cols-2 items-center gap-3.5 bg-lilas-2 px-4.5 py-4 md:grid-cols-[1.2fr_1fr_1fr_1fr_auto] [&::-webkit-details-marker]:hidden">
        <div><Rotulo>Pedido</Rotulo><span className="font-bold">#{p.id}</span></div>
        <div><Rotulo>Data</Rotulo><span className="font-bold">{dataBR(p.data)}</span></div>
        <div><Rotulo>Total</Rotulo><span className="font-bold">{brl(p.total)}</span></div>
        <div><Status status={p.status} /></div>
        <CaretDown className="size-5.5 text-roxo transition group-open:rotate-180" />
      </summary>

      <div className="grid gap-4.5 p-4.5">
        {AVISO_STATUS[p.status] ? (
          <Alerta tipo={AVISO_STATUS[p.status][0]} className="mb-0">{AVISO_STATUS[p.status][1]}</Alerta>
        ) : (
          <ol aria-label="Andamento do pedido" className="flex">
            {ETAPAS_PEDIDO.map((s, k) => (
              <li
                key={s}
                className={`relative flex-1 pt-5.5 text-center text-xs before:absolute before:top-1 before:left-1/2 before:z-10 before:size-3.5 before:-translate-x-1/2 before:rounded-full after:absolute after:top-2.5 after:-left-1/2 after:h-[3px] after:w-full first:after:hidden ${
                  k <= etapa ? "font-semibold text-roxo-escuro before:bg-roxo after:bg-roxo" : "text-texto-suave before:bg-[#E3DBF1] after:bg-[#E3DBF1]"
                }`}
              >
                {ROTULO_STATUS[s]}
              </li>
            ))}
          </ol>
        )}

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[.95rem]">
            <caption className="sr-only">Itens do pedido #{p.id}</caption>
            <thead>
              <tr className="border-b-[1.5px] border-borda text-left text-xs tracking-widest text-texto-suave uppercase">
                <th className="px-2 py-1.5 font-semibold">Produto</th>
                <th className="px-2 py-1.5 text-right font-semibold">Qtd.</th>
                <th className="hidden px-2 py-1.5 text-right font-semibold sm:table-cell">Preço un.</th>
                <th className="px-2 py-1.5 text-right font-semibold">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {p.itens.map((i) => (
                <tr key={i.produtoId} className="border-b border-[#EFE8FA]">
                  <td className="px-2 py-2.5">
                    <div className="flex items-center gap-3">
                      <img src={i.fotoCapa} alt="" className="size-[52px] rounded-lg bg-foto object-cover" />
                      <Link to={`/produtos/${i.produtoId}`} className="font-semibold text-roxo-escuro no-underline hover:text-roxo">{i.nome}</Link>
                    </div>
                  </td>
                  <td className="px-2 text-right">{i.quantidade}</td>
                  <td className="hidden px-2 text-right whitespace-nowrap sm:table-cell">{brl(i.preco)}</td>
                  <td className="px-2 text-right whitespace-nowrap">{brl(i.subtotal)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr><td colSpan={3} className="px-2 pt-2.5">Itens ({qtdItens})</td><td className="px-2 pt-2.5 text-right">{brl(p.subtotal)}</td></tr>
              <tr><td colSpan={3} className="px-2">Frete</td><td className="px-2 text-right">{p.frete ? brl(p.frete) : "Grátis"}</td></tr>
              <tr className="font-bold"><td colSpan={3} className="px-2 py-1.5">Total do pedido</td><td className="px-2 text-right">{brl(p.total)}</td></tr>
            </tfoot>
          </table>
        </div>

        <div className="grid gap-3.5 text-sm md:grid-cols-3">
          <div className="rounded-[10px] bg-creme px-3.5 py-2.5"><Rotulo>Endereço de entrega</Rotulo>{p.endereco || "—"}</div>
          <div className="rounded-[10px] bg-creme px-3.5 py-2.5"><Rotulo>Pagamento</Rotulo>{p.metodoPagamento || "—"}</div>
          <div className="rounded-[10px] bg-creme px-3.5 py-2.5">
            <Rotulo>{p.dataEntrega ? "Entregue em" : "Entrega"}</Rotulo>
            {p.dataEntrega ? dataBR(p.dataEntrega, true) : AVISO_STATUS[p.status] ? "—" : "Previsão em até 10 dias úteis"}
          </div>
        </div>
        {STATUS_PERMITE_AVALIAR.includes(p.status) && (
          <p className="text-sm">
            Gostou? <Link to={`/produtos/${p.itens[0].produtoId}#avaliacoes`} className="link">Avalie os produtos deste pedido ⭐</Link>
          </p>
        )}
      </div>
    </details>
  );
}

/* ---------------- Excluir conta ---------------- */
function ExcluirConta() {
  const dialogo = useRef(null);
  const definirUsuario = useAuthStore((s) => s.definirUsuario);
  const navigate = useNavigate();
  const { valores, alterar, erros, erroGeral, enviando, enviar, setValores } = useFormulario({ senha: "" });

  function abrir() {
    setValores({ senha: "" });
    dialogo.current.showModal();
  }

  async function confirmar(e) {
    e.preventDefault();
    const ok = await enviar(async ({ senha }) => {
      await usuarioService.excluir(senha);
      return true;
    });
    if (!ok) return;
    dialogo.current.close();
    navigate("/", { replace: true }); // sai da rota protegida antes de limpar o usuário
    definirUsuario(null);
    toast("Sua conta foi excluída. Sentiremos sua falta 💜");
  }

  return (
    <section id="excluir" className="painel" aria-labelledby="titulo-excluir">
      <h2 id="titulo-excluir" className="sr-only">Excluir conta</h2>
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-[14px] border-[1.5px] border-[#F2B8B0] bg-[#FFF6F4] px-5 py-4.5">
        <div>
          <h3 className="mb-0.5 font-sans text-[1.05rem] text-perigo">Excluir minha conta</h3>
          <p className="text-sm text-texto-suave">Seus dados, pedidos e avaliações serão removidos permanentemente. Esta ação não pode ser desfeita.</p>
        </div>
        <button type="button" className="btn btn-perigo" onClick={abrir}>Excluir conta</button>
      </div>

      <dialog ref={dialogo} aria-labelledby="titulo-modal" className="m-auto w-[min(480px,100%-32px)] rounded-[20px] p-0 shadow-forte backdrop:bg-quase-preto/55 backdrop:backdrop-blur-[2px]">
        <form onSubmit={confirmar} className="p-7" noValidate>
          <h2 id="titulo-modal" className="text-[1.8rem]">Excluir conta?</h2>
          <p className="mb-4">
            Essa ação é <strong>permanente</strong>. Você perderá o histórico de pedidos e suas avaliações.
          </p>
          {erroGeral && !erros.senha && <Alerta tipo="erro">{erroGeral}</Alerta>}
          <Campo rotulo="Digite sua senha para confirmar" name="senha" type="password" autoComplete="current-password" value={valores.senha} onChange={alterar()} erro={erros.senha} />
          <div className="mt-5 flex flex-wrap justify-end gap-2.5">
            <button type="button" className="btn btn-contorno" onClick={() => dialogo.current.close()}>Cancelar</button>
            <button type="submit" className="btn btn-perigo-cheio" disabled={!valores.senha || enviando}>
              {enviando ? "Excluindo..." : "Excluir definitivamente"}
            </button>
          </div>
        </form>
      </dialog>
    </section>
  );
}
