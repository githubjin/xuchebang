/**
 * @flow
 */
import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  PixelRatio,
  Platform,
  UIManager,
  LayoutAnimation
} from "react-native";
import _ from "lodash";

import { FONT_MAIN_COLOR } from "../../constants/values";

export default class HomeTipcs extends Component {
  constructor(props) {
    super(props);
    this.timer;
    this.state = {
      topicIndex: 0
    };
  }
  componentDidMount() {
    if (Platform.OS === "android") {
      UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
    this.timer = setInterval(() => {
      this.setState({
        topicIndex: (this.state.topicIndex + 1) % 3
      });
    }, 3000);
  }
  componentWillUpdate() {
    LayoutAnimation.spring();
  }
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.imgWrapper}>
          <Image
            resizeMode="contain"
            source={require("./images/home_topic.png")}
            style={styles.img}
          />
        </View>
        <View style={styles.topicWrapper}>
          {this.state.topicIndex === 0 &&
            <Text style={styles.topic}>免费办理ETC，到底靠不靠谱？</Text>}
          {this.state.topicIndex === 1 &&
            <Text style={styles.topic}>左转可以调头，调头不可以左转，路口总在耍我？</Text>}
          {this.state.topicIndex === 2 &&
            <Text style={styles.topic}>
              {_.truncate("已有50万+人领取4S店空调清洗5折券，更给力的第二波重磅来袭！", { length: 26 })}
            </Text>}
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    backgroundColor: "#ffffff",
    paddingVertical: 8,
    borderTopWidth: 1,
    borderStyle: "solid",
    borderTopColor: "#f1f1f1",
    flexDirection: "row",

    shadowRadius: -3,
    shadowColor: "black",
    shadowOpacity: 0.2,
    shadowOffset: { height: 0.5 }
  },
  imgWrapper: {
    paddingVertical: 4,
    paddingHorizontal: 15,
    // border-right: 1px #ececec solid;
    borderStyle: "solid",
    borderRightWidth: 1,
    borderRightColor: "#ececec"
  },
  img: {
    width: 35,
    height: 20
  },
  topic: {
    fontSize: 13,
    color: FONT_MAIN_COLOR,
    paddingLeft: 10,
    paddingRight: 15
  },
  topicWrapper: {
    overflow: "hidden",
    justifyContent: "center"
  }
};
