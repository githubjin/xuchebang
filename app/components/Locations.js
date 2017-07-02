/**
 * @flow
 */
import React, { Component } from "react";
import { ScrollView, SectionList, Text, View, StyleSheet } from "react-native";

export default class Locations extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>定位</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center"
  }
});
