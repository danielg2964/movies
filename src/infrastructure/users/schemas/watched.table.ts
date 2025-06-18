import { pgTable, varchar } from "drizzle-orm/pg-core";
import { users } from "./users.table.ts";
import { movies } from "#infrastructure/movies/schemas/movie.schema.ts";
import { relations } from "drizzle-orm";

export const watched = pgTable("watched", {
  uuid: varchar({ length: 255 }).primaryKey(),
  user_uuid: varchar({ length: 255 }).references(() => users.uuid).notNull(),
  movie_uuid: varchar({ length: 255 }).references(() => movies.uuid).notNull(),
});

export const watchedRelations = relations(watched, ({ one }) => ({
  movie: one(movies, {
    fields: [watched.movie_uuid],
    references: [movies.uuid],
    relationName: "users_watched"
  })
}))
