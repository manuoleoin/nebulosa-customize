import { atualizarUsuarioSchema, excluirContaSchema } from "../schemas/usuario.schema.js";
import { limparCookieToken } from "../services/token.service.js";
import * as usuarioService from "../services/usuario.service.js";

// PUT /api/usuarios/me
export async function atualizar(req, res) {
  const dados = atualizarUsuarioSchema.parse(req.body);
  const usuario = await usuarioService.atualizarUsuario(req.usuario.id, dados);
  res.json(usuario);
}

// DELETE /api/usuarios/me
export async function excluir(req, res) {
  const { senha } = excluirContaSchema.parse(req.body);
  await usuarioService.excluirUsuario(req.usuario.id, senha);
  limparCookieToken(res);
  res.status(204).end();
}
