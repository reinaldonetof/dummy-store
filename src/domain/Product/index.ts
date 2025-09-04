import { ProductRequest } from "../../data/dtos/ProductDTO";
import HttpService from "../../services/httpService";

interface FetchProductsParams {
  limit?: number;
  skip?: number;
  order?: "asc" | "desc";
}

const fetchProducts = async (params?: FetchProductsParams) => {
  const queryParams = new URLSearchParams();
  if (params) {
    if (!!params.limit) queryParams.append("limit", params.limit.toString());
    if (!!params.skip) queryParams.append("skip", params.skip.toString());
    if (!!params.order) queryParams.append("order", params.order);
  }

  const url = `/products?${queryParams.toString()}`;
  const response = await HttpService.get<ProductRequest>(url);
  return response.data;
};

export { fetchProducts };
