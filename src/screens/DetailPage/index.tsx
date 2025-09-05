import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../../theme/colors";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../routes/navigationType";
import QuantityComponent from "./components/QuantityComponent";
import CarrouselDetailComponent from "./components/CarrouselDetailComponent";
import HeaderNavigation from "./components/HeaderNavigation";
import ButtonShop from "./components/ButtonShop";
import { QuantityProvider } from "./context/QuantityContext";
import { useGetProduct } from "../../hooks/useGetProduct";
import LoadingIndicator from "../../components/LoadingIndicator";
import ProductNotFound from "./components/ProductNotFound";

const DetailPage = () => {
  const { params } = useRoute<RouteProp<RootStackParamList, "Detail">>();
  const productId = params?.product?.id || params.productId;

  const { loadingProduct, product } = useGetProduct({ productId });

  return (
    <QuantityProvider>
      <SafeAreaView style={styles.safeArea}>
        <HeaderNavigation />
        {loadingProduct ? (
          <LoadingIndicator />
        ) : product ? (
          <View style={styles.container}>
            <CarrouselDetailComponent images={product?.images} />
            <View style={styles.contentContainer}>
              <View style={styles.gap4}>
                <Text style={styles.title}>{product?.title}</Text>
                <Text style={styles.brandLabel}>
                  Brand: <Text style={styles.brand}>{product?.brand}</Text>
                </Text>
              </View>
              <Text style={styles.price}>${product?.price}</Text>
              <Text style={styles.description}>{product?.description}</Text>
              <QuantityComponent inStock={product?.stock} />
            </View>
          </View>
        ) : (
          <ProductNotFound />
        )}
        {product ? (
          <ButtonShop
            price={product?.price}
            title={product?.title}
            productId={product.id}
          />
        ) : null}
      </SafeAreaView>
    </QuantityProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  container: {
    flex: 1,
    gap: 8,
  },
  contentContainer: {
    paddingHorizontal: 24,
    gap: 8,
  },
  gap4: {
    gap: 4,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
  brandLabel: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  brand: {
    color: colors.secondary,
    fontWeight: "bold",
  },
  price: {
    fontWeight: "bold",
    color: colors.primary,
    fontSize: 16,
  },
  description: {
    color: colors.textSecondary,
    fontSize: 14,
  },
});

export default DetailPage;
