import React from "react";
import { StyleSheet, View } from "react-native";
import TouchIcon from "../../../components/TouchIcon";
import colors from "../../../theme/colors";
import { useNavigation } from "@react-navigation/native";

const HeaderNavigation = () => {
  const navigation = useNavigation();

  return (
    <View
      style={[styles.containerHeaderNavigation, styles.contentContainerPadding]}
    >
      <TouchIcon
        name="chevron-back"
        color={colors.primary}
        onPress={() => navigation.goBack()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerHeaderNavigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  contentContainerPadding: {
    paddingHorizontal: 24,
  },
});

export default HeaderNavigation;
