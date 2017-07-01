/**
 * @flow
 */

import React, { Component } from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default class Activities extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Col
            title="洗从天降"
            meta="12次免费洗车"
            source={require("./images/activity_xctj.png")}
          />
          <Col title="新客专享" meta="首单6.8折" source={require("./images/a.png")} />
        </View>
        <View style={styles.row}>
          <Col
            style={styles.colTopBorder}
            title="邀请有礼"
            meta="赚￥10~￥30"
            source={require("./images/b.png")}
          />
          <Col style={styles.colTopBorder} title="全民洗空调" meta="5折低至20元 " />
        </View>
      </View>
    );
  }
}

function Col({ title, meta, source = null, style = {} }) {
  return (
    <View style={[styles.col, style]}>
      <View style={styles.content}>
        <Text style={styles.title}>
          {title}
        </Text>
        <Text style={styles.meta}>
          {meta}
        </Text>
      </View>
      {source &&
        <Image resizeMode="cover" source={source} style={styles.img} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    backgroundColor: "#ffffff"
  },
  row: {
    flexDirection: "row"
  },
  col: {
    width: "50%",
    paddingTop: 15,
    paddingBottom: 5,
    paddingLeft: 25,
    borderStyle: "solid",
    borderRightWidth: 1,
    borderColor: "#f1f1f1",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  colTopBorder: {
    borderStyle: "solid",
    borderTopWidth: 1,
    borderColor: "#f1f1f1"
  },
  content: {
    // marginRight: 10
  },
  img: {
    width: 50,
    height: 50,
    marginRight: 10
  },
  title: {
    fontSize: 15,
    lineHeight: 20,
    color: "#333333"
  },
  meta: {
    color: "rgb(250, 90, 75)",
    marginTop: 5,
    fontSize: 13
  }
});
