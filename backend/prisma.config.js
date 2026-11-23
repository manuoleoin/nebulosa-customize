import "dotenv/config";
import { defineConfig, env } from "prisma/config";

// Prisma 7: a URL do banco e o seed ficam aqui (não mais no schema.prisma / package.json)
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.js",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});
