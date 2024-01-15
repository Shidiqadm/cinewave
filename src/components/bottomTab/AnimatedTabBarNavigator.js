import React from "react";
import {
  TabRouter,
  createNavigatorFactory,
  useNavigationBuilder,
} from "@react-navigation/native";
import TabBarElement from "./TabBarElement";
import { DotSize, TabButtonLayout, TabElementDisplayOptions } from "./types";

const defaultAppearance = {
  topPadding: 10,
  bottomPadding: 10,
  horizontalPadding: 10,
  tabBarBackground: "#FFFFFF",
  floating: false,
  dotCornerRadius: 100,
  whenActiveShow: TabElementDisplayOptions.BOTH,
  whenInactiveShow: TabElementDisplayOptions.ICON_ONLY,
  shadow: false,
  dotSize: DotSize.DEFAULT,
  tabButtonLayout: TabButtonLayout.HORIZONTAL,
  activeColors: undefined,
  activeTabBackgrounds: undefined,
};

const defaultTabBarOptions = {
  activeTintColor: "black",
  inactiveTintColor: "black",
  activeBackgroundColor: "#FFCF64",
  labelStyle: {
    fontWeight: "bold",
  },
};

const BottomTabNavigator = ({
  initialRouteName,
  backBehavior,
  children,
  screenOptions,
  tabBarOptions,
  appearance,
  ...rest
}) => {
  const { state, descriptors, navigation } = useNavigationBuilder(TabRouter, {
    initialRouteName,
    backBehavior,
    children,
    screenOptions,
  });

  const finalAppearance = {
    ...defaultAppearance,
    ...appearance,
  };

  const finalTabBarOptions = {
    ...defaultTabBarOptions,
    ...tabBarOptions,
  };

  return (
    <TabBarElement
      {...rest}
      state={state}
      navigation={navigation}
      descriptors={descriptors}
      tabBarOptions={finalTabBarOptions}
      appearance={finalAppearance}
    />
  );
};

BottomTabNavigator.defaultProps = {
  lazy: true,
};

export default createNavigatorFactory(BottomTabNavigator);