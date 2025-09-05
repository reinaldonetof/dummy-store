import React, { useEffect, useRef } from "react";
import { FlatList, ListRenderItem, StyleSheet, View } from "react-native";
import { Category } from "../../../data/dtos/CategoryDTO";
import ListHeader from "../../../components/ListHeader";
import CategoryItem from "../../../components/CategoryItem";
import { useGetCategories } from "../../../hooks/useGetCategories";
import LoadingIndicator from "../../../components/LoadingIndicator";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../../routes/navigationType";

export interface CategoriesScrollProps {
  handleOnSelectCategory?: (category: Category) => void;
}

const CategoriesScroll = ({
  handleOnSelectCategory,
}: CategoriesScrollProps) => {
  const { categories, onSelectCategory } = useGetCategories();
  const flatListRef = useRef<FlatList>(null);
  const { params } = useRoute<RouteProp<RootStackParamList, "Home">>();
  const categorySlugParam = useRef<string | null>(null);

  useEffect(() => {
    if (params?.categorySlug) {
      categorySlugParam.current = params.categorySlug;
    }
  }, [params?.categorySlug]);

  useEffect(() => {
    if (categorySlugParam.current) {
      const selectedCategory = categories.find(
        (cat) => cat.slug === categorySlugParam.current
      );
      if (selectedCategory) {
        categorySlugParam.current = "";
        handleOnPress(selectedCategory);
      }
    }
  }, [categorySlugParam.current, categories]);

  const handleOnPress = (category: Category) => {
    handleOnSelectCategory?.({ ...category, selected: !category.selected });
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
        ListEmptyComponent={<LoadingIndicator />}
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
