import React, { useRef } from "react";
import { FlatList, ListRenderItem, StyleSheet, View } from "react-native";
import { Category } from "../../../data/dtos/CategoryDTO";
import ListHeader from "../../../components/ListHeader";
import CategoryItem from "../../../components/CategoryItem";
import { useGetCategories } from "../../../hooks/useGetCategories";

export interface CategoriesScrollProps {}

const CategoriesScroll = ({}: CategoriesScrollProps) => {
  const { categories, onSelectCategory } = useGetCategories();
  const flatListRef = useRef<FlatList>(null);

  const handleOnPress = (category: Category) => {
    onSelectCategory(category);
    flatListRef.current?.scrollToIndex({ index: 0, animated: true });
  };

  if (!categories || categories.length === 0) {
    return null;
  }

  const renderItem: ListRenderItem<Category> = ({ item }) => (
    <View style={styles.containerElement}>
      <CategoryItem
        {...item}
        isRow
        onPress={(category) => handleOnPress(category)}
      />
    </View>
  );

  return (
    <View>
      <ListHeader header="Categories" onPressSeeAll={() => {}} />
      <FlatList
        ref={flatListRef}
        data={categories}
        renderItem={renderItem}
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

export default CategoriesScroll;
