export class MovieName {
  constructor(value: string) {
    this.#value = value;
  }

  readonly #value: string;
  get value(): string {
    return this.#value;
  }
}
