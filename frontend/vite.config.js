import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const alvo = env.VITE_API_PROXY || "http://localhost:3000";

  return {
    plugins: [react(), tailwindcss()],
    server: {
      port: 5173,
      // mesmo domínio para o navegador: o cookie httpOnly do login funciona sem CORS
      proxy: {
        "/api": alvo,
        "/uploads": alvo,
      },
    },
  };
});
