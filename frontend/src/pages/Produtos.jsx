import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { Alerta, Carregando, EstadoVazio } from "../components/Feedback";
import GradeProdutos from "../components/GradeProdutos";
import { MagnifyingGlass } from "@phosphor-icons/react";
import { useApi } from "../hooks/useApi";
import { useDebounce } from "../hooks/useDebounce";
import { useTitulo } from "../hooks/useTitulo";
import { produtoService } from "../services/produtoService";

const ORDENS = [
  ["relevancia", "Mais relevantes"],
  ["recentes", "Mais recentes"],
  ["menor-preco", "Menor preço"],
  ["maior-preco", "Maior preço"],
  ["avaliacao", "Melhor avaliados"],
];

export default function Produtos() {
  useTitulo("Produtos");
  // filtros ficam na URL: /produtos?q=caneca&categoria=Papelaria (dá para compartilhar o link)
  const [params, setParams] = useSearchParams();
  const categoria = params.get("categoria") || "";
  const ordem = params.get("ordem") || "relevancia";
  const [texto, setTexto] = useState(params.get("q") || "");
  const busca = useDebounce(texto.trim());

  function atualizarParam(chave, valor) {
    setParams(
      (p) => {
        const novo = new URLSearchParams(p);
        if (valor) novo.set(chave, valor);
        else novo.delete(chave);
        return novo;
      },
      { replace: true }
    );
  }

  useEffect(() => {
    atualizarParam("q", busca); // não retornar: no v8 setSearchParams devolve uma Promise
  }, [busca]); // eslint-disable-line react-hooks/exhaustive-deps

  const { dados: categorias } = useApi(() => produtoService.categorias(), []);
  const { dados: produtos, carregando, erro } = useApi(
    () => produtoService.listar({ busca, categoria, ordem: ordem === "relevancia" ? undefined : ordem }),
    [busca, categoria, ordem]
  );

  const semFiltro = !busca && !categoria;
  const corte = semFiltro ? 8 : Infinity;
  const destaques = produtos?.filter((p) => p.emDestaque).slice(0, 4) ?? [];
  const chip = (ativo) =>
    `cursor-pointer rounded-full border-[1.5px] px-4 py-1.5 text-sm font-medium ${
      ativo ? "border-roxo bg-roxo text-white" : "border-borda bg-lilas-2 text-roxo-escuro hover:border-roxo"
    }`;

  return (
    <>
      <div className="container-site">
        <h1 className="sr-only">Nossos produtos</h1>
        <div role="search" className="mx-auto mt-6.5 mb-4.5 flex w-[min(410px,100%)] items-center gap-2.5 rounded-[10px] border-[1.5px] border-amarelo-2 bg-white px-3 py-1.5 focus-within:ring-3 focus-within:ring-amarelo/45">
          <MagnifyingGlass className="size-5.5 shrink-0 text-amarelo-escuro" />
          <label htmlFor="busca" className="sr-only">Pesquisar produtos</label>
          <input
            id="busca"
            type="search"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder="Digite para pesquisar..."
            autoComplete="off"
            className="min-w-0 flex-1 bg-transparent tracking-wide outline-none placeholder:text-amarelo-escuro/85 [&::-webkit-search-cancel-button]:hidden"
          />
          {texto && (
            <button type="button" onClick={() => setTexto("")} aria-label="Limpar pesquisa" className="cursor-pointer px-1 text-xl leading-none text-amarelo-escuro">
              ×
            </button>
          )}
        </div>

        <div role="group" aria-label="Filtrar por categoria" className="mb-7 flex flex-wrap items-center justify-center gap-2.5">
          <button type="button" aria-pressed={!categoria} className={chip(!categoria)} onClick={() => atualizarParam("categoria", "")}>
            Todos
          </button>
          {categorias?.map((c) => (
            <button key={c} type="button" aria-pressed={categoria === c} className={chip(categoria === c)} onClick={() => atualizarParam("categoria", c)}>
              {c}
            </button>
          ))}
          <label htmlFor="ordem" className="sr-only">Ordenar por</label>
          <select
            id="ordem"
            value={ordem}
            onChange={(e) => atualizarParam("ordem", e.target.value === "relevancia" ? "" : e.target.value)}
            className="rounded-full border-[1.5px] border-borda bg-white px-4 py-1.5 text-sm"
          >
            {ORDENS.map(([valor, rotulo]) => (
              <option key={valor} value={valor}>{rotulo}</option>
            ))}
          </select>
        </div>

        {!semFiltro && produtos && (
          <p aria-live="polite" className="-mt-3.5 mb-5.5 text-center text-sm text-texto-suave">
            {produtos.length} {produtos.length === 1 ? "produto encontrado" : "produtos encontrados"}
          </p>
        )}
      </div>

      <section className="container-site pb-10">
        {carregando && !produtos && <Carregando />}
        <Alerta tipo="erro">{erro?.message}</Alerta>
        {produtos?.length === 0 && (
          <EstadoVazio icone={MagnifyingGlass} titulo="Nenhum produto encontrado.">
            Tente outro termo ou categoria.
          </EstadoVazio>
        )}
        {produtos && <GradeProdutos produtos={produtos.slice(0, corte)} />}
      </section>

      {/* faixa escura de destaques (como no layout), só sem filtros */}
      {semFiltro && destaques.length > 0 && (
        <section className="bg-noite py-14" aria-labelledby="titulo-faixa">
          <div className="container-site">
            <h2 id="titulo-faixa" className="mb-7 text-[clamp(2rem,4vw,3rem)] font-medium text-lilas">Em destaque</h2>
            <GradeProdutos produtos={destaques} escuro />
          </div>
        </section>
      )}

      {produtos && produtos.length > corte && (
        <section className="container-site pt-10 pb-14">
          <GradeProdutos produtos={produtos.slice(corte)} />
        </section>
      )}
    </>
  );
}
