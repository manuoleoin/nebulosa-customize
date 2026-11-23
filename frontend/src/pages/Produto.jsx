import { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router";
import CampoQuantidade from "../components/CampoQuantidade";
import Estrelas from "../components/Estrelas";
import { Alerta, Carregando, EstadoVazio } from "../components/Feedback";
import GradeProdutos from "../components/GradeProdutos";
import { IconeCaixa, IconeCarrinho, IconeCartao, IconeEstrela, IconePix } from "../components/Icones";
import SeletorEstrelas from "../components/SeletorEstrelas";
import { useApi } from "../hooks/useApi";
import { useTitulo } from "../hooks/useTitulo";
import { produtoService } from "../services/produtoService";
import { useAuthStore } from "../stores/authStore";
import { useCartStore } from "../stores/cartStore";
import { toast } from "../stores/toastStore";
import { brl, dataBR, iniciais } from "../utils/formatar";

export default function Produto() {
  const { id } = useParams();
  const { dados: produto, carregando, erro, recarregar } = useApi(() => produtoService.buscar(id), [id]);
  const { dados: relacionados } = useApi(
    () => (produto ? produtoService.listar({ categoria: produto.categoria ?? undefined, limite: 5 }) : Promise.resolve([])),
    [produto?.id]
  );
  useTitulo(produto?.nome);

  // links como /produtos/1#avaliacoes: rola só depois que o produto carregou
  const { hash } = useLocation();
  const carregado = !!produto;
  useEffect(() => {
    if (carregado && hash) document.getElementById(hash.slice(1))?.scrollIntoView();
  }, [carregado, hash]);

  if (carregando && !produto) return <Carregando />;
  if (erro?.status === 404)
    return (
      <EstadoVazio icone={IconeCaixa} titulo="Produto não encontrado">
        <Link to="/produtos" className="btn btn-primario mt-4">Voltar à loja</Link>
      </EstadoVazio>
    );
  if (erro) return <div className="container-site py-10"><Alerta tipo="erro">{erro.message}</Alerta></div>;

  return (
    <>
      <div className="container-site">
        <nav aria-label="Você está em" className="mt-5.5 mb-4 text-sm text-texto-suave">
          <Link to="/" className="text-texto-suave">Início</Link> /{" "}
          <Link to="/produtos" className="text-texto-suave">Produtos</Link> /{" "}
          {produto.categoria && (
            <>
              <Link to={`/produtos?categoria=${encodeURIComponent(produto.categoria)}`} className="text-texto-suave">{produto.categoria}</Link> /{" "}
            </>
          )}
          <span aria-current="page">{produto.nome}</span>
        </nav>
        <DetalheProduto produto={produto} />
      </div>

      <Avaliacoes produto={produto} aoAvaliar={recarregar} />

      {relacionados?.length > 1 && (
        <section className="bg-noite py-14" aria-labelledby="titulo-relacionados">
          <div className="container-site">
            <h2 id="titulo-relacionados" className="mb-7 text-[clamp(2rem,4vw,3rem)] font-medium text-lilas">Você também pode gostar</h2>
            <GradeProdutos produtos={relacionados.filter((p) => p.id !== produto.id).slice(0, 4)} escuro />
          </div>
        </section>
      )}
    </>
  );
}

function DetalheProduto({ produto: p }) {
  const [qtd, setQtd] = useState(1);
  const adicionar = useCartStore((s) => s.adicionar);
  const abrir = useCartStore((s) => s.abrir);
  const temDesconto = p.precoDesconto < p.preco;

  function comprar(e) {
    e.preventDefault();
    adicionar(p, qtd);
    abrir();
  }

  return (
    <article className="grid gap-x-5.5 gap-y-2.5 rounded-2xl border-3 border-roxo bg-creme p-2.5 md:grid-cols-2">
      <div className="aspect-square overflow-hidden rounded-lg bg-foto shadow-[0_14px_22px_rgb(0_0_0/.18)]">
        {p.fotoCapa && <img src={p.fotoCapa} alt={p.nome} className="size-full object-cover" />}
      </div>

      <div className="flex flex-col px-3.5 pt-5 pb-2.5">
        <h1 className="font-rotulo text-[clamp(1.6rem,3vw,2.4rem)] leading-snug tracking-[0.18em] text-roxo uppercase">{p.nome}</h1>
        {p.descricao && <p className="mb-3.5 text-[1.05rem] text-texto-suave">{p.descricao}</p>}
        <a href="#avaliacoes" className="flex items-center gap-2.5 font-preco text-[2.2rem] text-roxo no-underline">
          {p.notaMedia != null ? (
            <>
              {p.notaMedia.toFixed(1)} <IconeEstrela className="size-10" />
              <small className="font-sans text-sm text-texto-suave">
                ({p.totalAvaliacoes} {p.totalAvaliacoes === 1 ? "avaliação" : "avaliações"})
              </small>
            </>
          ) : (
            <small className="font-sans text-sm text-texto-suave">Ainda sem avaliações</small>
          )}
        </a>
        <ul className="mt-4 flex flex-wrap gap-2.5 text-sm">
          {[["Cor", p.cor], ["Tamanho", p.tamanho], ["Categoria", p.categoria]]
            .filter(([, v]) => v)
            .map(([rotulo, valor]) => (
              <li key={rotulo} className="rounded-full border border-borda bg-lilas-2 px-3.5 py-1">
                <b>{rotulo}:</b> {valor}
              </li>
            ))}
        </ul>
      </div>

      <div className="grid items-end gap-x-7.5 gap-y-2.5 px-3.5 pt-1.5 pb-3.5 md:col-span-2 md:grid-cols-[auto_1fr]">
        <div>
          {temDesconto && (
            <span className="block text-2xl leading-none font-bold text-amarelo-2 line-through">
              <span className="sr-only">De </span>{brl(p.preco)}
            </span>
          )}
          <span className="font-preco text-[2.6rem] leading-tight font-bold">
            {temDesconto && <span className="sr-only">por </span>}
            {brl(p.precoDesconto)}
          </span>
          <p className="text-sm text-texto-suave">ou 3x de {brl(p.precoDesconto / 3)} sem juros no cartão</p>
          <div className="mt-5.5 flex items-center gap-6" aria-label="Formas de pagamento: cartão e Pix">
            <IconeCartao className="h-11" />
            <IconePix className="h-11" />
          </div>
        </div>
        <form onSubmit={comprar} className="flex flex-wrap items-center justify-center gap-4.5 md:justify-self-center">
          <CampoQuantidade valor={qtd} onChange={setQtd} />
          <button
            type="submit"
            className="inline-flex cursor-pointer items-center gap-[.6em] rounded-xl bg-amarelo-2 px-[1em] py-[.3em] font-preco text-[clamp(1.3rem,2.6vw,2.2rem)] text-white [text-shadow:0_1px_1px_rgb(0_0_0/.12)] hover:bg-amarelo-escuro"
          >
            Adicionar ao carrinho <IconeCarrinho className="size-[1.3em]" />
          </button>
        </form>
      </div>
    </article>
  );
}

function Avaliacoes({ produto, aoAvaliar }) {
  const usuario = useAuthStore((s) => s.usuario);
  const lista = produto.avaliacoes;
  const minha = usuario && lista.find((a) => a.usuarioId === usuario.id);

  return (
    <section id="avaliacoes" className="py-14" aria-labelledby="titulo-avaliacoes">
      <div className="container-site">
        <h2 id="titulo-avaliacoes" className="mb-6 text-[2.4rem] font-medium">Avaliações</h2>
        <div className="grid items-start gap-10 md:grid-cols-[320px_1fr]">
          <ResumoNotas produto={produto} />
          <div>
            {usuario ? (
              <FormAvaliacao produtoId={produto.id} minha={minha} aoAvaliar={aoAvaliar} />
            ) : (
              <div className="mb-5.5 flex flex-wrap items-center justify-between gap-4 rounded-[14px] bg-lilas-2 px-5.5 py-4.5">
                <span>Comprou este produto? <strong>Entre na sua conta</strong> para avaliar.</span>
                <Link to={`/login?volta=${encodeURIComponent(`/produtos/${produto.id}`)}`} className="btn btn-primario">Entrar para avaliar</Link>
              </div>
            )}
            <ul className="grid gap-3.5">
              {lista.length === 0 && <li>Seja a primeira pessoa a avaliar!</li>}
              {lista.map((a) => (
                <li key={a.usuarioId} className="flex items-center gap-3.5 rounded-[14px] border border-borda bg-white px-4.5 py-3.5">
                  <span aria-hidden className="grid size-[42px] shrink-0 place-items-center rounded-full bg-roxo font-bold text-white">{iniciais(a.nome)}</span>
                  <div>
                    <strong>{a.nome}</strong> <Estrelas nota={a.nota} />
                    <div className="text-xs text-texto-suave">Nota {a.nota.toFixed(1)} · {dataBR(a.data)}</div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function ResumoNotas({ produto }) {
  const lista = produto.avaliacoes;
  if (produto.notaMedia == null)
    return <div className="rounded-[14px] bg-lilas-2 p-6 text-center">Este produto ainda não foi avaliado.</div>;

  return (
    <div className="rounded-[14px] bg-lilas-2 p-6 text-center">
      <div className="font-preco text-[3.6rem] leading-none font-bold">{produto.notaMedia.toFixed(1)}</div>
      <Estrelas nota={produto.notaMedia} />
      <p className="mt-1.5">{lista.length} {lista.length === 1 ? "avaliação" : "avaliações"}</p>
      <div className="mt-4 grid gap-1.5 text-sm">
        {[5, 4, 3, 2, 1].map((n) => {
          const qtd = lista.filter((a) => Math.round(a.nota) === n).length;
          return (
            <div key={n} className="grid grid-cols-[22px_1fr_30px] items-center gap-2">
              <span>{n}★</span>
              <span className="h-2 overflow-hidden rounded bg-white">
                <i className="block h-full rounded bg-roxo" style={{ width: `${(qtd / lista.length) * 100}%` }} />
              </span>
              <span>{qtd}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/** Só aparece para usuário logado. Reenviar atualiza a nota (PK usuario_id + produto_id). */
function FormAvaliacao({ produtoId, minha, aoAvaliar }) {
  const [nota, setNota] = useState(minha ? Math.round(minha.nota) : 0);
  const [enviando, setEnviando] = useState(false);
  const [erro, setErro] = useState("");

  async function enviar(e) {
    e.preventDefault();
    if (!nota) return setErro("Escolha uma nota de 1 a 5 estrelas.");
    setEnviando(true);
    setErro("");
    try {
      await produtoService.avaliar(produtoId, nota);
      toast("Obrigado pela sua avaliação! ⭐");
      aoAvaliar();
    } catch (err) {
      setErro(err.message);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <form onSubmit={enviar} className="mb-5.5 rounded-[14px] border-2 border-dashed border-roxo bg-white px-5.5 py-5">
      <h3 className="text-2xl">{minha ? "Atualize sua avaliação" : "Avalie este produto"}</h3>
      <p className="text-texto-suave">
        {minha ? `Você avaliou em ${dataBR(minha.data)}. Escolha uma nova nota para atualizar.` : "Qual nota você dá para este produto?"}
      </p>
      <SeletorEstrelas valor={nota} onChange={setNota} />
      <Alerta tipo="erro">{erro}</Alerta>
      <button type="submit" className="btn btn-primario" disabled={enviando}>
        {enviando ? "Enviando..." : minha ? "Atualizar avaliação" : "Enviar avaliação"}
      </button>
    </form>
  );
}
