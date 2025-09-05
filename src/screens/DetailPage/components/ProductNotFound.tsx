import React from "react";
import { StyleSheet, Text, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import colors from "../../../theme/colors";

const ProductNotFound = () => {
  return (
    <View style={styles.container}>
      <MaterialIcons name="block" style={styles.icon} size={60} />
      <Text style={styles.textNotFound}>{"Product\nnot found"}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
    margin: 32,
  },
  icon: {
    textAlign: "center",
  },
  textNotFound: {
    textAlign: "center",
    fontSize: 18,
    color: colors.textSecondary,
  },
});

export default ProductNotFound;
