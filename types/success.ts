export class Success {
  constructor(message: string, code: string) {
    this.#message = message;
    this.#code = code;
  }

  readonly #message: string;
  get message(): string {
    return this.#message;
  }

  readonly #code: string;
  get code(): string {
    return this.#code;
  }

  static empty = new Success("", "");
}
