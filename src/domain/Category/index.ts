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

  public getSortedCategories() {
    const catDefault = this.getCategoriesDefault();
    const catSelected = this.getCategorySelected();
    if (catSelected && catDefault.length > 0) {
      const newSortCategories: Category[] = [
        { ...catSelected, selected: true },
      ];
      this.categoriesDefault.forEach((cat) => {
        if (cat.slug !== catSelected.slug) newSortCategories.push(cat);
      });
      return newSortCategories;
    }
    return catDefault;
  }

  public selectingCategory(categorySelected: Category) {
    const isDeselecting = this.categorySelected?.slug === categorySelected.slug;
    this.setCategorySelected(isDeselecting ? null : categorySelected);
    return isDeselecting ? this.categoriesDefault : this.getSortedCategories();
  }

  public async fetchCategories() {
    const categories = await this.repo.getCategories();
    this.setCategoriesDefault(categories);
    return this.getCategoriesDefault();
  }
}
