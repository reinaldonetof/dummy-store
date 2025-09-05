import { Category, CategoryDTO } from "../dtos/CategoryDTO";

export function mapCategory(category: CategoryDTO): Category {
  return { ...category, selected: false };
}
