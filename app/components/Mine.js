/**
 * @flow
 */
import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  PixelRatio,
  Dimensions,
  TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import IonIcon from "react-native-vector-icons/Ionicons";
import { UiButton } from "./lib";

export default class Topics extends Component {
  render() {
    return (
      <ScrollView>
        <Header navigation={this.props.navigation} />
        <Statistics />
        <DingDanBox />
        <Others />
      </ScrollView>
    );
  }
}

function DingDanBox() {
  return (
    <View
      style={{
        marginVertical: 10,
        backgroundColor: "#ffffff",
        shadowColor: "rgba(0,0,0,0.04)",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 1,
        shadowRadius: 1
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingVertical: 8,
          paddingHorizontal: 15,
          shadowColor: "rgba(0,0,0,0.04)",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 1,
          shadowRadius: 1
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <Icon name="event" size={16} color="#ffc341" />
          <Text
            style={{
              marginLeft: 3,
              fontSize: 15,
              color: "#333333"
            }}
          >
            我的订单
          </Text>
        </View>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: 13, color: "#999999", marginRight: 3 }}>
            全部订单
          </Text>
          <Icon name="arrow-right" size={12} color="#999999" />
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          paddingTop: 5,
          paddingBottom: 6
        }}
      >
        <DingDanItem icon="hourglass" label="待支付" />
        <DingDanItem icon="clock" label="服务中" />
        <DingDanItem icon="like" label="待评价" />
      </View>
    </View>
  );
}

function Others() {
  return (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        backgroundColor: "#ffffff"
      }}
    >
      <OtherItem icon="md-car" label="我的车库" />
      <OtherItem icon="logo-buffer" label="积分任务" color="#ffc341" />
      <OtherItem icon="ios-cart" label="积分商城" color="rgb(255, 195, 65)" />
      <OtherItem icon="ios-megaphone" label="热门活动" color="rgb(255, 130, 0)" />
      <Image
        source={{
          uri: "https://img06.lechebangstatic.com/my/user/wash708593eedc.png"
        }}
        style={{ width: "33%" }}
      />
      <OtherItem icon="logo-yen" label="邀请有礼" color="rgb(255, 130, 0)" />
      <OtherItem icon="ios-headset" label="客服中心" color="#32c8fa" />
      <OtherItem icon="ios-create" label="意见反馈" color="rgb(50, 200, 250)" />
      <OtherItem icon="ios-thumbs-up" label="好评送积分" color="#fa5a4b" />
    </View>
  );
}
function OtherItem({ icon, label, color = "#96d20a" }) {
  return (
    <View
      style={{
        width: "33%",
        alignItems: "center",
        paddingVertical: 18,
        borderBottomColor: "#f1f1f1",
        borderBottomWidth: 1 / PixelRatio.get(),
        borderStyle: "solid",
        borderLeftColor: "#f1f1f1",
        borderLeftWidth: 1 / PixelRatio.get()
      }}
    >
      <IonIcon name={icon} size={19} color={color} />
      <Text style={{ fontSize: 13, color: "#333333", marginTop: 10 }}>
        {label}
      </Text>
    </View>
  );
}

function DingDanItem({ icon, label }) {
  return (
    <View style={{ width: "33%", alignItems: "center" }}>
      <Icon
        name={icon}
        size={20}
        color="#999999"
        style={{ marginVertical: 3 }}
      />
      <Text style={{ fontSize: 13, color: "#666666" }}>
        {label}
      </Text>
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

function Header({ navigation }) {
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
            onPress={() => {
              navigation.navigate("Demo");
            }}
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
    borderWidth: 2 / PixelRatio.get(),
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
    borderRightWidth: 1 / PixelRatio.get(),
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
