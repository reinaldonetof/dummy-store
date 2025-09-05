import React from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CategoriesScroll, {
  CategoriesScrollProps,
} from "./components/CategoriesScroll";
import ProductsScroll from "./components/ProductsScroll";
import colors from "../../theme/colors";
import { ProductHome } from "../../data/dtos/ProductDTO";
import { useNavigation } from "@react-navigation/native";

const HomePage = () => {
  const [categorySlug, setCategorySlug] = React.useState<string | undefined>(
    undefined
  );
  const navigation = useNavigation();

  const handleOnSelectCategory: CategoriesScrollProps["handleOnSelectCategory"] =
    (category) => {
      setCategorySlug(category.selected ? category.slug : undefined);
    };

  const handleOnSelectProduct = (product: ProductHome) => {
    navigation.navigate("Detail", { product });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <CategoriesScroll handleOnSelectCategory={handleOnSelectCategory} />
        <ProductsScroll
          categorySlug={categorySlug}
          onPressProduct={handleOnSelectProduct}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    gap: 8,
  },
});

export default HomePage;
