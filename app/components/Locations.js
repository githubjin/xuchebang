/**
 * @flow
 */
import React, { Component } from "react";
import { ScrollView, SectionList, Text, View, StyleSheet } from "react-native";

export default class Locations extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <View>
          <Text>123</Text>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
