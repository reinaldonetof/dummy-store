import {
  FetchProductsByCategoryParams,
  FetchProductsParams,
  ProductRepositoryInterface,
} from "../../services/ProductService";

export default class ProductDomain {
  constructor(private repo: ProductRepositoryInterface) {}

  private async fetchProducts(params?: FetchProductsParams) {
    const products = await this.repo.fetchProducts(params);
    return products;
  }

  private async fetchProductsByCategory(
    params?: FetchProductsByCategoryParams
  ) {
    const products = await this.repo.fetchProductsByCategory(params);
    return products;
  }

  public async fetchProductsWithParams(
    params: FetchProductsByCategoryParams | FetchProductsParams
  ) {
    if ("category" in params && params?.category) {
      return this.fetchProductsByCategory(params);
    }
    return this.fetchProducts(params);
  }
}
