import React, { useState } from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { Category } from "../data/dtos/CategoryDTO";
import colors from "../theme/colors";

export interface CategoryItemProps extends Category {
  onPress?: (category: Category) => void;
  isRow?: boolean;
}

const CategoryItem = ({ isRow, onPress, ...cat }: CategoryItemProps) => {
  const handleOnPress = () => {
    onPress?.(cat);
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        isRow && styles.containerRow,
        cat.selected && styles.selected,
      ]}
      onPress={() => handleOnPress()}
    >
      <Text numberOfLines={1} style={styles.categoryText}>
        {cat.name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    padding: 16,
    borderRadius: 8,
    borderColor: colors.primary,
    borderWidth: StyleSheet.hairlineWidth,
  },
  selected: {
    backgroundColor: colors.primary,
  },
  containerRow: {
    maxWidth: 128,
    minWidth: 64,
    padding: 8,
  },
  categoryText: {
    fontWeight: "500",
  },
});

export default CategoryItem;
