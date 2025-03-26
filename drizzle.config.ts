import type { Config } from "drizzle-kit";
import dotenv from "dotenv";
// import { env } from "~/env";

dotenv.config();

export default {
  schema: "./lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
} satisfies Config;