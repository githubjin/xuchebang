/**
 * @flow
 */

import React, { Component } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import _ from "lodash/array";

import type { BrandsMinPrice } from "../../types";

export default class Maintenance extends Component {
  props: {
    brands: BrandsMinPrice[]
  };
  state: {
    cascade: boolean
  };
  constructor(props) {
    super(props);
    this.state = {
      cascade: false
    };
  }
  toggleBrands = () => {
    this.setState({
      cascade: !this.state.cascade
    });
  };
  getBrands = () => {
    if (this.state.cascade) {
      return this.props.brands;
    }
    return _.slice(this.props.brands, 0, 8);
  };
  render() {
    const brands = this.getBrands() || [];
    // console.log(brands);
    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.box}>
          {brands.map(brand => <Brand key={brand.id} brand={brand} />)}
        </View>
        <Footer onPress={this.toggleBrands} cascade={this.state.cascade} />
      </View>
    );
  }
}

function Footer({ cascade = true, onPress }: { cascade: boolean }) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.footer}>
        <Text style={styles.fonterLabel}>
          {cascade ? "收起名牌" : "更多名牌"}
        </Text>
        <Icon
          style={styles.footerIcon}
          name="arrow-right"
          size={13}
          color="#999999"
        />
      </View>
    </TouchableOpacity>
  );
}

function Brand({ brand }: { brand: BrandsMinPrice }) {
  return (
    <View style={styles.brand}>
      <Image source={{ uri: brand.imgUrl }} style={styles.img} />
      <Text style={styles.minPrice}>
        ￥{brand.minPrice}
      </Text>
    </View>
  );
}

function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>热门保养</Text>
      <View style={styles.headerAction}>
        <Icon name="plus" size={15} color="#ffa028" style={styles.headerIcon} />
        <Text style={styles.headerMeta}>添加爱车</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    marginVertical: 10
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 12,
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderColor: "rgba(0,0,0,0.04)"
  },
  headerTitle: {
    fontSize: 15,
    color: "#333333"
  },
  headerMeta: {
    color: "#ffa028",
    fontSize: 14,
    lineHeight: 15
  },
  headerAction: {
    flexDirection: "row"
  },
  headerIcon: {
    marginRight: 3
  },
  box: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  img: {
    width: 50,
    height: 50
  },
  brand: {
    width: "25%",
    paddingVertical: 5,
    alignItems: "center"
    // font-size: .14rem;
    // float: left;
  },
  minPrice: {
    color: "#fa5a4b",
    fontSize: 15
  },
  footer: {
    paddingVertical: 14,
    paddingHorizontal: 15,
    justifyContent: "flex-end",
    flexDirection: "row"
  },
  fonterLabel: {
    color: "#999999",
    fontSize: 13,
    marginRight: 3
  }
});
