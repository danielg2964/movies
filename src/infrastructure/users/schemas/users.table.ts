import { relations } from "drizzle-orm";
import { pgTable, varchar } from "drizzle-orm/pg-core";
import { watched } from "./watched.table.ts";

export const users = pgTable("users", {
  uuid: varchar().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  password: varchar({ length: 255 }).notNull(),

});

export const usersRelations = relations(users, ({ many }) => ({
  watched: many(watched, { relationName: "users_watched" })
}));
