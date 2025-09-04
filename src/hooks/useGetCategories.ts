import { useEffect, useState } from "react";
import { Category } from "../data/dtos/CategoryDTO";
import { fetchCategories } from "../domain/Category";

export const useGetCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategoriesData();
  }, []);

  return { categories };
};
