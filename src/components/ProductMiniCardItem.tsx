import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Product } from "../data/dtos/ProductDTO";
import colors from "../theme/colors";

export interface ProductMiniCardItemProps extends Product {
  onPress?: (product: Product) => void;
}

const ProductMiniCardItem = ({
  onPress,
  ...product
}: ProductMiniCardItemProps) => {
  const { id, images, title, price, rating } = product;
  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity onPress={() => onPress?.(product)}>
        <View style={styles.contentContainer}>
          <Image
            key={id}
            source={images[0]}
            style={styles.image}
            contentFit="contain"
          />
          <Text numberOfLines={1} style={styles.ratingText}>
            {rating.toFixed(1)}/5
          </Text>
          <Text numberOfLines={2}>{title}</Text>
          <Text numberOfLines={1} style={styles.priceText}>
            ${price}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    padding: 4,
    borderRadius: 8,
    backgroundColor: colors.background,
    width: "48%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  contentContainer: {
    gap: 4,
  },
  image: {
    height: 200,
    width: "100%",
  },
  ratingText: {
    fontVariant: ["tabular-nums"],
  },
  priceText: {
    fontWeight: "600",
  },
});

export default ProductMiniCardItem;
