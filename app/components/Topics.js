/**
 * @flow
 */
import React, { Component } from "react";
import { View, Text, ListView, StyleSheet, Image } from "react-native";
import { observer, inject } from "mobx-react";
import { TopicStore } from "../stores/topics";

@inject("topicStore")
@observer
export default class Topics extends Component {
  props: {
    topicStore: TopicStore
  };
  componentDidMount() {
    this.props.topicStore.loadMore();
  }
  renderRow = item => {
    return (
      <View style={styles.contatiner}>
        <Image source={{ uri: item.preview_img }} style={styles.img} />
        <View style={styles.contentBox}>
          <Text style={styles.title}>
            {item.title}
          </Text>
          <View style={styles.metas}>
            <Text style={styles.meta}>
              {item.author}
            </Text>
            <Text style={styles.meta}>
              {item.page_view}
            </Text>
          </View>
        </View>
      </View>
    );
  };
  render() {
    return (
      <ListView
        style={styles.list}
        dataSource={this.props.topicStore.topicDs}
        renderRow={this.renderRow}
        enableEmptySections={true}
      />
    );
  }
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: "#ffffff",
    flex: 1
  },
  contatiner: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.04)",
    borderStyle: "solid"
  },
  img: {
    width: 110,
    height: 75
  },
  title: {
    fontSize: 15,
    color: "#333333"
  },
  meta: {
    fontSize: 12,
    color: "#999999"
  },
  metas: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  contentBox: {
    justifyContent: "space-between",
    paddingHorizontal: 15,
    position: "absolute",
    left: 125,
    height: "100%",
    right: 0,
    marginTop: 10
  }
});
