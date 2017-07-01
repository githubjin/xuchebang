/**
 * @flow
 */
import React, { Component } from "react";
import { StyleSheet, View, Text, Image, PixelRatio } from "react-native";

import { FONT_MAIN_COLOR } from "../../constants/values";

export default class HomeTipcs extends Component {
  state = {};
  render() {
    return (
      <View style={styles.container}>
        <Image source={require("./image/home_topic")} style={styles.img} />
        <Text style={styles.topic}>123</Text>
      </View>
    );
  }
}

const styles = {
  container: {
    ackground: "#ffffff",
    paddingVertical: 8,
    borderTopWidth: 1 / PixelRatio.get(),
    borderTopStyle: "solid",
    borderTopColor: "#f1f1f1"
  },
  img: {
    width: 35,
    height: 20
  },
  topic: {
    fontSize: 13,
    color: FONT_MAIN_COLOR
  }
};
