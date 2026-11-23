import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "../generated/prisma/client.ts";
import { env } from "../config/env.js";

// Prisma 7 usa driver adapters: para MySQL, o adapter do driver `mariadb`
const url = new URL(env.DATABASE_URL);

const adapter = new PrismaMariaDb({
  host: url.hostname,
  port: Number(url.port) || 3306,
  user: decodeURIComponent(url.username),
  password: decodeURIComponent(url.password),
  database: url.pathname.slice(1),
  connectionLimit: 5,
});

export const prisma = new PrismaClient({
  adapter,
  log: env.isProd ? ["error"] : ["warn", "error"],
});
