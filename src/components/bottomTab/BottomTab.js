import React from "react";
import AnimatedTabBarNavigator from "./AnimatedTabBarNavigator";
import { Feather } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS } from "../../constants";
import Home from "../../screens/Home";
import Search from "../../screens/Search";
import Favourites from "../../screens/Favourites";
import Profile from "../../screens/Profile";

const BottomTab = () => {
  const Tabs = AnimatedTabBarNavigator();

  return (
    <Tabs.Navigator
      tabBarOptions = {{
        tabStyle: {
          backgroundColor: COLORS.backgroundSecondary
        },
        activeTintColor: COLORS.backgroundSecondary,
        activeBackgroundColor: COLORS.primary
      }}
    >
      <Tabs.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons
              name={focused ? "home-variant" : "home-variant-outline"}
              size={size ? size : 24}
              color={focused ? color : COLORS.light}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Feather
              name="search"
              size={size ? size : 24}
              color={focused ? color : COLORS.light}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Favorites"
        component={Favourites}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <FontAwesome
              name={focused ? "heart" : "heart-o"}
              size={size ? size : 24}
              color={focused ? color : COLORS.light}
              focused={focused}
            />
          ),
        }}
      />
      {/* <Tabs.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <FontAwesome
              name={focused ? "user" : "user-o"}
              size={size ? size : 24}
              color={focused ? color : COLORS.light}
              focused={focused}
            />
          ),
        }}
      /> */}
    </Tabs.Navigator>
  );
};

export default BottomTab;