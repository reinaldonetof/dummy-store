import React from "react";
import { FlatList, StyleSheet, Text } from "react-native";
import ListHeader from "../../../components/ListHeader";
import ProductMiniCardItem from "../../../components/ProductMiniCardItem";
import { useGetProducts } from "../../../hooks/useGetProducts";
import LoadingIndicator from "../../../components/LoadingIndicator";
import { ProductHome } from "../../../data/dtos/ProductDTO";

interface ProductsScrollProps {
  categorySlug?: string;
  onPressProduct?: (product: ProductHome) => void;
}

const ProductsScroll = ({
  categorySlug,
  onPressProduct,
}: ProductsScrollProps) => {
  const {
    loadingProducts,
    productsRequest,
    nextPage,
    currentProductsShowingValue,
    loadingNewProducts,
  } = useGetProducts({ categorySlug });

  const onEndReached = () => {
    if (!loadingProducts) {
      nextPage();
    }
  };

  const RightComponent = () => {
    if (productsRequest?.total) {
      return (
        <>
          <Text>
            {currentProductsShowingValue}/{productsRequest.total} Products
          </Text>
        </>
      );
    }
    return null;
  };

  return (
    <>
      <ListHeader header="Products" rightComponent={<RightComponent />} />
      {loadingNewProducts ? (
        <LoadingIndicator />
      ) : (
        <FlatList
          data={productsRequest?.products}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item }) => (
            <ProductMiniCardItem
              {...item}
              onPress={() => onPressProduct?.(item)}
            />
          )}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}
          columnWrapperStyle={styles.columnWrapperStyle}
          onEndReached={onEndReached}
          ListFooterComponent={loadingProducts ? <LoadingIndicator /> : null}
          onEndReachedThreshold={0.5}
        />
      )}
    </>
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    gap: 8,
    marginHorizontal: 4,
  },
  columnWrapperStyle: {
    justifyContent: "space-between",
  },
});

export default ProductsScroll;
