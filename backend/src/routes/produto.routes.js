import { Router } from "express";
import * as ctrl from "../controllers/produto.controller.js";
import { autenticar, exigirAdmin } from "../middlewares/auth.js";
import { uploadImagemProduto } from "../middlewares/upload.js";

const router = Router();

// públicas
router.get("/", ctrl.listar);
router.get("/categorias", ctrl.categorias);
router.get("/:id", ctrl.detalhar);

// cliente logado
router.put("/:id/avaliacao", autenticar, ctrl.avaliar);

// administração (ainda sem painel: use Insomnia/Postman ou o Prisma Studio)
router.post("/", autenticar, exigirAdmin, uploadImagemProduto, ctrl.criar);
router.put("/:id", autenticar, exigirAdmin, uploadImagemProduto, ctrl.atualizar);
router.delete("/:id", autenticar, exigirAdmin, ctrl.remover);

export default router;
