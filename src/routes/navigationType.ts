import { ProductHome } from "../data/dtos/ProductDTO";

export type RootStackParamList = {
  Home: { categorySlug?: string };
  Detail: { productId?: number; product?: ProductHome };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
