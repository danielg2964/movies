import { relations } from "drizzle-orm";
import { pgTable, timestamp, varchar } from "drizzle-orm/pg-core";
import { categories } from "./category.schema.ts";

export const movies = pgTable("movies", {
  uuid: varchar({ length: 255 }).primaryKey(),
  name: varchar().notNull(),
  category_uuid: varchar({ length: 255 }).references(() => categories.uuid).notNull(),
  release: timestamp({ withTimezone: true }).notNull()
});

export const moviesRelations = relations(movies, ({ one }) => ({ 
  category: one(categories, {
    fields: [movies.category_uuid],
    references: [categories.uuid] 
  })
}));
