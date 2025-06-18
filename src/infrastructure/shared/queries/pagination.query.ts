import { S } from "fluent-json-schema";

export type PaginationQuery = {
  page: number,
  limit: number
}

export const PaginationQuery = S.object()
  .prop("page", S.number())
  .prop("limit", S.number());
