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
  { nome: "Garrafa Térmica Personalizada - 500ml", preco: 78.9, precoDesconto: 56.99, destaque: 4, categoria: "Garrafas e copos", cor: "Creme e roxo", tamanho: "500 ml", foto: "garrafa.svg",
    descricao: "Praticidade e estilo para acompanhar sua rotina! Com design exclusivo, estrutura resistente e isolamento térmico, a garrafa ajuda a conservar a temperatura da sua bebida por mais tempo. Ideal para levar à escola, ao trabalho ou em passeios, unindo funcionalidade e personalidade em um só produto." },
  { nome: "Camiseta T-shirt Personalizada", preco: 80.99, precoDesconto: 64.9, destaque: 3, categoria: "Vestuário", cor: "Branca", tamanho: "M", foto: "camiseta.svg",
    descricao: "Camiseta 100% algodão penteado com estampa cósmica feita em silk ecológico. Corte confortável, toque macio e cores que não desbotam na lavagem." },
  { nome: "Boné Personalizado", preco: 36.97, precoDesconto: 29.98, destaque: 2, categoria: "Acessórios", cor: "Creme e lilás", tamanho: "Único (ajustável)", foto: "bone.svg",
    descricao: "Boné de sarja com aba curva lilás e bordado do planeta Nebulosa. Fecho regulável para caber em qualquer cabeça sonhadora." },
  { nome: "Agenda 2026-2029 Personalizada", preco: 119.96, precoDesconto: 99.9, destaque: 1, categoria: "Papelaria", cor: "Creme", tamanho: "A5", foto: "agenda.svg",
    descricao: "Agenda plurianual com capa dura, elástico, fitilho marcador e páginas pautadas. Personalize com seu nome na capa e organize seus próximos anos entre as estrelas." },
  { nome: "Caneca Cerâmica Constelação", preco: 49.9, precoDesconto: 39.9, categoria: "Garrafas e copos", cor: "Branca", tamanho: "325 ml", foto: "caneca.svg",
    descricao: "Caneca de cerâmica com impressão sublimática resistente à lava-louças e ao micro-ondas. Perfeita para o café das ideias." },
  { nome: "Moletom Galáxia Personalizado", preco: 219.9, precoDesconto: 179.9, destaque: 0, categoria: "Vestuário", cor: "Off-white", tamanho: "G", foto: "moletom.svg",
    descricao: "Moletom flanelado por dentro com estampa de planeta e constelações nas mangas. Quentinho, estiloso e feito para durar." },
  { nome: "Ecobag Lua Crescente", preco: 54.9, precoDesconto: 44.9, categoria: "Acessórios", cor: "Cru", tamanho: "40 x 38 cm", foto: "ecobag.svg",
    descricao: "Ecobag de algodão cru reforçado com estampa de lua crescente. Substitui sacolas plásticas com muito mais charme." },
  { nome: "Caderno Sonhe Crie Conquiste", preco: 42.9, precoDesconto: 34.9, categoria: "Papelaria", cor: "Lilás", tamanho: "A5", foto: "caderno.svg",
    descricao: "Caderno espiral com 96 folhas pontilhadas, papel 90 g/m² e capa lilás com a frase que guia a Nebulosa." },
  { nome: "Copo Long Drink Nebulosa", preco: 39.9, precoDesconto: 32.9, categoria: "Garrafas e copos", cor: "Transparente", tamanho: "350 ml", foto: "copo.svg",
    descricao: "Copo em acrílico livre de BPA com tampa e canudo. Estampa de planetas que brilha à luz do sol." },
  { nome: "Chaveiro Planeta", preco: 19.9, precoDesconto: 14.9, categoria: "Acessórios", cor: "Roxo e amarelo", tamanho: "5 cm", foto: "chaveiro.svg",
    descricao: "Chaveiro em acrílico espelhado com o planeta da marca. Pequeno no tamanho, gigante na personalidade." },
  { nome: "Squeeze Infantil Estrelinhas", preco: 49.9, precoDesconto: 49.9, categoria: "Garrafas e copos", cor: "Lilás", tamanho: "400 ml", foto: "squeeze.svg",
    descricao: "Squeeze leve e resistente com bico retrátil e estampa de estrelinhas. Personalize com o nome da criança." },
  { nome: "Kit Adesivos Cósmicos", preco: 24.9, precoDesconto: 19.9, categoria: "Papelaria", cor: "Variadas", tamanho: "12 unidades", foto: "adesivos.svg",
    descricao: "Cartela com 12 adesivos em vinil à prova d'água: planetas, luas, estrelas e frases para decorar tudo o que é seu." },
];

const usuarios = [
  { nome: "Administração Nebulosa", email: "admin@nebulosa.com", telefone: "(11) 3333-4444", tipo: "admin" },
  { nome: "Marina Alves Costa", email: "marina@exemplo.com", telefone: "(11) 98765-4321", tipo: "cliente" },
  { nome: "João Pedro Lima", email: "joao@exemplo.com", telefone: "(21) 99876-1122", tipo: "cliente" },
  { nome: "Beatriz Nogueira", email: "bia@exemplo.com", telefone: "(31) 98111-2233", tipo: "cliente" },
  { nome: "Rafael Souza", email: "rafa@exemplo.com", telefone: "(41) 99222-3344", tipo: "cliente" },
];

// [emailUsuario, índice do produto, nota]
const avaliacoes = [
  ["joao@exemplo.com", 0, 5], ["bia@exemplo.com", 0, 5], ["rafa@exemplo.com", 0, 4.5],
  ["joao@exemplo.com", 1, 4], ["bia@exemplo.com", 1, 5], ["rafa@exemplo.com", 2, 4.5],
  ["joao@exemplo.com", 3, 5], ["bia@exemplo.com", 5, 5], ["rafa@exemplo.com", 6, 4],
  ["joao@exemplo.com", 7, 4.5], ["bia@exemplo.com", 9, 3.5],
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
    { email: "marina@exemplo.com", status: "pendente", metodoPagamento: "Boleto", data: diasAtras(1), itens: [[4, 2]] },
    { email: "marina@exemplo.com", status: "enviado", metodoPagamento: "Pix", data: diasAtras(8), itens: [[0, 2], [7, 1]] },
    { email: "marina@exemplo.com", status: "cancelado", metodoPagamento: "Pix", data: diasAtras(20), itens: [[10, 1]] },
    { email: "marina@exemplo.com", status: "entregue", metodoPagamento: "Cartão de crédito (3x)", data: diasAtras(52), dataEntrega: diasAtras(45), itens: [[5, 1], [2, 1], [9, 3]] },
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
