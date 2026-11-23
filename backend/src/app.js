import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { env } from "./config/env.js";
import { errorHandler, rotaNaoEncontrada } from "./middlewares/errorHandler.js";
import { PASTA_UPLOADS } from "./middlewares/upload.js";
import routes from "./routes/index.js";

export const app = express();

app.disable("x-powered-by");
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true })); // credentials: permite o cookie
app.use(express.json({ limit: "100kb" }));
app.use(cookieParser());

// imagens enviadas pelo multer
app.use(
  "/uploads",
  express.static(PASTA_UPLOADS, {
    setHeaders: (res) => {
      res.setHeader("X-Content-Type-Options", "nosniff");
      res.setHeader("Content-Security-Policy", "default-src 'none'; style-src 'unsafe-inline'; sandbox");
      res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
    },
  })
);

app.use("/api", routes);

app.use(rotaNaoEncontrada);
app.use(errorHandler); // sempre por último
