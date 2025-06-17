export class Pagination<T> {
  constructor(
    total_count: number,
    limit: number,
    actual_page: number,
    data: T[],
  ) {
    this.#total_count = total_count;
    this.#limit = limit;
    this.#total_pages = Math.ceil(total_count / limit);
    this.#actual_page = actual_page;
    this.#offset = (actual_page - 1) * limit;
    this.#data = data;

    this.#has_next_page = actual_page < this.#total_pages;
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
