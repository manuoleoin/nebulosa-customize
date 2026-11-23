import { Router } from "express";
import * as ctrl from "../controllers/usuario.controller.js";
import { autenticar } from "../middlewares/auth.js";

const router = Router();

router.use(autenticar); // todas exigem login
router.put("/me", ctrl.atualizar);
router.delete("/me", ctrl.excluir);

export default router;
