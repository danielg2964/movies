export class MovieRelease {
  constructor(value: Date) {
    this.#value = value;
  }

  readonly #value: Date;
  get value(): Date {
    return this.#value;
  }
}
