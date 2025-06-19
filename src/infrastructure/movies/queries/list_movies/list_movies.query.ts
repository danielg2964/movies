import { MoviesConstants } from "#domain/movies/constants/movies.constants.ts"
import { PaginationQuery } from "#infrastructure/shared/queries/pagination.query.ts"
import { Type, type Static } from "@sinclair/typebox";

export const ListMoviesQuery = Type.Intersect([
  PaginationQuery,
  Type.Object({
    name: Type.Union(
      [ Type.String(), Type.Null()],
      { default: null }
    ),
    category_uuid: Type.Union(
      [Type.String({ format: "uuid" }), Type.Null()],
      { default: null }
    ),
    category_name: Type.Union(
      [Type.String(), Type.Null()],
      { default:null }
    ),
    release: Type.Union(
      [Type.String({ format: "date" }), Type.Null()]
    ),
    order: Type.Union(
      [Type.Literal(MoviesConstants.ORDER_ASC),
       Type.Literal(MoviesConstants.ORDER_DEC)]
    )
  })
]);

export type ListMoviesQuery = Static<typeof ListMoviesQuery>
