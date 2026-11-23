/* =========================================================
   Dados mockados — espelham as tabelas de db/nebulosabd.sql
   (produto, usuario, pedido, item_pedido, usuario_avalia_produto)
   No sistema real estes dados virão da API / Prisma.
   ========================================================= */

// Tabela `produto`
// emDestaque: TIMESTAMP NULL -> se preenchido, o produto aparece na home
window.PRODUTOS = [
  { id: 1,  nome: "Garrafa Térmica Personalizada - 500ml", preco: 78.90,  precoDesconto: 56.99,  emDestaque: "2026-11-04T10:00:00", categoria: "Garrafas e copos", cor: "Creme e roxo",  tamanho: "500 ml", fotoCapa: "img/garrafa.svg",
    descricao: "Praticidade e estilo para acompanhar sua rotina! Com design exclusivo, estrutura resistente e isolamento térmico, a garrafa ajuda a conservar a temperatura da sua bebida por mais tempo. Ideal para levar à escola, ao trabalho ou em passeios, unindo funcionalidade e personalidade em um só produto." },
  { id: 2,  nome: "Camiseta T-shirt Personalizada", preco: 80.99, precoDesconto: 64.90, emDestaque: "2026-11-03T10:00:00", categoria: "Vestuário", cor: "Branca", tamanho: "M",
    fotoCapa: "img/camiseta.svg",
    descricao: "Camiseta 100% algodão penteado com estampa cósmica feita em silk ecológico. Corte confortável, toque macio e cores que não desbotam na lavagem." },
  { id: 3,  nome: "Boné Personalizado", preco: 36.97, precoDesconto: 29.98, emDestaque: "2026-11-02T10:00:00", categoria: "Acessórios", cor: "Creme e lilás", tamanho: "Único (ajustável)",
    fotoCapa: "img/bone.svg",
    descricao: "Boné de sarja com aba curva lilás e bordado do planeta Nebulosa. Fecho regulável para caber em qualquer cabeça sonhadora." },
  { id: 4,  nome: "Agenda 2026-2029 Personalizada", preco: 119.96, precoDesconto: 99.90, emDestaque: "2026-11-01T10:00:00", categoria: "Papelaria", cor: "Creme", tamanho: "A5",
    fotoCapa: "img/agenda.svg",
    descricao: "Agenda plurianual com capa dura, elástico, fitilho marcador e páginas pautadas. Personalize com seu nome na capa e organize seus próximos anos entre as estrelas." },
  { id: 5,  nome: "Caneca Cerâmica Constelação", preco: 49.90, precoDesconto: 39.90, emDestaque: null, categoria: "Garrafas e copos", cor: "Branca", tamanho: "325 ml",
    fotoCapa: "img/caneca.svg",
    descricao: "Caneca de cerâmica com impressão sublimática resistente à lava-louças e ao micro-ondas. Perfeita para o café das ideias." },
  { id: 6,  nome: "Moletom Galáxia Personalizado", preco: 219.90, precoDesconto: 179.90, emDestaque: "2026-10-28T10:00:00", categoria: "Vestuário", cor: "Off-white", tamanho: "G",
    fotoCapa: "img/moletom.svg",
    descricao: "Moletom flanelado por dentro com estampa de planeta e constelações nas mangas. Quentinho, estiloso e feito para durar." },
  { id: 7,  nome: "Ecobag Lua Crescente", preco: 54.90, precoDesconto: 44.90, emDestaque: null, categoria: "Acessórios", cor: "Cru", tamanho: "40 x 38 cm",
    fotoCapa: "img/ecobag.svg",
    descricao: "Ecobag de algodão cru reforçado com estampa de lua crescente. Substitui sacolas plásticas com muito mais charme." },
  { id: 8,  nome: "Caderno Sonhe Crie Conquiste", preco: 42.90, precoDesconto: 34.90, emDestaque: null, categoria: "Papelaria", cor: "Lilás", tamanho: "A5",
    fotoCapa: "img/caderno.svg",
    descricao: "Caderno espiral com 96 folhas pontilhadas, papel 90 g/m² e capa lilás com a frase que guia a Nebulosa." },
  { id: 9,  nome: "Copo Long Drink Nebulosa", preco: 39.90, precoDesconto: 32.90, emDestaque: null, categoria: "Garrafas e copos", cor: "Transparente", tamanho: "350 ml",
    fotoCapa: "img/copo.svg",
    descricao: "Copo em acrílico livre de BPA com tampa e canudo. Estampa de planetas que brilha à luz do sol." },
  { id: 10, nome: "Chaveiro Planeta", preco: 19.90, precoDesconto: 14.90, emDestaque: null, categoria: "Acessórios", cor: "Roxo e amarelo", tamanho: "5 cm",
    fotoCapa: "img/chaveiro.svg",
    descricao: "Chaveiro em acrílico espelhado com o planeta da marca. Pequeno no tamanho, gigante na personalidade." },
  { id: 11, nome: "Squeeze Infantil Estrelinhas", preco: 49.90, precoDesconto: 49.90, emDestaque: null, categoria: "Garrafas e copos", cor: "Lilás", tamanho: "400 ml",
    fotoCapa: "img/squeeze.svg",
    descricao: "Squeeze leve e resistente com bico retrátil e estampa de estrelinhas. Personalize com o nome da criança." },
  { id: 12, nome: "Kit Adesivos Cósmicos", preco: 24.90, precoDesconto: 19.90, emDestaque: null, categoria: "Papelaria", cor: "Variadas", tamanho: "12 unidades",
    fotoCapa: "img/adesivos.svg",
    descricao: "Cartela com 12 adesivos em vinil à prova d'água: planetas, luas, estrelas e frases para decorar tudo o que é seu." }
];

// Tabela `usuario` (apenas nomes públicos, para exibir nas avaliações)
window.USUARIOS = [
  { id: 1, nome: "Marina Alves Costa",  email: "marina@exemplo.com", telefone: "(11) 98765-4321",  tipo: "cliente" },
  { id: 2, nome: "João Pedro Lima",     email: "joao@exemplo.com", telefone: "(21) 99876-1122",    tipo: "cliente" },
  { id: 3, nome: "Beatriz Nogueira",    email: "bia@exemplo.com", telefone: "(31) 98111-2233",     tipo: "cliente" },
  { id: 4, nome: "Rafael Souza",        email: "rafa@exemplo.com", telefone: "(41) 99222-3344",    tipo: "cliente" },
  { id: 5, nome: "Camila Ribeiro",      email: "camila@exemplo.com", telefone: "(51) 98333-4455",  tipo: "cliente" },
  { id: 6, nome: "Lucas Martins",       email: "lucas@exemplo.com", telefone: "(61) 99444-5566",   tipo: "cliente" }
];

// Tabela `usuario_avalia_produto` (usuario_id, produto_id, data, nota)
window.AVALIACOES = [
  { usuario_id: 2, produto_id: 1, data: "2026-11-10T14:20:00", nota: 5 },
  { usuario_id: 3, produto_id: 1, data: "2026-11-08T09:12:00", nota: 5 },
  { usuario_id: 4, produto_id: 1, data: "2026-11-02T18:40:00", nota: 4.5 },
  { usuario_id: 5, produto_id: 1, data: "2026-10-29T11:05:00", nota: 5 },
  { usuario_id: 6, produto_id: 1, data: "2026-10-21T16:30:00", nota: 5 },
  { usuario_id: 2, produto_id: 2, data: "2026-11-01T10:00:00", nota: 4 },
  { usuario_id: 3, produto_id: 2, data: "2026-10-12T10:00:00", nota: 5 },
  { usuario_id: 4, produto_id: 3, data: "2026-10-15T10:00:00", nota: 4.5 },
  { usuario_id: 5, produto_id: 4, data: "2026-11-05T10:00:00", nota: 5 },
  { usuario_id: 6, produto_id: 4, data: "2026-11-06T10:00:00", nota: 4.8 },
  { usuario_id: 2, produto_id: 5, data: "2026-09-30T10:00:00", nota: 4 },
  { usuario_id: 3, produto_id: 6, data: "2026-11-11T10:00:00", nota: 5 },
  { usuario_id: 4, produto_id: 7, data: "2026-10-03T10:00:00", nota: 4.2 },
  { usuario_id: 5, produto_id: 8, data: "2026-10-09T10:00:00", nota: 4.7 },
  { usuario_id: 6, produto_id: 10, data: "2026-10-19T10:00:00", nota: 3.5 }
];

// Tabelas `pedido` + `item_pedido` do usuário logado (id 1)
// frete: DECIMAL NULL (null = frete grátis) | total: soma dos itens + frete
// status controlado pelo Prisma Studio: pendente | pago | em produção | enviado | entregue | cancelado
window.PEDIDOS = [
  { id: 1042, usuario_id: 1, endereco: "Rua das Estrelas, 120, Apto 31 - Vila Mariana, São Paulo/SP - CEP 04101-000",
    metodoPagamento: "Pix", frete: 19.90, total: 168.78, status: "enviado", data: "2026-11-15T13:22:00", dataEntrega: null,
    itens: [
      { produto_id: 1, quantidade: 2, preco: 56.99 },
      { produto_id: 8, quantidade: 1, preco: 34.90 }
    ] },
  { id: 987, usuario_id: 1, endereco: "Rua das Estrelas, 120, Apto 31 - Vila Mariana, São Paulo/SP - CEP 04101-000",
    metodoPagamento: "Cartão de crédito (3x)", frete: null, total: 254.58, status: "entregue", data: "2026-10-02T09:10:00", dataEntrega: "2026-10-09T16:45:00",
    itens: [
      { produto_id: 6, quantidade: 1, preco: 179.90 },
      { produto_id: 3, quantidade: 1, preco: 29.98 },
      { produto_id: 10, quantidade: 3, preco: 14.90 }
    ] },
  { id: 901, usuario_id: 1, endereco: "Av. Paulista, 1000 - Bela Vista, São Paulo/SP - CEP 01310-100",
    metodoPagamento: "Boleto", frete: 19.90, total: 119.80, status: "cancelado", data: "2026-08-20T19:00:00", dataEntrega: null,
    itens: [
      { produto_id: 4, quantidade: 1, preco: 99.90 }
    ] }
];
