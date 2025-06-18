import argon2 from "argon2";

import type { Hasher } from "#application/shared/hasher.ts";

export class Argon2Hasher implements Hasher {
  hash(plain: string): Promise<string> {
    return argon2.hash(plain);
  }
}
