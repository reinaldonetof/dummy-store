import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import colors from "../../../theme/colors";
import { useQuantity } from "../context/QuantityContext";
import { useCalendarReminder } from "../../../../hooks/useCalendarReminder";
import LoadingIndicator from "../../../components/LoadingIndicator";

export interface ButtonShopProps {
  title?: string;
  price?: number;
  productId?: number;
}

const ButtonShop = ({ price, title, productId }: ButtonShopProps) => {
  const {
    hasPermission,
    requestPermission,
    addReminder,
    isLoading,
    isSupported,
  } = useCalendarReminder();
  const { quantity } = useQuantity();
  const value = (price || 0) * (quantity || 0);

  const handleAddReminder = async () => {
    const reminderInFiveMinutes = new Date(
      Date.now() + 5 * 60 * 1000
    ).toISOString();
    await addReminder({
      name: "Buy Product",
      description: `Don't forget to buy ${title} x${quantity} for $${value.toFixed(
        2
      )} from Dummy Store.`,
      reminderDate: reminderInFiveMinutes,
      ...(productId && { url: `dummystore://detail/${productId}` }),
    });
  };

  const onPress = async () => {
    if (!isSupported) {
      Alert.alert(
        "Not Supported",
        "Calendar reminders are only supported on iOS."
      );
      return;
    }

    if (!hasPermission) {
      const result = await requestPermission();
      if (result) handleAddReminder();
      return;
    }

    if (hasPermission) {
      handleAddReminder();
    }
  };

  return (
    <TouchableOpacity disabled={!value || isLoading} onPress={() => onPress()}>
      <View style={styles.buttonContainer}>
        {isLoading ? (
          <LoadingIndicator />
        ) : (
          <>
            <Text style={styles.price}>${value.toFixed(2)}</Text>
            <Text style={styles.reminder}>{"Create reminder\nto buy"}</Text>
          </>
        )}
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
    minHeight: 74,
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
