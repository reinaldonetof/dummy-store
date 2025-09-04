import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ListHeader from "../../components/ListHeader";
import CategoryItem from "../../components/CategoryItem";
import { fetchProducts } from "../../domain/Product";
import { useGetCategories } from "../../hooks/useGetCategories";

const HomePage: React.FC = () => {
  //   const { categories } = useGetCategories();

  //   useEffect(() => {
  //     fetchProducts();
  //   }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ListHeader header="Categories" onPressSeeAll={() => {}} />
        <CategoryItem
          name="Beauty"
          slug="beauty"
          url="https://dummyjson.com/products/category/beauty"
          isRow
        />
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
  },
});

export default HomePage;
