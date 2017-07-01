/**
 * @flow
 */
import React, { Component } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/SimpleLineIcons";

import {
  HEADER_HOME_LEFT_FONT_SIZE,
  FONT_MAIN_COLOR,
  TOUCHABLE_MIN_HEIGHT,
  TOUCHABLE_MIN_LINE_HEIGHT
} from "../../constants/values";

function HomeHeaderLeft({
  location = "上海",
  onPress = () => {}
}: {
  location: string,
  onPress: () => {}
}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.location}>
          {location}
        </Text>
        <Icon name="arrow-down" size={9} style={styles.icon} />
      </View>
    </TouchableOpacity>
  );
}

export default HomeHeaderLeft;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: TOUCHABLE_MIN_HEIGHT,
    paddingLeft: 15,
    alignItems: "center"
  },
  location: {
    fontSize: HEADER_HOME_LEFT_FONT_SIZE,
    color: FONT_MAIN_COLOR,
    lineHeight: TOUCHABLE_MIN_LINE_HEIGHT
  },
  icon: {
    marginLeft: 2,
    marginTop: 3
  }
});
