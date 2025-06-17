import { Entity } from "#domain/shared/entity.ts";
import { Uuid } from "#domain/shared/uuid.ts";
import { Failure } from "#types/failure.ts";
import { Maybe } from "#types/maybe.ts";
import { MovieConstants } from "../constants/movie.constants.ts";
import { MovieName } from "../movie.name.ts";
import { MovieRelease } from "../movie.release.ts";
import type { CategoryEntity } from "./category.entity.ts";

export class MovieEntity extends Entity {
  constructor(
    uuid: string,
    name: string,
    category_uuid: string,
    category: CategoryEntity,
    release: Date
  ) {
    super(uuid);

    this.#name = new MovieName(name);
    this.#category_uuid = new Uuid(category_uuid);
    this.#category = category;
    this.#release = new MovieRelease(release);
    this.#is_new = MovieEntity.isNew(release);
  }

  #name: MovieName;
  get name(): string {
    return this.#name.value;
  }
  setName(name: string): Maybe<Failure> {
    this.#name = new MovieName(name);

    return Maybe.nothing();
  }

  #category_uuid: Uuid;
  get category_uuid(): string {
    return this.#category_uuid.value;
  }

  #category: CategoryEntity;
  get category(): string {
    return this.#category.category;
  }
  setCategory(category: CategoryEntity): Maybe<Failure> {
    if (category.equals(this.#category)) { 
      this.#category = category;
    }

    return Maybe.nothing();
  }

  #release: MovieRelease;
  get release(): Date {
    return this.#release.value;
  }
  setRelease(release: Date): Maybe<Failure> {
    this.#release = new MovieRelease(release);

    return Maybe.nothing();
  }

  readonly #is_new: boolean;
  get is_new(): boolean {
    return this.#is_new;
  }

  static isNew(date: Date): boolean {
    const now = new Date();
    const three_weeks_ago = new Date(now.getTime() - MovieConstants.THREE_WEEKS_MS);

    return date > three_weeks_ago;
  }
}
