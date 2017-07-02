/**
 * @flow
 */
import React, { Component } from "react";
import { View, StyleSheet, Image, Text, PixelRatio } from "react-native";
import _ from "lodash/lang";

import { FONT_MAIN_COLOR } from "../../constants/values";
import type { ServiceType } from "./types";

import { services_one, services_two } from "./data/servicesData";

export default class ServiceGrid extends Component {
  // props: {
  //   services_one: ServiceType[],
  //   services_two: ServiceType[]
  // };
  render() {
    // const { services_one, services_two } = this.props;
    // console.log(services_one, services_two);
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          {services_one.map(item => <Service key={item.id} {...item} />)}
        </View>
        <View style={styles.row}>
          {services_two.map(item => <Service key={item.id} {...item} />)}
        </View>
      </View>
    );
  }
}

function Service({ label, img, tip }) {
  const hasTip = !_.isEmpty(tip);
  return (
    <View style={styles.col}>
      {hasTip &&
        <View style={styles.tip}>
          <Text style={styles.tipText}>
            {tip}
          </Text>
        </View>}
      <View style={styles.imgWrapper}>
        <Image source={{ uri: img }} style={styles.img} />
      </View>
      <Text style={styles.label}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 18,
    paddingHorizontal: 7,
    backgroundColor: "#ffffff"
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16
  },
  col: {
    width: 69,
    height: 69
  },
  tip: {
    zIndex: 999,
    position: "absolute",
    top: -5,
    right: -5,
    borderRadius: 10 / PixelRatio.get(),
    borderWidth: 1 / PixelRatio.get(),
    borderStyle: "solid",
    borderColor: "#ffffff",
    backgroundColor: "#ff3232",
    paddingVertical: 0,
    paddingHorizontal: 3
  },
  tipText: {
    color: "#ffffff",
    fontSize: 12
  },
  img: {
    width: 44,
    height: 44,
    marginBottom: 4
  },
  imgWrapper: {
    alignItems: "center"
  },
  label: {
    fontSize: 13,
    color: FONT_MAIN_COLOR,
    lineHeight: 20,
    textAlign: "center"
  }
});
