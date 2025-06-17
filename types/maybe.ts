export class Maybe<T> {
  private constructor(value: T | null) {
    if (value !== null) {
      this.#value = value;
      this.#has_value = true
    }
  }

  readonly #value: T = null!
  get value(): T {
    return this.#value;
  }

  readonly #has_value: boolean = false
  get has_value(): boolean {
    return this.#has_value;
  }

  static some<T>(value: T): Maybe<T> {
    return new Maybe(value);
  }
  
  static nothing<T>(): Maybe<T> {
    return new Maybe(null!);
  }
}
