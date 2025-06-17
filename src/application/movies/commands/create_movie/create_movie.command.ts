export class CreateMovieCommand {
  constructor(name: string, category_uuid: string, release: Date) {
    this.#name = name;
    this.#category_uuid = category_uuid;
    this.#release = release;
  }

  readonly #name: string;
  get name(): string {
    return this.#name;
  }

  readonly #category_uuid: string;
  get category_uuid(): string {
    return this.#category_uuid;
  }

  readonly #release: Date;
  get release(): Date {
    return this.#release;
  }
}
