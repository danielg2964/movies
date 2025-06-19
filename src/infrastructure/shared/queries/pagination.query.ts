import { Type, type Static } from "@sinclair/typebox";

export const PaginationQuery = Type.Object({
  page: Type.Number(),
  limit: Type.Number()
});

export type PaginationQuery = Static<typeof PaginationQuery>

