import type { Pagination } from "#application/shared/pagination.ts";
import { Reply } from "../reply.ts";

export class PaginationReply<T> extends Reply {
  constructor(pagination: Pagination<T>, message: string, code: string, status_code: number) {
    super(message, code, status_code);

    this.total_count = pagination.total_count;
    this.limit = pagination.limit;
    this.total_pages = pagination.total_pages;
    this.actual_page = pagination.actual_page;
    this.offset = pagination.offset;
    this.data = pagination.data;
    this.has_next_page = pagination.has_next_page;
  }

  readonly total_count: number;
  readonly limit: number;
  readonly total_pages: number;
  readonly actual_page: number;
  readonly offset: number;
  readonly data: T[];
  readonly has_next_page: boolean;
}
