import { Router } from "express";
import * as ctrl from "../controllers/pedido.controller.js";
import { autenticar } from "../middlewares/auth.js";

const router = Router();

router.use(autenticar); // todas exigem login
router.get("/", ctrl.listar);
router.get("/:id", ctrl.detalhar);
router.post("/", ctrl.criar);

export default router;
