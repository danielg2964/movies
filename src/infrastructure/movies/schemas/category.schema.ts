import { pgTable, varchar } from "drizzle-orm/pg-core";

export const categories = pgTable("categories", {
  uuid: varchar({ length: 255 }).primaryKey(),
  name: varchar({ length: 255 }).notNull()
})
