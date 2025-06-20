import { randomUUID } from "node:crypto";
import type { UuidGenerator } from "#application/shared/uuid.generator.ts";

export class CryptoUuidGenerator implements UuidGenerator {
  generateUuid(): string { 
    return randomUUID();
  }
}
