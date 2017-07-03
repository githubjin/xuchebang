/**
 * @flow
 */
import React, { Component } from "react";
import { View, ListView, StyleSheet, Text, Image } from "react-native";
import moment from "moment";
import Icon from "react-native-vector-icons/SimpleLineIcons";

import type { Comment as CommentType } from "../types";

export default class Comments extends Component {
  props: {
    dataSource: ListView.DataSource,
    loadMore: () => {}
  };
  renderRow = (item: CommentType) => {
    return <CommentItem comment={item} />;
  };
  onEndReached = () => {
    this.props.loadMore();
  };
  render() {
    // console.log("this.props.dataSource", this.props.dataSource);
    return (
      <ListView
        enableEmptySections={true}
        renderRow={this.renderRow}
        dataSource={this.props.dataSource}
        initialListSize={100}
      />
    );
  }
}

function CommentItem({ comment }: { comment: CommentType }) {
  const { pictures = [] } = comment;
  return (
    <View style={styles.comment}>
      <View style={styles.commentHeader}>
        <Image source={{ uri: comment.portrait }} style={styles.avatar} />
        <View>
          <Text style={styles.commentHeaderTitle}>
            {comment.nickname}
          </Text>
          <Text style={styles.commentHeaderMeta}>
            {moment(comment.commentDate).format("YYYY-MM-DD HH:mm")}
          </Text>
        </View>
      </View>
      <View style={styles.meta}>
        <Text style={styles.meta_chexing}>
          车型：{comment.firstLevelCarType} {comment.thirdLevelCarType}
        </Text>
        <Text style={styles.meta_huafei}>
          花费：￥{comment.actualPrice}
        </Text>
        <Text style={styles.meta_save}>
          （省¥{comment.savePrice}）
        </Text>
      </View>
      <View style={styles.commentContent}>
        <Text style={styles.commentContentText}>
          {comment.content}
        </Text>
      </View>
      <View style={styles.images}>
        {pictures.map((item, index) =>
          <Image
            key={`${item.id}_${index}`}
            source={{ uri: item.thumbnailPath }}
            style={[
              styles.commentImage,
              {
                width: pictures.length <= 1 ? "50%" : "31%",
                height: 111
              }
            ]}
          />
        )}
      </View>
      <View style={styles.commentFooter}>
        <Icon name="map" size={14} style={styles.commentFooterIcon} />
        <Text style={styles.commentFooterText}>
          {comment.shopName}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  comment: {
    marginBottom: 10,
    backgroundColor: "#ffffff"
  },
  commentHeader: {
    flexDirection: "row",
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 10
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 23,
    marginRight: 10
  },
  commentHeaderTitle: {
    fontSize: 15,
    marginVertical: 3,
    color: "#333333"
  },
  commentHeaderMeta: {
    color: "#999999",
    fontSize: 12
  },
  meta: {
    paddingHorizontal: 15,
    flexDirection: "row"
  },
  meta_chexing: {
    color: "#999999",
    maxWidth: 180,
    marginRight: 20,
    fontSize: 12
  },
  meta_huafei: {
    fontSize: 12,
    color: "#999999"
  },
  meta_save: {
    fontSize: 12,
    color: "#fa5a4b"
  },
  commentContent: {
    paddingHorizontal: 15,
    paddingTop: 6,
    paddingBottom: 5
  },
  commentContentText: {
    fontSize: 15,
    color: "#333333",
    lineHeight: 22
  },
  images: {
    paddingTop: 5,
    paddingHorizontal: 12,
    paddingBottom: 8,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start"
  },
  commentImage: {
    margin: 3,
    borderRadius: 4
  },
  commentFooter: {
    paddingTop: 20,
    paddingHorizontal: 15,
    paddingBottom: 12,
    flexDirection: "row",
    alignItems: "center"
  },
  commentFooterText: {
    color: "#64739c",
    fontSize: 12
  },
  commentFooterIcon: {
    marginRight: 3
  }
});
