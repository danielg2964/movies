import { Failure } from "#types/failure.ts";

export class CategoryFailures {
  static readonly CATEGORY_NOT_FOUND = new Failure("Category not found", "CATEGORY_NOT_FOUND", 404);
}
