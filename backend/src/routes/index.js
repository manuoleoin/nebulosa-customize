import { Router } from "express";
import authRoutes from "./auth.routes.js";
import pedidoRoutes from "./pedido.routes.js";
import produtoRoutes from "./produto.routes.js";
import usuarioRoutes from "./usuario.routes.js";

const router = Router();

router.get("/health", (req, res) => res.json({ status: "ok" }));
router.use("/auth", authRoutes);
router.use("/usuarios", usuarioRoutes);
router.use("/produtos", produtoRoutes);
router.use("/pedidos", pedidoRoutes);

export default router;
