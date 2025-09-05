import CategoryDomain from "../domain/Category";
import { CategoryRepository } from "../services/CategoryService";

const categoryRepository = new CategoryRepository();

class CategorySingletonContainer {
  private static instance: CategoryDomain | null = null;

  static getInstance() {
    if (!CategorySingletonContainer.instance) {
      CategorySingletonContainer.instance = new CategoryDomain(
        categoryRepository
      );
    }
    return CategorySingletonContainer.instance;
  }
}

export const CategorySingleton = CategorySingletonContainer.getInstance();
