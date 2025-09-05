import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import colors from "../../../theme/colors";
import { Image } from "expo-image";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export interface CarrouselDetailComponentProps {
  images?: string[];
}

const CarrouselDetailComponent = ({
  images,
}: CarrouselDetailComponentProps) => {
  return (
    <View style={styles.containerImageContent}>
      {images && images.length > 0 ? (
        <FlatList
          data={images}
          keyExtractor={(item) => `${item}`}
          renderItem={({ item }) => (
            <Image source={item} contentFit="contain" style={styles.image} />
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerPadding}
          scrollEnabled={images.length > 1}
        />
      ) : (
        <View style={[styles.image, styles.containerImageContent]}>
          <MaterialIcons name="hide-image" size={60} color={colors.secondary} />
          <Text style={styles.textNotFound}>{"Image not\nfound"}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  containerImageContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainerPadding: {
    paddingHorizontal: 24,
  },
  image: {
    height: 248,
    width: 161,
    backgroundColor: colors.background,
    marginRight: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  textNotFound: {
    textAlign: "center",
    fontSize: 18,
    color: colors.textSecondary,
  },
});

export default CarrouselDetailComponent;
