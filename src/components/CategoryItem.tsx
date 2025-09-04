import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { Category } from "../data/dtos/CategoryDTO";
import colors from "../theme/colors";

export interface CategoryItemProps extends Category {
  onPress?: (slug: string) => void;
  isRow?: boolean;
}

const CategoryItem = ({ name, slug, onPress, isRow }: CategoryItemProps) => {
  return (
    <TouchableOpacity
      style={[styles.container, isRow && styles.containerRow]}
      onPress={() => onPress?.(slug)}
    >
      <Text numberOfLines={1} style={styles.categoryText}>
        {name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 8,
  },
  containerRow: {
    maxWidth: 64,
    minWidth: 32,
    padding: 8,
  },
  categoryText: {
    fontWeight: "500",
  },
});

export default CategoryItem;
