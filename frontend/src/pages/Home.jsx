import { Link } from "react-router";
import { Alerta, Carregando } from "../components/Feedback";
import GradeProdutos from "../components/GradeProdutos";
import { IconeCaixa, IconeCaminhao, IconeFolha, IconePessoa } from "../components/Icones";
import { useApi } from "../hooks/useApi";
import { useTitulo } from "../hooks/useTitulo";
import { produtoService } from "../services/produtoService";

const MATERIAIS = [
  [IconeFolha, "Algodão certificado", "Camisetas, moletons e ecobags com algodão de origem rastreável e tingimento de baixo impacto."],
  [IconeFolha, "Tintas à base d'água", "Estampas em silk e sublimação sem solventes tóxicos, seguras para você e para o planeta."],
  [IconeFolha, "Embalagens recicláveis", "Papel kraft, fita de papel e zero plástico bolha: tudo pode voltar para a reciclagem."],
];
const FABRICACAO = [
  [IconeCaixa, "Produção sob demanda", "Só produzimos depois do seu pedido. Nada de estoque parado nem desperdício."],
  [IconePessoa, "Ateliê local", "Cada peça é finalizada à mão pela nossa equipe, com conferência de qualidade."],
  [IconeCaminhao, "Entrega compensada", "Compensamos a emissão de carbono de todos os envios para qualquer lugar do Brasil."],
];
const FAQ = [
  ["O material utilizado na produção é sustentável?", "Sim! Trabalhamos com algodão certificado, tintas à base d'água e embalagens 100% recicláveis."],
  ["Vocês entregam em todo o Brasil? E para o exterior?", "Entregamos em todo o Brasil pelos Correios e transportadoras parceiras. Envios internacionais ainda não estão disponíveis."],
  ["Possuem loja física? Se sim, qual o endereço?", "Somos uma loja 100% online, mas você pode retirar seu pedido no nosso ateliê em São Paulo/SP mediante agendamento."],
  ["A personalização é em todos os itens da loja?", "Quase todos! Após finalizar o pedido, nossa equipe entra em contato para alinhar os detalhes da personalização."],
];

function PainelAmarelo({ titulo, itens }) {
  return (
    <article className="min-h-[300px] rounded-xl border-2 border-[#F3D27E] bg-[#FDEFC2] px-8 pt-6 pb-8 shadow-[0_14px_22px_rgb(120_90_20/.22)]">
      <h3 className="mb-4.5 text-center text-[1.9rem] font-medium">{titulo}</h3>
      <ul className="grid gap-3.5">
        {itens.map(([Icone, nome, texto]) => (
          <li key={nome} className="grid grid-cols-[36px_1fr] gap-3">
            <Icone className="size-7.5 text-roxo" />
            <span>
              <strong>{nome}</strong>
              <br />
              {texto}
            </span>
          </li>
        ))}
      </ul>
    </article>
  );
}

export default function Home() {
  useTitulo();
  const { dados: destaques, carregando, erro } = useApi(() => produtoService.listar({ destaque: true, limite: 4 }), []);

  return (
    <>
      {/* Hero */}
      <section className="py-5.5">
        <div className="container-site">
          <div className="relative grid min-h-[480px] items-center overflow-hidden rounded-[28px] border-2 border-[#CFC6BE] bg-creme md:grid-cols-[1.05fr_1fr]">
            <div className="relative z-10 px-7 pt-9 pb-2 md:py-12 md:pl-12">
              <h1 className="mb-[.6em] text-[clamp(2.4rem,5.2vw,4.4rem)]">
                Realce sua <em className="text-amarelo-2 not-italic underline decoration-3 underline-offset-[6px]">melhor versão</em> e tenha produtos únicos
              </h1>
              <p className="mb-9 flex flex-wrap gap-x-7 font-rotulo font-bold tracking-[0.22em] text-amarelo-2 uppercase">
                <span>Personalize</span><span aria-hidden>-</span><span>Crie</span><span aria-hidden>-</span><span>Surpreenda</span>
              </p>
              <Link to="/produtos" className="btn btn-primario btn-grande">
                Conheça nossos produtos <span aria-hidden>→</span>
              </Link>
            </div>
            <div className="relative h-full min-h-80">
              <img src="/img/hero.svg" alt="Moletom off-white com estampa de planeta nas mangas e caneca com constelações" className="absolute inset-0 size-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Destaques (produto.emDestaque preenchido) */}
      <section className="bg-noite py-14 text-white" aria-labelledby="titulo-destaque">
        <div className="container-site">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-5">
            <h2 id="titulo-destaque" className="text-[clamp(2rem,4vw,3rem)] font-medium text-lilas">Produtos em destaque</h2>
            <Link to="/produtos" className="font-rotulo font-semibold tracking-[0.12em] text-lilas uppercase no-underline hover:text-amarelo">
              Ver todos <span aria-hidden>→</span>
            </Link>
          </div>
          {carregando && <Carregando />}
          <Alerta tipo="erro">{erro?.message}</Alerta>
          {destaques && <GradeProdutos produtos={destaques} escuro />}
        </div>
      </section>

      {/* Sustentabilidade */}
      <section className="bg-amarelo-2 py-14" aria-labelledby="titulo-sust">
        <div className="container-site">
          <h2 id="titulo-sust" className="max-w-[900px] text-[clamp(2rem,4.4vw,3.4rem)] font-medium text-white">
            Compromisso com o meio ambiente e sustentabilidade
          </h2>
          <div className="mt-8 grid gap-7 md:grid-cols-2 md:gap-16">
            <PainelAmarelo titulo="Materiais utilizados" itens={MATERIAIS} />
            <PainelAmarelo titulo="Fabricação" itens={FABRICACAO} />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-14" aria-labelledby="titulo-faq">
        <div className="container-site">
          <h2 id="titulo-faq" className="mb-6 text-[clamp(2rem,4.4vw,3.4rem)] font-medium">Dúvidas Frequentes</h2>
          <ol className="grid gap-4">
            {FAQ.map(([pergunta, resposta], i) => (
              <li key={pergunta}>
                <details className="group overflow-hidden rounded-[22px] bg-lilas">
                  <summary className="flex cursor-pointer list-none items-center gap-4 px-5.5 py-3 font-rotulo text-[.95rem] font-semibold tracking-widest uppercase sm:text-xl [&::-webkit-details-marker]:hidden">
                    <span className="text-2xl font-bold sm:text-[1.7rem]">{i + 1}.</span>
                    {pergunta}
                    <span className="ml-auto text-2xl transition group-open:rotate-45" aria-hidden>+</span>
                  </summary>
                  <p className="px-5.5 pb-4.5 sm:pl-15">{resposta}</p>
                </details>
              </li>
            ))}
          </ol>
          <p className="mt-5 text-center text-lg text-amarelo-escuro">
            Não encontrou sua dúvida?{" "}
            <a href="mailto:atendimento@nebulosacostumize.com.br" className="text-amarelo-escuro underline">
              Entre em contato!
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
