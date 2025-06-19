import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { fastify } from "fastify";
import { UsersRoutes } from "./users/users.routes.ts";
import { PostgresUserRepository } from "./users/repositories/postgres-user.repository.ts";
import { UuidUuidGenerator } from "./shared/uuid-uuid.generator.ts";
import { Argon2Hasher } from "./shared/argon2-hahser.ts";
import { PostgresWatchedRepository } from "./users/repositories/postgres-watched.repository.ts";
import { PostgresMovieRepository } from "./movies/repositories/postgres-movie.repository.ts";
import { MoviesRoutes } from "./movies/movies.routes.ts";
import { PostgresCategoryRepository } from "./movies/repositories/postgres-category.repository.ts";

export type AppInstance = Awaited<ReturnType<typeof createApp>>

export async function createApp() {
  const app = fastify();
  
  app.register(import("@fastify/swagger"));
  app.register(import("@fastify/swagger-ui"), {
    routePrefix: "/docs"
  });

  const user_repository = new PostgresUserRepository()
  const watched_repository = new PostgresWatchedRepository();
  const movie_repository = new PostgresMovieRepository()
  const category_repository = new PostgresCategoryRepository();
  const uuid_generator = new UuidUuidGenerator();
  const hasher = new Argon2Hasher();

  const users_routes = new UsersRoutes(
    user_repository,
    watched_repository,
    movie_repository,
    uuid_generator,
    hasher
  );

  await app.register(users_routes.registerRoutes, { prefix: "users" });

  const movies_routes = new MoviesRoutes(
    movie_repository,
    category_repository,
    uuid_generator
  );

  await app.register(movies_routes.registerRoutes, { prefix: "movies" });

  return app.withTypeProvider<TypeBoxTypeProvider>();
}
