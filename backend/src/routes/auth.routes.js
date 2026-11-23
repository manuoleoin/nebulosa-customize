import { Router } from "express";
import * as ctrl from "../controllers/auth.controller.js";
import { autenticarOpcional } from "../middlewares/auth.js";

const router = Router();

router.post("/cadastro", ctrl.cadastrar);
router.post("/login", ctrl.login);
router.post("/logout", ctrl.logout);
router.get("/me", autenticarOpcional, ctrl.me);

export default router;
