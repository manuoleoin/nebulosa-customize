import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* useTransitions={false}: navegação síncrona. Sem isso o v8 usa startTransition e,
        ao sair/excluir a conta, a rota protegida redireciona para o login antes de ir para "/" */}
    <BrowserRouter useTransitions={false}>
      <App />
    </BrowserRouter>
  </StrictMode>
);
