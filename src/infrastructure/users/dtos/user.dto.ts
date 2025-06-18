import type { WatchedDto } from "./watched.dto.ts";

export class UserDto {
  constructor(uuid: string, name: string, watched: WatchedDto[]) {
    this.uuid = uuid;
    this.name = name;
    this.watched = watched;
  }

  readonly uuid: string;
  readonly name: string;
  readonly watched: WatchedDto[];
}
