import { Category } from "../../data/dtos/CategoryDTO";
import { CategoryRepositoryInterface } from "../../services/CategoryService";

export default class CategoryDomain {
  private categorySelected: Category | null = null;
  private categoriesDefault: Category[] = [];

  constructor(private repo: CategoryRepositoryInterface) {}

  public getCategoriesDefault() {
    return this.categoriesDefault;
  }

  public setCategoriesDefault(categories: Category[]) {
    this.categoriesDefault = categories;
    this.categorySelected = null;
  }

  public getCategorySelected() {
    return this.categorySelected;
  }

  public setCategorySelected(category: Category | null) {
    this.categorySelected = category;
  }

  public selectingCategory(categorySelected: Category) {
    if (this.categorySelected?.slug === categorySelected.slug) {
      this.setCategorySelected(null);
      return this.categoriesDefault;
    }

    this.setCategorySelected(categorySelected);
    const newSortCategories: Category[] = [
      { ...categorySelected, selected: true },
    ];
    this.categoriesDefault.forEach((cat) => {
      if (cat.slug !== categorySelected.slug) newSortCategories.push(cat);
    });
    return newSortCategories;
  }

  public async fetchCategories() {
    const categories = await this.repo.getCategories();
    this.setCategoriesDefault(categories);
    return this.getCategoriesDefault();
  }
}
