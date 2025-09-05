import { Category, CategoryDTO } from "../data/dtos/CategoryDTO";
import { mapCategory } from "../data/mappers/categoryMapper";
import HttpService from "./httpService";

export interface CategoryRepositoryInterface {
  getCategories(): Promise<Category[]>;
}

export class CategoryRepository implements CategoryRepositoryInterface {
  async getCategories(): Promise<Category[]> {
    const { data } = await HttpService.get<CategoryDTO[]>(
      "/products/categories"
    );
    if (!Array.isArray(data)) throw new Error("Invalid categories response");
    return data.map(mapCategory);
  }
}
