import type { Maybe } from "#types/maybe.ts";

export class MovieFilter {
  constructor(
    name: Maybe<string>,
    category_uuid: Maybe<string>,
    category_name: Maybe<string>,
    release: Maybe<Date>,
    order: Maybe<string>
  ) {
    this.#name = name;
    this.#category_uuid = category_uuid;
    this.#category_name = category_name;
    this.#release = release;
    this.#order_by = order;
  }
  
  readonly #name: Maybe<string>;
  get name(): Maybe<string> {
    return this.#name;
  }

  readonly #category_uuid: Maybe<string>;
  get category_uuid(): Maybe<string> {
    return this.#category_uuid;
  }

  readonly #category_name: Maybe<string>;
  get category_name(): Maybe<string> {
    return this.#category_name;
  }

  readonly #release: Maybe<Date>;
  get release(): Maybe<Date> {
    return this.#release;
  }

  readonly #order_by: Maybe<string>;
  get order_by(): Maybe<string> {
    return this.#order_by;
  }
}
