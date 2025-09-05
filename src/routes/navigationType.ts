import { ProductDTO } from "../data/dtos/ProductDTO";

export type RootStackParamList = {
  Home: undefined;
  Detail: { productId?: number; product?: ProductDTO };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
