import { CategoryDto } from "./category.dto.ts";

export class MovieDto {
  constructor(uuid: string, name: string, category_uuid: string, category: CategoryDto, release: Date) {
    this.uuid = uuid;
    this.name = name;
    this.category_uuid = category_uuid;
    this.category = category;
    this.release = release;
  }

  readonly uuid: string;
  readonly name: string;
  readonly category_uuid: string;
  readonly category: CategoryDto;
  readonly release: Date;
}
