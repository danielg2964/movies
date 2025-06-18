import { MoviesConstants } from "#domain/movies/constants/movies.constants.ts"
import { PaginationQuery } from "#infrastructure/shared/queries/pagination.query.ts"
import { S } from "fluent-json-schema"

export type ListMoviesQuery = PaginationQuery & {
  name: string | null,
  category_uuid: string | null,
  category_name: string | null,
  release: string | null,
  order: string | null
}

export const ListMoviesQuery = S.object()
  .prop("name", S.oneOf([S.string(), S.null()]))
  .prop("category_uuid", S.oneOf([S.string(), S.null()]))
  .prop("category_name", S.oneOf([S.string(), S.null()]))
  .prop("release", S.oneOf([S.string().format("date"), S.null()]))
  .prop("order", S.oneOf([S.enum([MoviesConstants.ORDER_ASC, MoviesConstants.ORDER_DEC]), S.null()]))
  .extend(PaginationQuery)
