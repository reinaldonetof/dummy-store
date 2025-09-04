import React, { useRef } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Category } from "../../../data/dtos/CategoryDTO";
import ListHeader from "../../../components/ListHeader";
import CategoryItem from "../../../components/CategoryItem";
import { useGetCategories } from "../../../hooks/useGetCategories";

export interface CategoryScrollProps {}

const CategoryScroll = ({}: CategoryScrollProps) => {
  const { categories, onSelectCategory } = useGetCategories();
  const flatListRef = useRef<FlatList>(null);

  const handleOnPress = (category: Category) => {
    onSelectCategory(category);
    flatListRef.current?.scrollToIndex({ index: 0, animated: true });
  };

  if (!categories || categories.length === 0) {
    return null;
  }

  return (
    <View>
      <ListHeader header="Categories" onPressSeeAll={() => {}} />
      <FlatList
        ref={flatListRef}
        data={categories}
        renderItem={({ item }) => (
          <View style={styles.containerElement}>
            <CategoryItem
              {...item}
              isRow
              onPress={(category) => handleOnPress(category)}
            />
          </View>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerElement: {
    marginRight: 8,
  },
});

export default CategoryScroll;
