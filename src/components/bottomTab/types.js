const TabElementDisplayOptions = {
  ICON_ONLY: "icon-only",
  LABEL_ONLY: "label-only",
  BOTH: "both",
};

const DotSize = {
  SMALL: "small",
  MEDIUM: "medium",
  LARGE: "large",
  DEFAULT: "default",
};

const TabButtonLayout = {
  VERTICAL: "vertical",
  HORIZONTAL: "horizontal",
};

const defaultAppearance = {
  topPadding: 0,
  bottomPadding: 0,
  horizontalPadding: 0,
  tabBarBackground: "",
  floating: false,
  dotCornerRadius: 0,
  whenActiveShow: TabElementDisplayOptions.BOTH,
  whenInactiveShow: TabElementDisplayOptions.ICON_ONLY,
  dotSize: DotSize.DEFAULT,
  shadow: false,
  tabButtonLayout: TabButtonLayout.HORIZONTAL,
};

// types.js
export { DotSize, TabButtonLayout, TabElementDisplayOptions, defaultAppearance };