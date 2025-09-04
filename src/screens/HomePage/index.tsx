import React from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CategoriesScroll, {
  CategoriesScrollProps,
} from "./components/CategoriesScroll";
import ProductsScroll from "./components/ProductsScroll";

const HomePage = () => {
  const [categorySlug, setCategorySlug] = React.useState<string | undefined>(
    undefined
  );
  const handleOnSelectCategory: CategoriesScrollProps["handleOnSelectCategory"] =
    (category) => {
      setCategorySlug(category.selected ? category.slug : undefined);
    };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <CategoriesScroll handleOnSelectCategory={handleOnSelectCategory} />
        <ProductsScroll categorySlug={categorySlug} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    gap: 8,
  },
});

export default HomePage;
