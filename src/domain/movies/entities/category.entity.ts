import { Entity } from "#domain/shared/entity.ts";
import type { Failure } from "#types/failure.ts";
import { Maybe } from "#types/maybe.ts";
import { Category } from "../category.ts";

export class CategoryEntity extends Entity {
  constructor(uuid: string, category: string) {
    super(uuid);

    this.#category = new Category(category);
  }

  #category: Category;
  get category(): string {
    return this.#category.value;
  }
  setCategory(category: string): Maybe<Failure> {
    this.#category = new Category(category);

    return Maybe.nothing();
  }
}
