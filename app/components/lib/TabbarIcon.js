/**
 * @flow
 */

import React, { Component } from "react";
import { Image, StyleSheet, PixelRatio } from "react-native";
import {
  TABBAR_ICON_SIZE,
  TABBAR_ICON_MAGIN_BOTTOM
} from "../../constants/values";

const icon_home = require("./images/home.png");
const icon_home_selected = require("./images/home_selected.png");
const icon_4s = require("./images/4s.png");
const icon_4s_selected = require("./images/4s_selected.png");
const icon_topic = require("./images/topic.png");
const icon_topic_selected = require("./images/topic_selected.png");
const icon_mine = require("./images/mine.png");
const icon_mine_selected = require("./images/mine_selected.png");
const icons = {
  selected: {
    _home: icon_home_selected,
    _4s: icon_4s_selected,
    _topic: icon_topic_selected,
    _mine: icon_mine_selected
  },
  default: {
    _home: icon_home,
    _4s: icon_4s,
    _topic: icon_topic,
    _mine: icon_mine
  }
};

function TabbarIcon({
  focused,
  icon
}: {
  focused: boolean,
  icon: string
}): React.Element {
  console.log(focused, icon);
  return (
    <Image
      source={focused ? icons.selected[`_${icon}`] : icons.default[`_${icon}`]}
      style={styles.tabIcon}
    />
  );
}

export default TabbarIcon;

const styles = StyleSheet.create({
  tabIcon: {
    width: TABBAR_ICON_SIZE / PixelRatio.get(),
    height: TABBAR_ICON_SIZE / PixelRatio.get(),
    marginBottom: TABBAR_ICON_MAGIN_BOTTOM
  }
});
