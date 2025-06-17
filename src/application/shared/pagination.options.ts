export class PaginationOptions {
  constructor(page: number, limit: number) {
    this.#page = page;
    this.#limit = limit;
  }

  readonly #page: number;
  get page(): number {
    return this.#page;
  }

  readonly #limit: number;
  get limit(): number {
    return this.#limit;
  }
}
