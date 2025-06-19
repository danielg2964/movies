import { Type, type Static } from "@sinclair/typebox";

export const PaginationQuery = Type.Object({
  page: Type.Union(
    [Type.Number({ minimum: 1 }), Type.Null()],
    { default: 1 }
  ),
  limit: Type.Union(
    [Type.Number({ default: 5, minimum: 1 }), Type.Null()],
    { default: 1 }
  )
});

export type PaginationQuery = Static<typeof PaginationQuery>

