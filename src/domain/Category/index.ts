import { Category } from "../../data/dtos/CategoryDTO";
import HttpService from "../../services/httpService";

const fetchCategories = async () => {
  const response = await HttpService.get<Category[]>("/products/categories");
  console.log("🚀 ~ fetchCategories ~ response:", response);
  return response.data;
};

export { fetchCategories };
