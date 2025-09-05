import React from "react";
import { Text, TouchableOpacity, View, StyleSheet } from "react-native";
import colors from "../theme/colors";

interface ListHeaderProps {
  header: string;
  onPressSeeAll?: () => void;
  rightComponent?: React.ReactNode;
}

const ListHeader = ({
  header,
  onPressSeeAll,
  rightComponent,
}: ListHeaderProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>{header}</Text>
      {onPressSeeAll ? (
        <TouchableOpacity onPress={onPressSeeAll}>
          <Text style={styles.seeAll}>See All</Text>
        </TouchableOpacity>
      ) : null}
      {rightComponent ? rightComponent : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  header: {
    fontWeight: "700",
  },
  seeAll: {
    textDecorationLine: "underline",
    color: colors.primary,
  },
});

export default ListHeader;
