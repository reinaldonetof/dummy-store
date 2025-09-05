import React from "react";
import { StyleSheet, View } from "react-native";
import { ProductDTO } from "../../data/dtos/ProductDTO";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../../theme/colors";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../routes/navigationType";

const DetailPage = () => {
  const { params } = useRoute<RouteProp<RootStackParamList, "Detail">>();
  const product = params?.product;
  console.log("🚀 ~ DetailPage ~ product:", product);
  const productId = params?.productId;
  console.log("🚀 ~ DetailPage ~ productId:", productId);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}></View>
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

export default DetailPage;
