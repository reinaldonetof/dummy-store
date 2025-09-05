import React from "react";
import { StyleSheet, Text, View } from "react-native";
import colors from "../../../theme/colors";
import TouchIcon from "../../../components/TouchIcon";
import { useQuantity } from "../context/QuantityContext";

export interface QuantityComponentProps {
  inStock?: number;
}

const QuantityComponent = ({ inStock }: QuantityComponentProps) => {
  const { quantity, setQuantity } = useQuantity();

  const increment = () => setQuantity(quantity + 1);
  const decrement = () => setQuantity(quantity - 1);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Quantity</Text>
      <View style={styles.row}>
        <TouchIcon
          name="add-circle"
          color={colors.primary}
          size={30}
          disabled={!inStock || quantity === inStock}
          onPress={increment}
        />
        <Text style={styles.quantity}>{quantity}</Text>
        <TouchIcon
          name="remove-circle"
          color={colors.primary}
          size={30}
          disabled={!inStock || quantity === 0}
          onPress={decrement}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderRadius: 99,
    backgroundColor: colors.background,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  label: {
    fontWeight: "500",
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  quantity: {
    marginHorizontal: 8,
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default QuantityComponent;
