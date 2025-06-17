export class Pagination<T> {
  constructor(
    total_count: number,
    limit: number,
    total_pages: number,
    actual_page: number,
    offset: number,
    data: T[],
    has_next_page: boolean
  ) {
    this.#total_count = total_count;
    this.#limit = limit;
    this.#total_pages = total_pages;
    this.#actual_page = actual_page;
    this.#offset = offset;
    this.#data = data;
    this.#has_next_page = has_next_page;
  }

  readonly #total_count: number;
  get total_count(): number {
    return this.#total_count;
  }
  
  readonly #limit: number;
  get limit(): number {
    return this.#limit;
  }

  readonly #total_pages: number;
  get total_pages(): number {
    return this.#total_pages;
  }

  readonly #actual_page: number;
  get actual_page(): number {
    return this.#actual_page;
  }

  readonly #offset: number;
  get offset(): number {
    return this.#offset;
  }

  readonly #data: T[];
  get data(): T[] {
    return this.#data;
  }

  readonly #has_next_page: boolean;
  get has_next_page(): boolean {
    return this.#has_next_page;
  }
}
