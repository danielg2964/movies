export class CreateUserCommand {
  constructor(name: string, password: string) {
    this.#name = name;
    this.#password = password;
  }

  readonly #name: string;
  get name(): string {
    return this.#name;
  }

  readonly #password: string;
  get password(): string {
    return this.#password;
  }
}
