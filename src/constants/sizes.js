import { Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const screenWidth = Dimensions.get("screen").width;
const screenHeight = Dimensions.get("screen").height;

export const SIZES = {
  // global sizes
  base: 20,
  padding1: 4,
  padding2: 8,
  padding3: 12,
  padding4: 16,
  padding5: 20,
  padding6: 24,
  padding7: 28,
  padding8: 32,

  // app dimensions
  windowWidth,
  windowHeight,
  screenWidth,
  screenHeight,
};