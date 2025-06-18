import { defineConfig } from "drizzle-kit";

process.loadEnvFile();

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/infrastructure/db/schema.ts",
  dbCredentials: {
    url: process.env["POSTGRES_URI"]!
  }
})
