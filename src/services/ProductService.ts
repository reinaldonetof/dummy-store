import { ProductRequest } from "../data/dtos/ProductDTO";
import HttpService from "./httpService";

export interface FetchProductsParams {
  limit?: number;
  skip?: number;
  order?: "asc" | "desc";
}

export interface FetchProductsByCategoryParams extends FetchProductsParams {
  category: string;
}

export interface ProductRepositoryInterface {
  fetchProducts(params?: FetchProductsParams): Promise<ProductRequest>;
  fetchProductsByCategory(
    params?: FetchProductsByCategoryParams
  ): Promise<ProductRequest>;
}

export class ProductRepository implements ProductRepositoryInterface {
  async fetchProducts(params?: FetchProductsParams): Promise<ProductRequest> {
    const queryParams = new URLSearchParams();
    if (params) {
      if (!!params.limit) queryParams.append("limit", params.limit.toString());
      if (!!params.skip) queryParams.append("skip", params.skip.toString());
      if (!!params.order) queryParams.append("order", params.order);
    }

    const url = `/products?${queryParams.toString()}`;
    const response = await HttpService.get<ProductRequest>(url);
    return response.data;
  }

  async fetchProductsByCategory(
    params: FetchProductsByCategoryParams
  ): Promise<ProductRequest> {
    const queryParams = new URLSearchParams();
    if (params) {
      if (!!params.limit) queryParams.append("limit", params.limit.toString());
      if (!!params.skip) queryParams.append("skip", params.skip.toString());
      if (!!params.order) queryParams.append("order", params.order);
    }

    const url = `/products/category/${
      params?.category
    }?${queryParams.toString()}`;
    const response = await HttpService.get<ProductRequest>(url);
    return response.data;
  }
}
