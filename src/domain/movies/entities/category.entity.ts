import { Entity } from "#domain/shared/entity.ts";
import type { Failure } from "#types/failure.ts";
import { Maybe } from "#types/maybe.ts";
import { CategoryName } from "../category.name.ts";

export class CategoryEntity extends Entity {
  constructor(uuid: string, category: string) {
    super(uuid);

    this.#name = new CategoryName(category);
  }

  #name: CategoryName;
  get name(): string {
    return this.#name.value;
  }
  setName(category: string): Maybe<Failure> {
    this.#name = new CategoryName(category);

    return Maybe.nothing();
  }
}
