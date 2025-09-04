import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import ListHeader from "../../../components/ListHeader";
import { Product } from "../../../data/dtos/ProductDTO";
import { fetchProducts } from "../../../domain/Product";
import ProductMiniCardItem from "../../../components/ProductMiniCardItem";

// import { Container } from './styles';

const ProductsScroll: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  //   console.log("🚀 ~ ProductsScroll ~ products:", products);

  useEffect(() => {
    fetchProducts()
      .then((p) => setProducts(p.products))
      .catch((e) => console.log(e));
  }, []);

  return (
    <>
      <ListHeader header="Products" />
      <FlatList
        data={products}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({ item }) => <ProductMiniCardItem {...item} />}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.contentContainerStyle}
        columnWrapperStyle={styles.columnWrapperStyle}
      />
    </>
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    gap: 8,
    marginHorizontal: 4,
  },
  columnWrapperStyle: {
    justifyContent: "space-between",
  },
});

export default ProductsScroll;
