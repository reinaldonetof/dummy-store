import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../../../theme/colors";
import { useQuantity } from "../context/QuantityContext";

export interface ButtonShopProps {
  title?: string;
  price?: number;
}

const ButtonShop = ({ price }: ButtonShopProps) => {
  const { quantity } = useQuantity();
  const value = (price || 0) * (quantity || 0);
  return (
    <TouchableOpacity>
      <View style={styles.buttonContainer}>
        <Text style={styles.price}>${value.toFixed(2)}</Text>
        <Text style={styles.reminder}>{"Create reminder\nto buy"}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 12,
    backgroundColor: colors.primary,
    borderRadius: 999,
    marginHorizontal: 24,
    minHeight: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontWeight: "bold",
    fontSize: 16,
    color: colors.backgroundLight,
  },
  reminder: {
    fontWeight: "bold",
    fontSize: 14,
    color: colors.backgroundLight,
    textAlign: "center",
  },
});

export default ButtonShop;
