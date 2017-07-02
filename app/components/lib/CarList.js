/**
 * @flow
 */
import React, { Component } from "react";
import {
  SectionList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import Loadding from "./Loadding";

export default class CarList extends Component {
  props: {
    sections: Object[],
    filterServiceNets: (carId: number) => void,
    style: Object
  };
  sectionFormat = (sections: Object[]): Object[] => {
    return sections.map(section => ({
      data: section.data.slice(),
      title: section.title,
      id: section.id
    }));
  };
  filterCars = (id: number) => {
    return () => {
      this.props.filterServiceNets(id);
    };
  };
  //    carImgUrl,  carName,id: 4597
  renderItem = ({ item, section }) => {
    // console.log("section - section - section", section);
    return (
      <TouchableOpacity onPress={this.filterCars(section.id)}>
        <View style={styles.itemWrapper}>
          <Text style={styles.item}>
            {item.carName}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  renderHeader = ({ section }) => {
    return (
      <Text style={styles.itemHeader}>
        {section.title}
      </Text>
    );
  };
  keyExtractor = item => `brand_type_${item.id}`;
  render() {
    const { sections, filterServiceNets, style } = this.props;
    if (sections.length === 0) {
      return null;
    }
    return (
      <SectionList
        style={[styles.cars, style]}
        keyExtractor={this.keyExtractor}
        sections={this.sectionFormat(sections)}
        renderItem={this.renderItem}
        renderSectionHeader={this.renderHeader}
        ListEmptyComponent={<Loadding />}
      />
    );
  }
}

const styles = StyleSheet.create({
  cars: {
    backgroundColor: "#f7f7f9"
  },
  item: {
    fontSize: 15,
    color: "#333333"
  },
  itemWrapper: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.04)",
    borderStyle: "solid"
  },
  itemHeader: {
    paddingVertical: 1,
    paddingHorizontal: 10,
    backgroundColor: "#ffffff"
  }
});
