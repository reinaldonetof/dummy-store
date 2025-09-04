import { useEffect, useState } from "react";
import { Category } from "../data/dtos/CategoryDTO";
import { CategorySingleton } from "../singletons/Category";

export const useGetCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const categoriesData = await CategorySingleton.fetchCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    if (CategorySingleton.getCategoriesDefault().length > 0) return;
    fetchCategoriesData();
  }, []);

  const onSelectCategory = (categorySelected: Category) => {
    const sortedCategories =
      CategorySingleton.selectingCategory(categorySelected);
    setCategories(sortedCategories);
  };

  return { categories, onSelectCategory };
};
