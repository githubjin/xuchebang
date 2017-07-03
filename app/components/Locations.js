/**
 * @flow
 */
import React, { Component } from "react";
import { ScrollView, SectionList, Text, View, StyleSheet } from "react-native";

export default class Locations extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.locationHeader}>
          <Text>定位</Text>
        </View>
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
  },
  locationHeader: {
    marginTop: 10,
    paddingVertical: 13,
    paddingHorizontal: 20
  }
});
