export class CategoryDto {
  constructor(uuid: string, name: string) {
    this.uuid = uuid;
    this.name = name;
  }

  readonly uuid: string;
  readonly name: string;
}
