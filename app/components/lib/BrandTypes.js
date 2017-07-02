/**
 * @flow
 */
import React, { Component } from "react";
import {
  SectionList,
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity
} from "react-native";

import type { Section } from "./types";
import Loadding from "./Loadding";

export default class BrandTypes extends Component {
  props: {
    sections: Section[],
    loadBrandTypes: () => void,
    loadBrandCarByBrandId: (brandId: number) => void
  };
  componentDidMount() {
    this.props.loadBrandTypes();
  }
  loadBrandCarByBrandId = (brandId: number) => {
    return () => {
      this.props.loadBrandCarByBrandId(brandId);
    };
  };
  renderItem = ({ item }) => {
    // console.log("item - - - -item", item);
    return (
      <TouchableOpacity onPress={this.loadBrandCarByBrandId(item.id)}>
        <View style={styles.itemContainer}>
          <Image source={{ uri: item.imgUrl }} style={styles.brandImg} />
          <Text style={styles.brandText}>
            {item.brandName}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  renderHeader = ({ section }) => {
    // console.log("section-sectionsection-section", section);
    return (
      <Text style={styles.brandHeader}>
        {section.title}
      </Text>
    );
  };
  keyExtractor = item => `brand_type_${item.id}`;
  sectionsFormat = (sections: Object[] = []) => {
    return sections.slice().map(section => ({
      data: section.data.slice(),
      title: section.title
    }));
  };
  render() {
    // console.log(
    //   "this.props.sections",
    //   this.props.sections,
    //   this.props.sections && this.props.sections.slice()
    // );
    const { sections = [] } = this.props;
    return (
      <SectionList
        sections={this.sectionsFormat(sections)}
        renderItem={this.renderItem}
        renderSectionHeader={this.renderHeader}
        keyExtractor={this.keyExtractor}
        ListEmptyComponent={<Loadding />}
      />
    );
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 15,
    alignItems: "center",
    borderBottomWidth: 1,
    borderStyle: "solid",
    borderBottomColor: "rgba(0,0,0,0.04)"
  },
  brandImg: {
    width: 28,
    height: 28,
    marginRight: 1
  },
  brandText: {
    fontSize: 15,
    lineHeight: 28
  },
  brandHeader: {
    color: "#333333",
    fontSize: 13,
    paddingHorizontal: 15,
    lineHeight: 20,
    backgroundColor: "#efeff4"
  }
});
