import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import ListHeader from "../../../components/ListHeader";
import ProductMiniCardItem from "../../../components/ProductMiniCardItem";
import SortButtons from "../../../components/SortButtons";
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
    sortOrder,
    changeSortOrder,
  } = useGetProducts({ categorySlug });

  const onEndReached = () => {
    if (!loadingProducts) {
      nextPage();
    }
  };

  const RightComponent = () => {
    if (productsRequest?.total) {
      return (
        <View style={styles.rightComponentContainer}>
          <Text style={styles.productCount}>
            {currentProductsShowingValue}/{productsRequest.total} Products
          </Text>
          <SortButtons sortOrder={sortOrder} onSortChange={changeSortOrder} />
        </View>
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
  rightComponentContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  productCount: {
    fontSize: 12,
  },
});

export default ProductsScroll;