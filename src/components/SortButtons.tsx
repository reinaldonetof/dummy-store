import React from "react";
import { View, StyleSheet } from "react-native";
import TouchIcon from "./TouchIcon";
import { SortOrder } from "../hooks/useGetProducts";
import colors from "../theme/colors";

interface SortButtonsProps {
  sortOrder: SortOrder;
  onSortChange: (order: SortOrder) => void;
}

const SortButtons = ({ sortOrder, onSortChange }: SortButtonsProps) => {
  return (
    <View style={styles.container}>
      <TouchIcon
        name="arrow-up"
        color={sortOrder === "asc" ? colors.primary : colors.textThird}
        onPress={() => onSortChange(sortOrder === "asc" ? null : "asc")}
      />
      <TouchIcon
        name="arrow-down"
        color={sortOrder === "desc" ? colors.primary : colors.textThird}
        onPress={() => onSortChange(sortOrder === "desc" ? null : "desc")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 4,
  },
});

export default SortButtons;
