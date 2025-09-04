import {
  FetchProductsParams,
  ProductRepositoryInterface,
} from "../../services/ProductService";

export default class ProductDomain {
  constructor(private repo: ProductRepositoryInterface) {}

  public async fetchProducts(params?: FetchProductsParams) {
    const products = await this.repo.getProducts(params);
    return products;
  }
}
