import { drizzle } from "drizzle-orm/node-postgres";

const uri = process.env["POSTGRES_URI"] ?? null;

if (uri === null) {
  throw new Error("POSTGRES_URI is needed");
}

export const db = drizzle(uri);
