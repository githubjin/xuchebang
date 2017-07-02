/**
 * @flow
 */
import React, { Component } from "react";
import { View, Text, Image, StyleSheet } from "react-native";

import { UiButton } from "./lib";

export default class Topics extends Component {
  render() {
    return (
      <View>
        <Header />
        <Statistics />
        <DingDan />
      </View>
    );
  }
}

function DingDan() {
  return (
    <View style={{ marginVertical: 10 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginVertical: 8,
          marginHorizontal: 15
        }}
      >
        <View>
          <Text>我的订单</Text>
        </View>
        <View>
          <Text>全部订单</Text>
        </View>
      </View>
    </View>
  );
}

function Statistics() {
  return (
    <View style={styles.statisticContainer}>
      <StaticsItem dw="元" num={0} item="钱包" />
      <StaticsItem dw="张" num={0} item="优惠券" />
      <StaticsItem dw="分" num={0} item="积分" />
    </View>
  );
}

function StaticsItem({ num, dw, item }) {
  return (
    <View style={styles.statisticItem}>
      <Text style={styles.statisNum}>
        {num} <Text style={styles.statisDw}>{dw}</Text>
      </Text>
      <Text style={styles.statisItem}>
        {item}
      </Text>
    </View>
  );
}

function Header() {
  return (
    <Image
      source={{
        uri: "https://img06.lechebangstatic.com/my/user/topbgaa91247e8e.png"
      }}
      style={styles.bg}
    >
      <View style={styles.userContainer}>
        <View style={styles.sign}>
          <UiButton
            style={styles.qdBnt}
            fontStyle={styles.qdBntText}
            text="签到领积分"
          />
        </View>
        <View style={styles.userRow}>
          <Image
            style={styles.avatar}
            source={{
              uri:
                "https://img06.lechebangstatic.com/my/user/unman67c3718a7d.png"
            }}
          />
          <Text style={styles.signButton}>点击登录</Text>
        </View>
      </View>
    </Image>
  );
}

const styles = StyleSheet.create({
  bg: {
    width: "100%",
    height: 102.5
  },
  userContainer: {
    paddingVertical: 17,
    paddingHorizontal: 15,
    position: "relative"
  },
  sign: {
    position: "absolute",
    paddingTop: 15,
    paddingRight: 15,
    right: 0,
    top: 0,
    zIndex: 1
  },
  userRow: {
    flexDirection: "row",
    alignItems: "center"
  },
  qdBnt: {
    backgroundColor: "#ffe141",
    borderRadius: 5,
    paddingVertical: 2
  },
  qdBntText: {
    color: "#fa5849",
    fontSize: 12,
    fontWeight: "600"
  },
  signButton: {
    color: "#ffffff",
    fontSize: 18,
    marginLeft: 25,
    backgroundColor: "transparent"
  },
  avatar: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderColor: "#ffffff",
    borderRadius: 30
  },
  statisticContainer: {
    backgroundColor: "#ffffff",
    flexDirection: "row",
    justifyContent: "space-between",
    shadowColor: "rgba(0,0,0,0.04)",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2
  },
  statisticItem: {
    marginTop: 10,
    marginBottom: 6,
    borderRightWidth: 1,
    borderRightColor: "#f1f0f0",
    borderStyle: "solid",
    width: "33%",
    alignItems: "center"
  },
  statisNum: {
    color: "#cccccc",
    fontSize: 26,
    fontWeight: "700"
  },
  statisDw: {
    fontSize: 12,
    color: "#333333"
  },
  statisItem: {
    fontSize: 12,
    color: "#999999",
    marginBottom: 4
  }
});
