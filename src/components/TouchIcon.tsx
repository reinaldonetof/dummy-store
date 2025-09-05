import React, { ComponentProps } from "react";
import { TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import colors from "../theme/colors";

export interface TouchIconProps extends ComponentProps<typeof Ionicons> {
  onPress?: () => void;
  disabled?: boolean;
}

const TouchIcon = ({ onPress, disabled, ...iconProps }: TouchIconProps) => {
  return (
    <TouchableOpacity onPress={() => onPress?.()} disabled={disabled}>
      <View
        style={{
          backgroundColor: colors.background,
          height: 40,
          width: 40,
          borderRadius: 20,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Ionicons size={18} {...iconProps} />
      </View>
    </TouchableOpacity>
  );
};

export default TouchIcon;
