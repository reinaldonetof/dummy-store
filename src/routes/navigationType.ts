import { ProductHome } from "../data/dtos/ProductDTO";

export type RootStackParamList = {
  Home: undefined;
  Detail: { productId?: number; product?: ProductHome };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
