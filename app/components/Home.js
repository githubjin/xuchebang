/**
 * @flow
 */
import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { observer, inject } from "mobx-react";
import { NavigationActions } from "react-navigation";
import Swiper from "react-native-swiper";

import { HomeStore } from "../stores/home";
import { bigImages } from "../constants/data";
import { ServicesGrid, HomeTipcs, Activities } from "./lib";

@inject("homeStore")
@observer
export default class Home extends Component {
  props: {
    homeStore: HomeStore
    // navigation: NavigationActions
  };
  componentDidMount() {
    this.props.homeStore.getHomeData();
    // this.props.homeStore.getOrderHyperCommentList();
    this.location();
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
        >
          {bigImages.map((url, index) =>
            <Image
              key={`bigImage_${index}`}
              source={{ uri: url }}
              style={styles.bigImage}
            />
          )}
        </Swiper>
        <ServicesGrid />
        <HomeTipcs />
        <Activities />
        <Text>123</Text>
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
    width: "auto"
  }
});
