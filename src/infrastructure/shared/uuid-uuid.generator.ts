import type { UuidGenerator } from "#application/shared/uuid.generator.ts";
import { v4 } from "uuid";

export class UuidUuidGenerator implements UuidGenerator {
  generateUuid(): string {
    return v4();
  }
}
