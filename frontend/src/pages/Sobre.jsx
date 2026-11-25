import { Link } from "react-router";
import { Leaf, Sparkle, Star, User } from "@phosphor-icons/react";
import { useTitulo } from "../hooks/useTitulo";

const VALORES = [
  [Star, "Criatividade em cada detalhe", "Todas as estampas são autorais, criadas pela nossa equipe de ilustração. Cada coleção conta uma história.", "border-roxo"],
  [Leaf, "Respeito ao planeta", "Algodão certificado, tintas à base d'água, produção sob demanda e embalagens recicláveis.", "border-amarelo-2"],
  [User, "Feito para você", "Nome, frase, cor favorita: a personalização é o coração da Nebulosa, do primeiro clique até a entrega.", "border-roxo-escuro"],
];
const PROCESSO = [
  ["Você escolhe", "Navega pela loja, escolhe o produto e finaliza o pedido."],
  ["A gente cria", "Nossa equipe entra em contato para alinhar a personalização."],
  ["Produção à mão", "Estampamos, finalizamos e conferimos cada detalhe no ateliê."],
  ["Chega até você", "Embalado com carinho e enviado com frete compensado."],
];
const EQUIPE = [
  ["Lavinia Antunes", "Desenvolvedora de Layout e Interatividade", "/img/equipe/lavinia.jpg"],
  ["Manuella Oleoin", "Desenvolvedora de sistemas e infraestrutura", "/img/equipe/manuella.jpg"],
];
const NUMEROS = [["+8 mil", "pedidos entregues"], ["4.9★", "nota média dos clientes"], ["27", "estados atendidos"], ["100%", "embalagens recicláveis"]];

export default function Sobre() {
  useTitulo("Sobre nós");
  return (
    <>
      <section className="relative overflow-hidden bg-noite pt-20 pb-24 text-white">
        <svg aria-hidden viewBox="0 0 400 300" className="absolute top-1/2 -right-20 w-[520px] max-w-[70%] -translate-y-1/2 opacity-90 md:right-0">
          <g transform="translate(220 150) rotate(-18)">
            <ellipse rx="170" ry="42" fill="none" stroke="#FFD86B" strokeWidth="8" />
            <circle r="96" fill="#7B5DC9" />
            <path d="M-92-24h184M-78 32h156" stroke="#3A246B" strokeOpacity=".35" strokeWidth="16" />
            <path d="M-170 0a170 42 0 0 0 340 0" fill="none" stroke="#FFD86B" strokeWidth="8" />
          </g>
        </svg>
        <Sparkle weight="fill" className="absolute top-[18%] left-[58%] size-12 text-amarelo" />
        <div className="container-site relative">
          <p className="rotulo text-amarelo!">Sobre nós</p>
          <h1 className="mt-3 max-w-[760px] text-[clamp(2.6rem,6vw,4.6rem)] text-white">
            Cada produto é uma <em className="text-amarelo not-italic">pequena galáxia</em> de quem o escolhe.
          </h1>
          <p className="mt-4 max-w-[620px] text-xl text-lilas">
            A Nebulosa nasceu da vontade de transformar objetos do dia a dia em extensões da nossa personalidade — com carinho artesanal, design autoral e respeito ao planeta.
          </p>
        </div>
      </section>

      <section className="py-14">
        <div className="container-site grid items-center gap-14 md:grid-cols-2">
          <div>
            <p className="rotulo">Nossa história</p>
            <h2 className="my-3 text-[clamp(2rem,4vw,3rem)]">De uma sala cheio de ideias a um ateliê cheio de estrelas</h2>
            <p className="mb-4 text-[1.08rem]">
              Somos a Lavínia A. Silva e a Manuella Oleoin, desenvolvedoras responsáveis por este projeto, criado em 2026 como parte das disciplinas de Linguagem de Programação e Banco de Dados. O que começou como uma proposta de aula virou a Nebulosa: um espaço feito com carinho para quem gosta de coisas únicas e feitas sob medida.
            </p>
            <p className="mb-6 text-[1.08rem]">
              Hoje somos uma pequena equipe apaixonada por ilustração e produção consciente. Produzimos <strong>sob demanda</strong>, finalizamos cada peça à mão e enviamos para todo o Brasil.
            </p>
            <Link to="/produtos" className="btn btn-primario">Conheça nossos produtos <span aria-hidden>→</span></Link>
          </div>
          <div className="overflow-hidden rounded-3xl shadow-card">
            <img src="/img/ateliê.png" alt="Ilustração do ateliê Nebulosa: bancada com caneca, camiseta e garrafa personalizadas sob um céu estrelado" />
          </div>
        </div>
      </section>

      <section className="bg-lilas-2 py-14">
        <p className="text-center font-logo text-[clamp(2.4rem,5vw,3.6rem)] text-roxo">Sonhe, crie, conquiste.</p>
      </section>

      <section className="py-14" aria-labelledby="titulo-valores">
        <div className="container-site">
          <p className="rotulo">No que acreditamos</p>
          <h2 id="titulo-valores" className="mt-2 mb-7 text-[clamp(2rem,4vw,3rem)]">Nossos valores</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {VALORES.map(([Icone, titulo, texto, borda]) => (
              <article key={titulo} className={`rounded-[18px] border-t-5 bg-white px-6 py-7 shadow-card ${borda}`}>
                <Icone className="mb-2.5 size-11 text-roxo" />
                <h3 className="mb-2 text-[1.6rem]">{titulo}</h3>
                <p>{texto}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-noite py-14" aria-labelledby="titulo-processo">
        <div className="container-site">
          <h2 id="titulo-processo" className="mb-7 text-[clamp(2rem,4vw,3rem)] font-medium text-lilas">Do seu clique à sua casa</h2>
          <ol className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {PROCESSO.map(([titulo, texto], i) => (
              <li key={titulo} className="rounded-2xl border border-lilas/25 bg-white/5 px-4.5 pt-4 pb-5 text-lilas">
                <span className="font-titulo text-[2.2rem] font-bold text-amarelo">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="my-1 text-[1.35rem] text-white">{titulo}</h3>
                <p>{texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="py-14" aria-labelledby="titulo-equipe">
        <div className="container-site">
          <p className="rotulo text-center">Quem faz acontecer</p>
          <h2 id="titulo-equipe" className="mt-2 mb-9 text-center text-[clamp(2rem,4vw,3rem)]">Nossa equipe</h2>
          <div className="mx-auto grid max-w-[620px] gap-6 md:grid-cols-2">
            {EQUIPE.map(([nome, papel, imagem]) => (
              <article key={nome} className="text-center">
                <div className="mx-auto mb-3.5 size-[150px] overflow-hidden rounded-full border-4 border-white bg-lilas shadow-card">
                  <img src={imagem} alt={`Foto de ${nome}`} className="size-full object-cover" />
                </div>
                <h3 className="text-[1.4rem]">{nome}</h3>
                <p className="text-texto-suave">{papel}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-amarelo-2 py-14">
        <div className="container-site grid grid-cols-2 gap-5 text-center md:grid-cols-4">
          {NUMEROS.map(([n, rotulo]) => (
            <div key={rotulo}>
              <strong className="block font-titulo text-5xl leading-none">{n}</strong>
              <span className="font-medium">{rotulo}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
