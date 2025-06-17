import type { Repository } from "#application/shared/repository.ts";
import type { CategoryEntity } from "#domain/movies/entities/category.entity.ts";
import type { Maybe } from "#types/maybe.ts";

export interface CategoryRepository extends Repository<CategoryEntity> {
  findByName(name: string): Promise<Maybe<CategoryEntity>>;
}
