import { Pressable, StyleSheet } from "react-native";
import React from "react";
import { Image } from "expo-image";
import Label from "../Text/Label";
import { FONTS } from "../../constants";

const PrimaryCard = ({
  title,
  imageUrl = "https://image.tmdb.org/t/p/w500/aTPMj3Bqb0WfHsIv8zUOROSjb7S.jpg",
  onPress,
}) => {
  return (
    <Pressable
      style={{
        width: 120,
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        gap: 16,
        display: "inline-flex",
      }}
      onPress={onPress}
    >
      <Image
        style={{ width: 120, height: 160, borderRadius: 8 }}
        source={{ uri: imageUrl }}
      />
      <Label
        style={{ alignSelf: "stretch", color: "#E0E0E0" }}
        lineBreakMode="tail"
        numberOfLines={1}
        variant={FONTS.titleSmall}
      >
        {title}
      </Label>
    </Pressable>
  );
};

export default PrimaryCard;

const styles = StyleSheet.create({});
