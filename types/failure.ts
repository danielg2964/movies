export class Failure {
  constructor(message: string, code: string, status_code: number) {
    this.#message = message;
    this.#code = code;
    this.#status_code = status_code;
  }

  readonly #message: string;
  get message(): string {
    return this.#message;
  }

  readonly #code: string;
  get code(): string {
    return this.#code;
  }

  readonly #status_code: number;
  get status_code(): number {
    return this.#status_code;
  }
}
