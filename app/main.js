/**
 * @flow
 */

import React, { Component } from "react";
import { View, Image, StyleSheet, PixelRatio, Button } from "react-native";
import { Provider } from "mobx-react";
import { StackNavigator, TabNavigator } from "react-navigation";

import { Home, Locations, ServiceNets } from "./components";
import { TabbarIcon, HomeHeaderLeft } from "./components/lib";
import * as stores from "./stores";
import {
  TABBAR_ICON_SIZE,
  HEADER_BACKGROUND_COLOR,
  FONT_MAIN_COLOR,
  TABBAR_BACKGROUND_COLOR,
  HEADER_TITLE_FONT_SIZE,
  TABBAR_PADDING_BOTTOM,
  TABBAR_PADDING_TOP,
  TABBAR_LABEL_FONT_SIZE,
  ICON_COLOR
} from "./constants/values";

const styles = StyleSheet.create({
  tabIcon: {
    width: TABBAR_ICON_SIZE / PixelRatio.get(),
    height: TABBAR_ICON_SIZE / PixelRatio.get()
  },
  headerTitle: {
    color: FONT_MAIN_COLOR,
    // fontSize: HEADER_TITLE_FONT_SIZE / PixelRatio.get()
    fontSize: HEADER_TITLE_FONT_SIZE
  }
});

const TabContainer = TabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: ({ navigation }) => {
        const { location = "上海" } = navigation.state.params || {};
        return {
          tabBarLabel: "首页",
          headerLeft: (
            <HomeHeaderLeft
              location={location}
              onPress={() => {
                navigation.navigate("Locations", { location });
              }}
            />
          ),
          headerTitle: "乐车邦",
          headerBackTitle: null,
          tabBarIcon: ({ focused }) => {
            return <TabbarIcon focused={focused} icon="home" />;
          }
        };
      }
    },
    Fours: {
      screen: ServiceNets,
      navigationOptions: ({ navigation }) => ({
        tabBarLabel: "4S店",
        headerTitle: "4S店",
        tabBarIcon: ({ focused }) => {
          return <TabbarIcon focused={focused} icon="4s" />;
        }
      })
    },
    Topic: {
      screen: Home,
      navigationOptions: ({ navigation }) => ({
        title: "头条",
        tabBarIcon: ({ focused }) => {
          return <TabbarIcon focused={focused} icon="topic" />;
        }
      })
    },
    Mine: {
      screen: Home,
      navigationOptions: ({ navigation }) => ({
        title: "我的",
        tabBarIcon: ({ focused }) => {
          return <TabbarIcon focused={focused} icon="mine" />;
        }
      })
    }
  },
  {
    lazy: true,
    tabBarPosition: "bottom",
    tabBarOptions: {
      showIcon: true,
      activeTintColor: "rgb(250, 90, 75)",
      inactiveTintColor: "rgb(102,102,102)",
      style: {
        backgroundColor: TABBAR_BACKGROUND_COLOR,
        paddingBottom: TABBAR_PADDING_BOTTOM,
        paddingTop: TABBAR_PADDING_TOP
      },
      tabStyle: {
        padding: 0
      },
      labelStyle: {
        fontSize: TABBAR_LABEL_FONT_SIZE
      }
    }
  }
);

const StackContainer = StackNavigator(
  {
    Main: {
      screen: TabContainer
      // navigationOptions: {
      //   headerLeft: null
      // }
    },
    Locations: {
      screen: Locations,
      navigationOptions: ({ navigation }) => {
        const { location } = navigation.state.params || {};
        return {
          title: `当前城市 - ${location}`,
          headerTintColor: ICON_COLOR,
          headerTitleStyle: styles.headerTitle,
          headerBackTitle: null
        };
      }
    },
    Login: {
      screen: Home,
      navigationOptions: {
        header: null
      }
    }
  },
  {
    headerMode: "screen",
    navigationOptions: {
      headerStyle: {
        backgroundColor: HEADER_BACKGROUND_COLOR
      },
      headerTitleStyle: styles.headerTitle,
      headerTintColor: "#fff"
    }
  }
);

export default class Main extends Component {
  render() {
    return (
      <Provider {...stores}>
        <StackContainer />
      </Provider>
    );
  }
}
