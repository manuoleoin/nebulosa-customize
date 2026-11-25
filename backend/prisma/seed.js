// Popula o banco com os dados do protótipo.
// ATENÇÃO: apaga TODOS os dados das tabelas antes de inserir (uso em desenvolvimento).
// Rodar: npm run db:seed
import fs from "node:fs";
import path from "node:path";
import bcrypt from "bcryptjs";
import { prisma } from "../src/lib/prisma.js";
import { PASTA_UPLOADS } from "../src/middlewares/upload.js";

const SENHA_PADRAO = "nebulosa123"; // senha de todos os usuários de teste

const produtos = [
  // Roupas e acessórios
  { nome: "Pijama Estelar Personalizado", preco: 149.9, precoDesconto: 119.9, destaque: 5, categoria: "Roupas e acessórios", cor: "Lilás e creme", tamanho: "P/M/G", foto: "pijama.jpg",
    descricao: "Conjunto de pijama em algodão macio com estampa celestial exclusiva e acabamento em ribana. Personalize com seu nome no bolso e durma entre as estrelas." },

  { nome: "Camiseta Personalizada Preta", preco: 84.9, precoDesconto: 67.9, categoria: "Roupas e acessórios", cor: "Preta", tamanho: "P/M/G/GG", foto: "camiseta-preta.jpg",
    descricao: "Camiseta 100% algodão penteado na cor preta, com estampa em silk ecológico que não descasca. Corte unissex confortável e arte personalizada à sua escolha." },

  { nome: "Camiseta Personalizada Branca", preco: 80.99, precoDesconto: 64.9, categoria: "Roupas e acessórios", cor: "Branca", tamanho: "P/M/G/GG", foto: "camiseta-branca.jpg",
    descricao: "Camiseta branca de algodão penteado com estampa cósmica em silk ecológico. Toque macio, caimento leve e cores que continuam vivas lavagem após lavagem." },

  { nome: "Moletom Galáxia Personalizado", preco: 219.9, precoDesconto: 179.9, destaque: 4, categoria: "Roupas e acessórios", cor: "Off-white", tamanho: "P/M/G/GG", foto: "moletom.jpg",
    descricao: "Moletom flanelado por dentro com estampa de planeta nas mangas. Personalize o nome no peito e leve o aconchego da galáxia para o dia a dia." },

  { nome: "Boné Bordado Versão Clara", preco: 36.97, precoDesconto: 29.98, categoria: "Roupas e acessórios", cor: "Creme", tamanho: "Único (ajustável)", foto: "bone-claro.jpg",
    descricao: "Boné de sarja em tom creme com aba curva e bordado do planeta Nebulosa. Fecho regulável e personalização opcional nas laterais." },

  { nome: "Boné Bordado Versão Escura", preco: 36.97, precoDesconto: 29.98, categoria: "Roupas e acessórios", cor: "Preto", tamanho: "Único (ajustável)", foto: "bone-escuro.jpg",
    descricao: "A versão escura do nosso boné de sarja, com bordado em fio lilás e fecho regulável. Combina com qualquer look e aceita personalização." },

  { nome: "Chinelo Nuvem Lilás", preco: 69.9, precoDesconto: 54.9, categoria: "Roupas e acessórios", cor: "Lilás", tamanho: "33 ao 40", foto: "chinelo.jpg",
    descricao: "Chinelo de slide com palmilha macia e tira acolchoada em tom lilás. Personalize com iniciais ou uma estrelinha bordada na tira." },

  // Papelaria e organização
  { nome: "Journal Cósmico com Adesivos e Cartas", preco: 89.9, precoDesconto: 74.9, destaque: 1, categoria: "Papelaria e organização", cor: "Lilás", tamanho: "A5", foto: "journal.jpg",
    descricao: "Journal de capa dura com 160 páginas pautadas, acompanha cartela de adesivos e 10 cartas com envelopes. Personalize a capa com seu nome e comece a escrever suas histórias." },

  { nome: "Álbum de Fotos Estelar", preco: 119.9, precoDesconto: 94.9, categoria: "Papelaria e organização", cor: "Creme", tamanho: "20 x 20 cm", foto: "album-fotos.jpg",
    descricao: "Álbum com 30 páginas em papel especial, cantoneiras e espaço para legendas. Capa personalizada com nome ou frase para guardar as memórias que importam." },

  { nome: "Agenda Anual Personalizada", preco: 99.9, precoDesconto: 84.9, categoria: "Papelaria e organização", cor: "Creme", tamanho: "A5", foto: "agenda.jpg",
    descricao: "Agenda anual com capa dura, elástico, fitilho marcador e páginas pautadas com visão mensal. Personalize a capa e organize o ano entre as estrelas." },

  { nome: "Kit de Adesivos Cósmicos", preco: 24.9, precoDesconto: 19.9, categoria: "Papelaria e organização", cor: "Variadas", tamanho: "12 unidades", foto: "adesivos.jpg",
    descricao: "Cartela com 12 adesivos em vinil à prova d'água: planetas, luas, estrelas e frases para decorar journal, notebook ou garrafa." },

  { nome: "Carimbo Personalizado Planeta", preco: 44.9, precoDesconto: 34.9, categoria: "Papelaria e organização", cor: "Roxo", tamanho: "3 x 5 cm", foto: "carimbo.jpg",
    descricao: "Carimbo de madeira com base de borracha e almofada em tinta lilás. Personalize com nome, frase ou logo para marcar suas páginas e embalagens." },

  // Casa e decoração
  { nome: "Caneca Cerâmica Constelação", preco: 49.9, precoDesconto: 39.9, destaque: 3, categoria: "Casa e decoração", cor: "Branca", tamanho: "325 ml", foto: "caneca.jpg",
    descricao: "Caneca de cerâmica com impressão sublimática resistente à lava-louças e ao micro-ondas. Personalize com nome ou com a sua constelação favorita." },

  { nome: "Kit Banho Toalha e Roupão", preco: 189.9, precoDesconto: 159.9, categoria: "Casa e decoração", cor: "Off-white e lilás", tamanho: "Toalha 70 x 140 cm + roupão M", foto: "kit-banho.jpg",
    descricao: "Kit de banho com toalha felpuda de algodão e roupão leve com bordado celestial. Personalize as iniciais e transforme o banho em um ritual de cuidado." },

  { nome: "Cobertor Nuvem Estelar", preco: 179.9, precoDesconto: 149.9, categoria: "Casa e decoração", cor: "Lilás", tamanho: "1,30 x 1,70 m", foto: "cobertor.jpg",
    descricao: "Cobertor macio em microfibra antialérgica com estampa de constelações e barra em cetim. Personalize com seu nome bordado no canto." },

  { nome: "Necessaire Estelar", preco: 59.9, precoDesconto: 47.9, categoria: "Casa e decoração", cor: "Creme", tamanho: "22 x 13 cm", foto: "necessaire.jpg",
    descricao: "Necessaire em lona de algodão com forro impermeável, zíper reforçado e alça lateral. Personalize com nome ou iniciais para levar o essencial em viagem." },

  // Acessórios personalizados
  { nome: "Chaveiro Planeta", preco: 19.9, precoDesconto: 14.9, categoria: "Acessórios personalizados", cor: "Roxo e amarelo", tamanho: "5 cm", foto: "chaveiro.jpg",
    descricao: "Chaveiro em acrílico espelhado com o planeta da marca e argola reforçada. Personalize com iniciais ou uma frase curta." },

  { nome: "Capinha de Celular Personalizada", preco: 64.9, precoDesconto: 49.9, categoria: "Acessórios personalizados", cor: "Transparente", tamanho: "iPhone e Galaxy (consulte modelos)", foto: "capinha.jpg",
    descricao: "Capinha rígida com bordas reforçadas e impressão de alta definição. Escolha a arte, envie sua foto ou personalize com o nome que quiser." },

  { nome: "Sacola Ecobag Lua Crescente", preco: 54.9, precoDesconto: 44.9, destaque: 0, categoria: "Acessórios personalizados", cor: "Cru", tamanho: "40 x 38 cm", foto: "ecobag.jpg",
    descricao: "Ecobag de algodão cru reforçado com estampa de lua crescente e alças largas. Personalize com nome ou frase e substitua as sacolas plásticas com charme." },

  // Informática
  { nome: "Teclado Mecânico Estelar", preco: 329.9, precoDesconto: 279.9, destaque: 2, categoria: "Informática", cor: "Lilás e branco", tamanho: "ABNT2", foto: "teclado.jpg",
    descricao: "Teclado mecânico com switches silenciosos e iluminação em tons pastel. Personalize as keycaps com as iniciais ou o nome do seu setup." },

  { nome: "Mouse Sem Fio Nebulosa", preco: 129.9, precoDesconto: 99.9, categoria: "Informática", cor: "Lilás", tamanho: "Sem fio (USB + Bluetooth)", foto: "mouse.jpg",
    descricao: "Mouse ergonômico com conexão Bluetooth e receptor USB, sensor ajustável e bateria de longa duração. Acompanha adesivo exclusivo da Nebulosa." },

  { nome: "Pen Drive 32 GB Nebulosa", preco: 59.9, precoDesconto: 44.9, categoria: "Informática", cor: "Roxo", tamanho: "32 GB", foto: "pen-drive.jpg",
    descricao: "Pen drive USB 3.0 com corpo metálico e tampa magnética. Personalize com nome ou iniciais gravados a laser." },

  { nome: "Mouse Pad Constelação", preco: 39.9, precoDesconto: 31.9, categoria: "Informática", cor: "Roxo", tamanho: "30 x 25 cm", foto: "mouse-pad.jpg",
    descricao: "Mouse pad com base antiderrapante, bordas costuradas e superfície de tecido que desliza macio. Personalize com nome, constelação ou frase." },

  { nome: "Fone de Ouvido Bluetooth Nebulosa", preco: 279.9, precoDesconto: 229.9, categoria: "Informática", cor: "Lilás e creme", tamanho: "Over-ear", foto: "fone.jpg",
    descricao: "Fone over-ear com cancelamento passivo de ruído, até 30 horas de bateria e Bluetooth 5.3. Acompanha case rígido personalizado com o planeta Nebulosa." },
];

const usuarios = [
  { nome: "Administração Nebulosa", email: "admin@nebulosa.com", telefone: "(11) 3333-4444", tipo: "admin" },
  { nome: "Marina Alves Costa", email: "marina@exemplo.com", telefone: "(11) 98765-4321", tipo: "cliente" },
  { nome: "João Pedro Lima", email: "joao@exemplo.com", telefone: "(21) 99876-1122", tipo: "cliente" },
  { nome: "Beatriz Nogueira", email: "bia@exemplo.com", telefone: "(31) 98111-2233", tipo: "cliente" },
  { nome: "Rafael Souza", email: "rafa@exemplo.com", telefone: "(41) 99222-3344", tipo: "cliente" },
];

// [emailUsuario, índice do produto, nota]
// 0 pijama · 1 camiseta preta · 2 camiseta branca · 3 moletom · 6 chinelo · 7 journal
// 12 caneca · 14 cobertor · 19 teclado · 22 mouse pad · 23 fone
const avaliacoes = [
  ["joao@exemplo.com", 0, 5], ["bia@exemplo.com", 0, 5], ["rafa@exemplo.com", 0, 4.5],
  ["joao@exemplo.com", 1, 4], ["bia@exemplo.com", 2, 5], ["rafa@exemplo.com", 3, 4.5],
  ["bia@exemplo.com", 6, 4], ["joao@exemplo.com", 7, 5], ["bia@exemplo.com", 12, 5],
  ["rafa@exemplo.com", 14, 4], ["joao@exemplo.com", 19, 4.5], ["bia@exemplo.com", 22, 3.5],
  ["rafa@exemplo.com", 23, 4.5],
];

const diasAtras = (n) => new Date(Date.now() - n * 864e5);

async function main() {
  console.log("🧹 Limpando tabelas...");
  await prisma.avaliacao.deleteMany();
  await prisma.itemPedido.deleteMany();
  await prisma.pedido.deleteMany();
  await prisma.produto.deleteMany();
  await prisma.usuario.deleteMany();

  console.log("🖼️  Copiando imagens para uploads/produtos...");
  const destino = path.join(PASTA_UPLOADS, "produtos");
  fs.mkdirSync(destino, { recursive: true });
  for (const p of produtos) {
    fs.copyFileSync(path.join(import.meta.dirname, "seed-images", p.foto), path.join(destino, p.foto));
  }

  console.log("🛍️  Produtos...");
  const criados = [];
  for (const { foto, destaque, ...p } of produtos) {
    criados.push(
      await prisma.produto.create({
        data: { ...p, fotoCapa: `produtos/${foto}`, emDestaque: destaque === undefined ? null : diasAtras(30 - destaque) },
      })
    );
  }

  console.log("👤 Usuários (senha: " + SENHA_PADRAO + ")...");
  const hash = await bcrypt.hash(SENHA_PADRAO, 10);
  const porEmail = {};
  for (const u of usuarios) {
    porEmail[u.email] = await prisma.usuario.create({ data: { ...u, senha: hash } });
  }

  console.log("⭐ Avaliações...");
  for (const [i, [email, idx, nota]] of avaliacoes.entries()) {
    await prisma.avaliacao.create({
      data: { usuarioId: porEmail[email].id, produtoId: criados[idx].id, nota, data: diasAtras(i + 2) },
    });
  }

  console.log("📦 Pedidos...");
  // Só avalia quem recebeu o produto: quem tem avaliação no seed ganha um pedido "entregue" com esses produtos
  const comprasDosAvaliadores = Object.entries(
    Object.groupBy(avaliacoes, ([email]) => email)
  ).map(([email, lista], k) => ({
    email, status: "entregue", metodoPagamento: "Pix", data: diasAtras(40 + k), dataEntrega: diasAtras(33 + k),
    itens: lista.map(([, idx]) => [idx, 1]),
  }));

  // Marina tem um pedido em vários status para ver as telas
  const pedidos = [
    { email: "marina@exemplo.com", status: "pendente", metodoPagamento: "Boleto", data: diasAtras(1), itens: [[12, 2]] },
    { email: "marina@exemplo.com", status: "enviado", metodoPagamento: "Pix", data: diasAtras(8), itens: [[0, 1], [7, 1]] },
    { email: "marina@exemplo.com", status: "cancelado", metodoPagamento: "Pix", data: diasAtras(20), itens: [[21, 1]] },
    { email: "marina@exemplo.com", status: "entregue", metodoPagamento: "Cartão de crédito (3x)", data: diasAtras(52), dataEntrega: diasAtras(45), itens: [[3, 1], [19, 1], [22, 1]] },
    ...comprasDosAvaliadores,
  ];

  for (const { email, itens, ...p } of pedidos) {
    const usuario = porEmail[email];
    const linhas = itens.map(([idx, quantidade]) => ({ produtoId: criados[idx].id, quantidade, preco: Number(criados[idx].precoDesconto) }));
    const subtotal = linhas.reduce((s, l) => s + l.preco * l.quantidade, 0);
    const frete = subtotal >= 199 ? null : 19.9; // mesma regra de src/utils/regras.js
    await prisma.pedido.create({
      data: {
        ...p,
        usuarioId: usuario.id,
        endereco: `${usuario.nome} — Rua das Estrelas, 120, Apto 31 - Vila Mariana, São Paulo/SP - CEP 04101-000`,
        frete,
        total: Math.round((subtotal + (frete ?? 0)) * 100) / 100,
        itens: { create: linhas },
      },
    });
  }

  console.log("✅ Seed concluído.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exitCode = 1;
  })
  .finally(() => prisma.$disconnect());
