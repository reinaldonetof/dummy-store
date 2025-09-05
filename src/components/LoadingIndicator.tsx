import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import colors from "../theme/colors";

const LoadingIndicator = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={"large"} color={colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default LoadingIndicator;
