import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { Screen, screensEnabled } from "react-native-screens";

const FAR_FAR_AWAY = 30000;

const ResourceSavingScene = ({ isVisible, children, style, ...rest }) => {
  if (screensEnabled?.() && Platform.OS !== "web") {
    return (
      <Screen activityState={isVisible ? 2 : 0} style={style} {...rest}>
        {children}
      </Screen>
    );
  }

  return (
    <View
      style={[
        styles.container,
        Platform.OS === "web" ? { display: isVisible ? "flex" : "none" } : null,
        style,
      ]}
      pointerEvents={isVisible ? "auto" : "none"}
    >
      <View
        collapsable={false}
        removeClippedSubviews={Platform.OS === "ios" ? !isVisible : true}
        pointerEvents={isVisible ? "auto" : "none"}
        style={isVisible ? styles.attached : styles.detached}
      >
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: "hidden",
  },
  attached: {
    flex: 1,
  },
  detached: {
    flex: 1,
    top: FAR_FAR_AWAY,
  },
});

export default ResourceSavingScene;
