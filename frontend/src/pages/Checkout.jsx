import { useState } from "react";
import { Link } from "react-router";
import Campo from "../components/Campo";
import { Alerta, EstadoVazio } from "../components/Feedback";
import { IconeBoleto, IconeCarrinho, IconeCartao, IconeCheck, IconePix } from "../components/Icones";
import { useCarrinho } from "../hooks/useCarrinho";
import { useFormulario } from "../hooks/useFormulario";
import { useTitulo } from "../hooks/useTitulo";
import { pedidoService } from "../services/pedidoService";
import { useAuthStore } from "../stores/authStore";
import { useCartStore } from "../stores/cartStore";
import { brl, mascaraCep, primeiroNome } from "../utils/formatar";
import { UFS } from "../utils/regras";

const PAGAMENTOS = [
  { valor: "Pix", Icone: IconePix, detalhe: "Aprovação imediata" },
  { valor: "Cartão de crédito", Icone: IconeCartao, detalhe: "Até 3x sem juros" },
  { valor: "Boleto", Icone: IconeBoleto, detalhe: "Compensa em até 3 dias" },
];

function Passos({ atual }) {
  return (
    <ol aria-label="Etapas da compra" className="mt-7 flex flex-wrap gap-2.5 text-sm text-texto-suave">
      {["Carrinho", "Entrega e pagamento", "Confirmação"].map((nome, i) => (
        <li key={nome} aria-current={i === atual ? "step" : undefined} className={`flex items-center gap-2 ${i === atual ? "font-bold text-roxo-escuro" : ""}`}>
          {i > 0 && <span className="h-0.5 w-7 bg-borda" />}
          <b className={`grid size-7 place-items-center rounded-full ${i === atual ? "bg-roxo text-white" : "bg-lilas text-roxo-escuro"}`}>{i + 1}</b>
          {nome}
        </li>
      ))}
    </ol>
  );
}

export default function Checkout() {
  useTitulo("Finalizar pedido");
  const usuario = useAuthStore((s) => s.usuario);
  const { itens, totais } = useCarrinho();
  const abrirCarrinho = useCartStore((s) => s.abrir);
  const limpar = useCartStore((s) => s.limpar);
  const [pedidoCriado, setPedidoCriado] = useState(null);
  const { valores, alterar, erros, erroGeral, enviando, enviar } = useFormulario({
    destinatario: usuario.nome,
    cep: "",
    rua: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    uf: "SP",
    metodoPagamento: "Pix",
    parcelas: "1",
  });

  async function confirmar(e) {
    e.preventDefault();
    const pedido = await enviar((v) =>
      pedidoService.criar({
        endereco: { destinatario: v.destinatario, cep: v.cep, rua: v.rua, numero: v.numero, complemento: v.complemento, bairro: v.bairro, cidade: v.cidade, uf: v.uf },
        metodoPagamento: v.metodoPagamento,
        parcelas: Number(v.parcelas),
        // só ids e quantidades: o backend busca os preços no banco
        itens: itens.map((i) => ({ produtoId: i.id, quantidade: i.qtd })),
      })
    );
    if (!pedido) return;
    limpar();
    setPedidoCriado(pedido);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (pedidoCriado) return <Confirmacao pedido={pedidoCriado} nome={usuario.nome} />;

  if (!itens.length)
    return (
      <div className="container-site">
        <Passos atual={0} />
        <EstadoVazio icone={IconeCarrinho} titulo="Seu carrinho está vazio">
          <p>Adicione produtos para finalizar um pedido.</p>
          <Link to="/produtos" className="btn btn-primario mt-4">Ver produtos</Link>
        </EstadoVazio>
      </div>
    );

  // erros do zod no backend chegam como "endereco.cep" (aninhados) — mostramos pelo nome do campo
  const erroDe = (campo) => erros[campo] || erros[`endereco.${campo}`];

  return (
    <div className="container-site">
      <Passos atual={1} />
      <form onSubmit={confirmar} noValidate className="mt-7 mb-14 grid items-start gap-7 lg:grid-cols-[1fr_380px]">
        <div className="grid gap-7">
          <section className="painel" aria-labelledby="t-endereco">
            <h2 id="t-endereco" className="mb-4.5 text-[1.9rem]">Endereço de entrega</h2>
            <Campo rotulo="Destinatário" name="destinatario" autoComplete="name" value={valores.destinatario} onChange={alterar()} erro={erroDe("destinatario")} />
            <div className="grid gap-x-4 sm:grid-cols-[1fr_2fr]">
              <Campo rotulo="CEP" name="cep" inputMode="numeric" autoComplete="postal-code" placeholder="00000-000" value={valores.cep} onChange={alterar(mascaraCep)} erro={erroDe("cep")} />
              <Campo rotulo="Rua / Avenida" name="rua" autoComplete="address-line1" value={valores.rua} onChange={alterar()} erro={erroDe("rua")} />
            </div>
            <div className="grid gap-x-4 sm:grid-cols-[1.2fr_2fr_.8fr]">
              <Campo rotulo="Número" name="numero" value={valores.numero} onChange={alterar()} erro={erroDe("numero")} />
              <Campo rotulo="Complemento" opcional name="complemento" autoComplete="address-line2" placeholder="Apto, bloco, referência" value={valores.complemento} onChange={alterar()} erro={erroDe("complemento")} />
              <div className="mb-4 grid gap-1.5">
                <label htmlFor="uf" className="text-[.92rem] font-semibold">UF</label>
                <select id="uf" name="uf" value={valores.uf} onChange={alterar()} className="input">
                  {UFS.map((uf) => <option key={uf}>{uf}</option>)}
                </select>
              </div>
            </div>
            <div className="grid gap-x-4 sm:grid-cols-2">
              <Campo rotulo="Bairro" name="bairro" value={valores.bairro} onChange={alterar()} erro={erroDe("bairro")} />
              <Campo rotulo="Cidade" name="cidade" autoComplete="address-level2" value={valores.cidade} onChange={alterar()} erro={erroDe("cidade")} />
            </div>
          </section>

          <section className="painel" aria-labelledby="t-pagamento">
            <h2 id="t-pagamento" className="mb-4.5 text-[1.9rem]">Forma de pagamento</h2>
            <fieldset className="mb-4.5 grid gap-3 border-0 p-0 sm:grid-cols-3">
              <legend className="sr-only">Escolha a forma de pagamento</legend>
              {PAGAMENTOS.map(({ valor, Icone, detalhe }) => (
                <label
                  key={valor}
                  className="flex cursor-pointer flex-col items-center gap-1.5 rounded-[14px] border-2 border-borda bg-white px-2.5 py-4 text-center font-semibold transition has-checked:border-roxo has-checked:bg-lilas-2 has-checked:ring-3 has-checked:ring-roxo/15 has-focus-visible:outline-3 has-focus-visible:outline-amarelo"
                >
                  <input type="radio" name="metodoPagamento" value={valor} checked={valores.metodoPagamento === valor} onChange={alterar()} className="sr-only" />
                  <Icone className="h-[34px] w-auto" />
                  {valor}
                  <small className="font-normal text-texto-suave">{detalhe}</small>
                </label>
              ))}
            </fieldset>

            <div className="rounded-[14px] bg-creme p-4.5">
              {valores.metodoPagamento === "Pix" && <p>O QR Code e o código <strong>Pix copia e cola</strong> aparecem após a confirmação. O pagamento expira em 30 minutos.</p>}
              {valores.metodoPagamento === "Boleto" && <p>O boleto será gerado após a confirmação e enviado para o seu e-mail. A produção começa após a compensação.</p>}
              {valores.metodoPagamento === "Cartão de crédito" && (
                <>
                  <Alerta>Os dados do cartão serão capturados pelo gateway de pagamento (não são salvos no banco).</Alerta>
                  <label htmlFor="parcelas" className="mb-1.5 block text-[.92rem] font-semibold">Parcelas</label>
                  <select id="parcelas" name="parcelas" value={valores.parcelas} onChange={alterar()} className="input">
                    {[1, 2, 3].map((n) => (
                      <option key={n} value={n}>{n}x de {brl(totais.total / n)} sem juros</option>
                    ))}
                  </select>
                </>
              )}
            </div>
          </section>
        </div>

        <aside className="painel lg:sticky lg:top-[104px]" aria-labelledby="t-resumo">
          <div className="mb-4.5 flex items-center justify-between">
            <h2 id="t-resumo" className="text-[1.9rem]">Resumo</h2>
            <button type="button" onClick={abrirCarrinho} className="cursor-pointer text-sm text-texto-suave underline hover:text-roxo">Editar carrinho</button>
          </div>
          <ul className="mb-3.5 grid max-h-80 gap-3 overflow-y-auto">
            {itens.map((i) => (
              <li key={i.id} className="grid grid-cols-[56px_1fr_auto] items-center gap-2.5 text-sm">
                <img src={i.fotoCapa} alt="" className="size-14 rounded-lg bg-foto object-cover" />
                <div>
                  {i.nome}
                  <div className="text-xs text-texto-suave">{i.qtd} × {brl(i.precoDesconto)}</div>
                </div>
                <strong>{brl(i.precoDesconto * i.qtd)}</strong>
              </li>
            ))}
          </ul>
          <dl className="mb-3.5 grid gap-1.5 text-[.95rem]">
            <div className="flex justify-between"><dt>Subtotal</dt><dd>{brl(totais.subtotal)}</dd></div>
            {totais.economia > 0 && <div className="flex justify-between text-sucesso"><dt>Descontos aplicados</dt><dd>− {brl(totais.economia)}</dd></div>}
            <div className="flex justify-between"><dt>Frete</dt><dd>{totais.frete ? brl(totais.frete) : "Grátis"}</dd></div>
            <div className="mt-1 flex justify-between border-t border-dashed border-borda pt-2 text-xl font-bold"><dt>Total</dt><dd>{brl(totais.total)}</dd></div>
          </dl>
          {erroGeral && <Alerta tipo="erro">{Object.keys(erros).length ? "Revise os campos destacados." : erroGeral}</Alerta>}
          <button type="submit" className="btn btn-secundario btn-grande w-full" disabled={enviando}>
            {enviando ? "Enviando..." : "Confirmar pedido"}
          </button>
          <p className="mt-2.5 text-center text-xs text-texto-suave">
            Ao confirmar, você concorda com nossos <a href="#" className="link">termos de compra</a>.
          </p>
        </aside>
      </form>
    </div>
  );
}

function Confirmacao({ pedido, nome }) {
  const pg = pedido.metodoPagamento;
  return (
    <div className="container-site">
      <Passos atual={2} />
      <section className="painel mx-auto mt-7 mb-14 max-w-[640px] px-5 py-14 text-center">
        <div className="mx-auto mb-4 grid size-24 place-items-center rounded-full bg-lilas text-roxo">
          <IconeCheck className="size-14" />
        </div>
        <h1 className="text-[2.4rem]">Pedido #{pedido.id} recebido!</h1>
        <p className="mt-2">
          Obrigado pela compra, {primeiroNome(nome)}! ✨
          <br />
          {pg === "Pix" ? "Pague com Pix em até 30 minutos para confirmar seu pedido." : pg === "Boleto" ? "Enviamos o boleto para o seu e-mail." : "Assim que o pagamento for aprovado, começamos a produção."}
        </p>
        <p className="mt-3 text-[.95rem] text-texto-suave">
          Total: <strong>{brl(pedido.total)}</strong> · {pg}
          <br />
          Entrega em: {pedido.endereco}
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-2.5">
          <Link to="/perfil#pedidos" className="btn btn-primario">Acompanhar meus pedidos</Link>
          <Link to="/produtos" className="btn btn-contorno">Continuar comprando</Link>
        </div>
      </section>
    </div>
  );
}
