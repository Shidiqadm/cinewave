import React, { useEffect, useState } from "react";
import {
  Animated,
  BackHandler,
  Dimensions,
  I18nManager,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import {
  CommonActions,
  Descriptor,
  NavigationState,
  PartialState,
  Route,
  TabNavigationState,
} from "@react-navigation/native";
import { ScreenContainer } from "react-native-screens";
import ResourceSavingScene from "./ResourceSavingScene";
import { IAppearanceOptions, TabElementDisplayOptions } from "./types";
import { BottomTabBarWrapper, Dot, Label, TabButton } from "./UIComponents";

const TabBarElement = ({
  state,
  navigation,
  descriptors,
  appearance,
  tabBarOptions,
  lazy,
}) => {
  const {
    topPadding,
    bottomPadding,
    horizontalPadding,
    tabBarBackground,
    activeTabBackgrounds,
    activeColors,
    floating,
    dotCornerRadius,
    whenActiveShow,
    whenInactiveShow,
    dotSize,
    shadow,
    tabButtonLayout,
  } = appearance;

  const {
    activeTintColor,
    inactiveTintColor,
    activeBackgroundColor,
    tabStyle,
    labelStyle,
  } = tabBarOptions;

  const [prevPos, setPrevPos] = useState(horizontalPadding);
  const [pos, setPos] = useState(prevPos);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const [animatedPos] = useState(() => new Animated.Value(1));
  const [loaded, setLoaded] = useState([state.index]);
  const [isPortrait, setIsPortrait] = useState(true);

  const didChangeToPortrait = () => {
    const dim = Dimensions.get("screen");
    return dim.height >= dim.width;
  };

  const updatePrevPos = () => {
    setPos((pos) => {
      setPrevPos(pos);
      return pos;
    });
    animatedPos.setValue(0);
  };

  Dimensions.addEventListener("change", () => {
    if (
      (isPortrait && !didChangeToPortrait()) ||
      (!isPortrait && didChangeToPortrait())
    ) {
      setIsPortrait(!isPortrait);
      animation(animatedPos).start(() => {
        updatePrevPos();
      });
    }
  });

  const animation = (val) =>
    Animated.spring(val, {
      toValue: 1,
      useNativeDriver: false,
    });

  const handleBackPress = () => {
    animation(animatedPos).start(() => {
      updatePrevPos();
    });
    return false;
  };

  useEffect(() => {
    animation(animatedPos).start(() => {
      updatePrevPos();
    });

    if (Platform.OS === "android") {
      BackHandler.addEventListener("hardwareBackPress", handleBackPress);
    }

    return () => {
      if (Platform.OS === "android") {
        BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
      }
    };
  }, []);

  useEffect(() => {
    animation(animatedPos).start(() => {
      updatePrevPos();
    });
  }, [state.index]);

  useEffect(() => {
    const { index } = state;
    setLoaded(loaded.includes(index) ? loaded : [...loaded, index]);
  }, [state]);

  const activeTabBackground = activeTabBackgrounds
    ? Array.isArray(activeTabBackgrounds)
      ? activeTabBackgrounds[state.index] || activeBackgroundColor
      : activeTabBackgrounds
    : activeBackgroundColor;

  const activeColor = activeColors
    ? Array.isArray(activeColors)
      ? activeColors[state.index] || activeTintColor
      : activeColors
    : activeTintColor;

  const createTab = (route, routeIndex) => {
    const focused = routeIndex === state.index;
    const { options } = descriptors[route.key];
    const tintColor = focused ? activeColor : inactiveTintColor;
    const icon = options.tabBarIcon;
    const label =
      options.tabBarLabel !== undefined
        ? options.tabBarLabel
        : options.title !== undefined
        ? options.title
        : route.name;
    const accessibilityLabel =
      options.tabBarAccessibilityLabel !== undefined
        ? options.tabBarAccessibilityLabel
        : typeof label === "string"
        ? `${label}, tab, ${routeIndex + 1} of ${state.routes.length}`
        : undefined;

    const renderLabel = () => {
      if (typeof label === "string") {
        return (
          <Label
            tabButtonLayout={tabButtonLayout}
            whenActiveShow={whenActiveShow}
            whenInactiveShow={whenInactiveShow}
            style={labelStyle}
            activeColor={tintColor}
          >
            {label}
          </Label>
        );
      } else {
        return label({ focused, color: activeColor });
      }
    };

    const renderIcon = () => {
      if (icon === undefined) {
        return null;
      }

      let defaultIconSize = 20;
      return icon({ focused, color: tintColor, size: defaultIconSize });
    };

    const onPress = () => {
      animation(animatedPos).start(() => {
        updatePrevPos();
      });

      const event = navigation.emit({
        type: "tabPress",
        target: route.key,
        canPreventDefault: true,
      });

      if (!focused && !event.defaultPrevented) {
        navigation.dispatch({
          ...CommonActions.navigate(route.name),
          target: state.key,
        });
      }
    };

    const onLongPress = () => {
      animation(animatedPos).start(() => {
        updatePrevPos();
      });

      navigation.emit({
        type: "tabLongPress",
        target: route.key,
      });
    };

    const onLayout = (e) => {
      if (focused) {
        setPos(e.nativeEvent.layout.x);
        setWidth(e.nativeEvent.layout.width);
        setHeight(e.nativeEvent.layout.height);
      }
    };

    const labelAndIcon = () => {
      if (focused) {
        switch (whenActiveShow) {
          case TabElementDisplayOptions.BOTH:
            return (
              <React.Fragment>
                <View>{renderIcon()}</View>
                {renderLabel()}
              </React.Fragment>
            );
          case TabElementDisplayOptions.LABEL_ONLY:
            return renderLabel();
          case TabElementDisplayOptions.ICON_ONLY:
            return renderIcon();
          default:
            return (
              <React.Fragment>
                <View>{renderIcon()}</View>
                {renderLabel()}
              </React.Fragment>
            );
        }
      } else {
        switch (whenInactiveShow) {
          case TabElementDisplayOptions.BOTH:
            return (
              <React.Fragment>
                <View>{renderIcon()}</View>
                {renderLabel()}
              </React.Fragment>
            );
          case TabElementDisplayOptions.LABEL_ONLY:
            return renderLabel();
          case TabElementDisplayOptions.ICON_ONLY:
            return renderIcon();
          default:
            return (
              <React.Fragment>
                <View>{renderIcon()}</View>
                {renderLabel()}
              </React.Fragment>
            );
        }
      }
    };

    return (
      <TabButton
        key={route.key}
        focused={focused}
        labelLength={label.length}
        accessibilityLabel={accessibilityLabel}
        onLayout={onLayout}
        onPress={onPress}
        onLongPress={onLongPress}
        dotSize={dotSize}
        tabButtonLayout={tabButtonLayout}
      >
        {labelAndIcon()}
      </TabButton>
    );
  };

  const { overlayStyle } = StyleSheet.create({
    overlayStyle: {
      top: 0,
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      position: "absolute",
    },
  });

  const { options } = descriptors[state.routes[state.index].key];
  const tabBarVisible =
    options.tabBarVisible == undefined ? true : options.tabBarVisible;

  return (
    <React.Fragment>
      <View
        style={{
          flex: 1,
          overflow: "hidden",
        }}
      >
        <ScreenContainer style={{ flex: 1 }}>
          {state.routes.map((route, index) => {
            const descriptor = descriptors[route.key];
            const { unmountOnBlur } = descriptor.options;
            const isFocused = state.index === index;

            if (unmountOnBlur && !isFocused) {
              return null;
            }

            if (lazy && !loaded.includes(index) && !isFocused) {
              return null;
            }

            return (
              <ResourceSavingScene
                key={route.key}
                isVisible={isFocused}
                style={StyleSheet.absoluteFill}
              >
                <View
                  accessibilityElementsHidden={!isFocused}
                  importantForAccessibility={
                    isFocused ? "auto" : "no-hide-descendants"
                  }
                  style={{ flex: 1 }}
                >
                  {descriptor.render()}
                </View>
              </ResourceSavingScene>
            );
          })}
        </ScreenContainer>
      </View>
      {tabBarVisible && (
        <View pointerEvents={"box-none"} style={floating && overlayStyle}>
          <BottomTabBarWrapper
            style={tabStyle}
            floating={floating}
            topPadding={topPadding}
            bottomPadding={bottomPadding}
            horizontalPadding={horizontalPadding}
            tabBarBackground={tabBarBackground}
            shadow={shadow}
          >
            {state.routes.map(createTab)}
            <Dot
              dotCornerRadius={dotCornerRadius}
              topPadding={topPadding}
              activeTabBackground={activeTabBackground}
              style={
                I18nManager.isRTL
                  ? {
                      right: animatedPos.interpolate({
                        inputRange: [0, 1],
                        outputRange: [prevPos, pos],
                      }),
                    }
                  : {
                      left: animatedPos.interpolate({
                        inputRange: [0, 1],
                        outputRange: [prevPos, pos],
                      }),
                    }
              }
              width={width}
              height={height}
            />
          </BottomTabBarWrapper>
        </View>
      )}
    </React.Fragment>
  );
};

export default TabBarElement;
