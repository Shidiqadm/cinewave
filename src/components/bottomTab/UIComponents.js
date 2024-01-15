import { Animated } from "react-native";
import Styled, { css } from "styled-components/native";
import { DotSize, TabButtonLayout, TabElementDisplayOptions } from "./types";
import { isIphoneX } from "./utils/iPhoneX";

// Config
const BOTTOM_PADDING = 20;
const BOTTOM_PADDING_IPHONE_X = 30;

const floatingMarginBottom = css`
  margin-bottom: ${isIphoneX() ? BOTTOM_PADDING_IPHONE_X : BOTTOM_PADDING}px;
`;
const floatingMarginHorizontal = css`
  margin-horizontal: 20px;
`;

const floatingRoundCorner = css`
  border-radius: 40px;
`;

const BottomTabBarWrapper = Styled.View`
	flex-direction: row;
	${(p) => p.floating && floatingMarginHorizontal};
    elevation: 2;
	${(p) => p.floating && floatingMarginBottom};
	${(p) => p.floating && floatingRoundCorner};
  padding-bottom: ${(p) =>
    p.floating
      ? p.bottomPadding
      : isIphoneX()
      ? BOTTOM_PADDING_IPHONE_X + p.bottomPadding
      : p.bottomPadding}px;
  padding-top: ${(p) => p.topPadding}px;
  padding-horizontal: ${(p) => p.horizontalPadding}px;
  background-color: ${(p) => p.tabBarBackground};
	${(p) => p.shadow && SHADOW};
`;

const calculateDotSize = (size) => {
  switch (size) {
    case DotSize.SMALL:
      return 40;
    case DotSize.MEDIUM:
      return 10;
    case DotSize.LARGE:
      return 5;
    default:
      return 10;
  }
};

const TabButton = Styled.TouchableOpacity`
	flex: 1;
	flex-direction: ${(p) =>
    p.tabButtonLayout == TabButtonLayout.VERTICAL
      ? "column"
      : p.tabButtonLayout == TabButtonLayout.HORIZONTAL
      ? "row"
      : "row"};
	justify-content: center;
	align-items: center;
	border-radius: 100px;
	padding-vertical: 10px;
	flex-grow: ${(p) =>
    p.focused ? p.labelLength / calculateDotSize(p.dotSize) + 1 : 1};
`;

const Label = Styled(Animated.Text)`
	fontSize: ${(p) =>
    p.whenInactiveShow == TabElementDisplayOptions.BOTH ||
    p.whenActiveShow == TabElementDisplayOptions.BOTH
      ? "14"
      : "17"}px;
	color: ${(p) => p.activeColor};
	margin-left: ${(p) =>
    (p.whenActiveShow == TabElementDisplayOptions.BOTH ||
      p.whenInactiveShow == TabElementDisplayOptions.BOTH) &&
    p.tabButtonLayout == TabButtonLayout.HORIZONTAL
      ? 8
      : 0}px;
`;

const Dot = Styled(Animated.View)`
	position: absolute;
	top: ${(p) => p.topPadding}px;
	width: ${(p) => p.width}px;
	height: ${(p) => p.height}px;
	border-radius: ${(p) => p.dotCornerRadius}px;
	background-color: ${(p) => p.activeTabBackground};
	z-index: -1;
`;

const SHADOW = css`
  shadow-color: #000000;
  shadow-offset: 0px 5px;
  shadow-opacity: 0.05;
  elevation: 1;
  shadow-radius: 20px;
`;

export { BottomTabBarWrapper, TabButton, Label, Dot, SHADOW };
