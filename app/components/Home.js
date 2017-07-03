/**
 * @flow
 */
import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  PixelRatio
} from "react-native";
import { observer, inject } from "mobx-react";
import { NavigationActions } from "react-navigation";
import Swiper from "react-native-swiper";

import { HomeStore } from "../stores/home";
import { bigImages } from "../constants/data";
import {
  ServicesGrid,
  HomeTipcs,
  Activities,
  Maintenances,
  UiButton
} from "./lib";
import Comments from "./Comments";

@inject("homeStore")
@observer
export default class Home extends Component {
  props: {
    homeStore: HomeStore
    // navigation: NavigationActions
  };
  componentDidMount() {
    this.props.homeStore.getHomeData();
    this.props.homeStore.getOrderHyperCommentList();
    // this.location();
  }
  location = () => {
    navigator.geolocation.getCurrentPosition(
      ({ coords, timestamp }) => {
        console.log(coords, timestamp);
      },
      error => {
        console.log(error);
      },
      {
        timeout: 10000,
        maximumAge: 60000,
        enableHighAccuracy: true
      }
    );
  };
  loadMoreComments = () => {
    console.log("listVIew endReacted");
    this.props.homeStore.getOrderHyperCommentList();
  };
  render() {
    return (
      <ScrollView style={styles.container}>
        <Swiper
          dotColor="#ffffff"
          activeDotColor="#fa5a4b"
          style={styles.swiper}
          autoplay={true}
          height={150}
          showsPagination={true}
          loadMinimal={true}
          loadMinimalSize={3}
        >
          {bigImages.map((url, index) =>
            <Image
              key={`bigImage_${index}`}
              source={{ uri: url }}
              style={styles.bigImage}
            />
          )}
        </Swiper>
        {/*<Text>
          {JSON.stringify(Dimensions.get("window"))}
          {JSON.stringify(Dimensions.get("screen"))}
          "Scale" : {PixelRatio.get()}
        </Text>*/}
        <ServicesGrid />
        <HomeTipcs />
        <Activities />
        <Maintenances brands={this.props.homeStore.brandsMinPrices} />
        <View style={styles.commentsHeader}>
          <Text style={styles.commentsHeaderTitle}>车主评价</Text>
        </View>
        <Comments
          loadMore={this.loadMoreComments}
          dataSource={this.props.homeStore.commentDataSource}
        />
        <UiButton
          style={styles.bottomBnt}
          text="加载更多"
          fontStyle={styles.bottomBntText}
          onPress={this.loadMoreComments}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  swiper: {
    height: 150
  },
  bigImage: {
    height: 150,
    width: Dimensions.get("window").width
  },
  commentsHeader: {
    paddingVertical: 13,
    paddingHorizontal: 15,
    backgroundColor: "#ffffff",
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderBottomColor: "#f7f7f7"
  },
  commentsHeaderTitle: {
    fontSize: 15,
    color: "#333"
  },
  bottomBnt: {
    backgroundColor: "#ffffff",
    marginTop: 10,
    marginBottom: 20,
    paddingVertical: 10
  },
  bottomBntText: {
    color: "#333333"
  }
});
