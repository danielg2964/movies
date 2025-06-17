import { Uuid } from "./uuid.ts"

export class Entity {
  constructor(uuid: string) {
    this.#uuid = new Uuid (uuid);
  }

  readonly #uuid: Uuid
  get uuid(): string {
    return this.#uuid.value;
  }

  equals(o: Entity) {
    return o.uuid === this.#uuid.value;
  }
}
