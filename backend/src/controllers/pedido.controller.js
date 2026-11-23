import { idParamSchema } from "../schemas/comum.schema.js";
import { criarPedidoSchema } from "../schemas/pedido.schema.js";
import * as pedidoService from "../services/pedido.service.js";

// GET /api/pedidos
export async function listar(req, res) {
  res.json(await pedidoService.listarPedidosDoUsuario(req.usuario.id));
}

// GET /api/pedidos/:id
export async function detalhar(req, res) {
  const { id } = idParamSchema.parse(req.params);
  res.json(await pedidoService.buscarPedidoDoUsuario(id, req.usuario.id));
}

// POST /api/pedidos
export async function criar(req, res) {
  const dados = criarPedidoSchema.parse(req.body);
  const pedido = await pedidoService.criarPedido(req.usuario.id, dados);
  res.status(201).location(`/api/pedidos/${pedido.id}`).json(pedido);
}
