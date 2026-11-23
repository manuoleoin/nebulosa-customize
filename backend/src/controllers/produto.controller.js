import { caminhoRelativo, removerUpload } from "../middlewares/upload.js";
import { idParamSchema } from "../schemas/comum.schema.js";
import { avaliacaoSchema, listarProdutosSchema, produtoSchema } from "../schemas/produto.schema.js";
import * as produtoService from "../services/produto.service.js";

// GET /api/produtos?busca=&categoria=&ordem=&destaque=true&limite=
export async function listar(req, res) {
  const filtros = listarProdutosSchema.parse(req.query);
  res.json(await produtoService.listarProdutos(filtros));
}

// GET /api/produtos/categorias
export async function categorias(req, res) {
  res.json(await produtoService.listarCategorias());
}

// GET /api/produtos/:id
export async function detalhar(req, res) {
  const { id } = idParamSchema.parse(req.params);
  res.json(await produtoService.buscarProduto(id));
}

/** Se a validação/gravação falhar depois do upload, apaga o arquivo enviado */
async function comUpload(req, acao) {
  const foto = req.file ? caminhoRelativo(req.file) : null;
  try {
    return await acao(foto);
  } catch (erro) {
    removerUpload(foto);
    throw erro;
  }
}

// POST /api/produtos  (admin, multipart/form-data com o arquivo no campo "fotoCapa")
export async function criar(req, res) {
  const produto = await comUpload(req, (foto) => produtoService.criarProduto(produtoSchema.parse(req.body), foto));
  res.status(201).json(produto);
}

// PUT /api/produtos/:id  (admin)
export async function atualizar(req, res) {
  const produto = await comUpload(req, (foto) => {
    const { id } = idParamSchema.parse(req.params);
    return produtoService.atualizarProduto(id, produtoSchema.parse(req.body), foto);
  });
  res.json(produto);
}

// DELETE /api/produtos/:id  (admin)
export async function remover(req, res) {
  const { id } = idParamSchema.parse(req.params);
  await produtoService.removerProduto(id);
  res.status(204).end();
}

// PUT /api/produtos/:id/avaliacao  (logado)
export async function avaliar(req, res) {
  const { id } = idParamSchema.parse(req.params);
  const { nota } = avaliacaoSchema.parse(req.body);
  res.json(await produtoService.avaliarProduto(req.usuario.id, id, nota));
}
