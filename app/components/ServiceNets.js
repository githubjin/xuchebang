/**
 * @flow
 */
import React, { Component } from "react";
import {
  ScrollView,
  View,
  Text,
  ListView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions
} from "react-native";
import { inject, observer } from "mobx-react";
import _ from "lodash/string";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import { ServiceNet as ServiceNetStore } from "../stores/service";
import { BrandStore } from "../stores/brand";
import type { ServiceNetType } from "../types";
import { BrandTypes } from "./lib";

@inject("serviceNetStore", "brandStore")
@observer
export default class ServiceNets extends Component {
  props: {
    serviceNetStore: ServiceNetStore,
    brandStore: BrandStore
  };
  componentDidMount() {
    this.props.serviceNetStore.loadAll();
  }
  renderRow = (item: ServiceNetType) => {
    return <ServiceNetItem item={item} />;
  };
  loadMore = () => {
    this.props.serviceNetStore.loadMore();
  };
  toogleFilterOrSorter = (filter: boolean = false) => {
    return () => {
      if (filter) {
        this.props.brandStore.toggleBrandFilter();
      } else {
        this.props.brandStore.toggleBrandSorter();
      }
    };
  };
  loadBrandTypes = () => {
    this.props.brandStore.listBrandTypes();
  };
  loadBrandCarByBrandId = (brandId: number) => {
    this.props.brandStore.listBrandCarsByType(brandId);
  };
  render() {
    return (
      <View style={styles.container}>
        <QueryHeader
          showFilter={this.props.brandStore.showBrandFilter}
          showSorter={this.props.brandStore.showBrandSorter}
          onFilterPress={this.toogleFilterOrSorter(true)}
          onSorterPress={this.toogleFilterOrSorter(false)}
        />
        {this.props.brandStore.showBrandFilter &&
          <BrandMaster
            sections={this.props.brandStore.brandTypes}
            loadBrandTypes={this.loadBrandTypes}
            loadBrandCarByBrandId={this.loadBrandCarByBrandId}
          />}
        <ListView
          enableEmptySections={true}
          renderRow={this.renderRow}
          dataSource={this.props.serviceNetStore.serviceNetDs}
          initialListSize={100}
          style={styles.list}
          onEndReachedThreshold={50}
          onEndReached={this.loadMore}
        />
      </View>
    );
  }
}

function BrandMaster({
  sections,
  loadBrandTypes,
  loadBrandCarByBrandId
}: {
  sections: Object[],
  loadBrandTypes: () => void,
  loadBrandCarByBrandId: (brandId: number) => void
}) {
  return (
    <View style={styles.brandMaster}>
      <View
        style={{
          backgroundColor: "#ffffff",
          borderTopColor: "#ededee",
          borderTopWidth: 1,
          borderStyle: "solid",
          height: Dimensions.get("window").height * 0.65
        }}
      >
        <TouchableOpacity>
          <View style={styles.noBrand}>
            <Text style={styles.noBrandText}>品牌不限</Text>
          </View>
        </TouchableOpacity>
        <BrandTypes
          sections={sections}
          loadBrandTypes={loadBrandTypes}
          loadBrandCarByBrandId={loadBrandCarByBrandId}
        />
      </View>
    </View>
  );
}

function ServiceNetItem({ item }: { item: ServiceNetType }) {
  return (
    <View style={styles.lsitItem}>
      <Image
        source={{ uri: item.storeImages[0].imgUrl }}
        style={styles.itemImg}
      />
      <View style={styles.contentContainer}>
        <Text style={styles.nickName}>
          {item.storeNickName}
        </Text>
        <View style={styles.brandRow}>
          <Image
            source={{ uri: item.brandImages[0] }}
            style={styles.brandImage}
          />
          <Text style={styles.discountValueMin}>
            {item.discountValueMin}{" "}
            <Text style={styles.discountValueMinMeta}>折起</Text>
          </Text>
        </View>
        <Stars num={item.overallScoreAvg || 1} id={item.id} />
        <View style={styles.address}>
          <Text style={styles.addressContent}>
            {_.truncate(item.address, { length: 20 })}
          </Text>
          <Text style={styles.addressMeta}>
            {(item.distance / 1000).toFixed(1)}km
          </Text>
        </View>
      </View>
    </View>
  );
}

function QueryHeader({
  showFilter = false,
  showSorter = false,
  onFilterPress,
  onSorterPress
}: {
  showFilter: boolean,
  showSorter: boolean,
  onFilterPress: () => {},
  onSorterPress: () => {}
}) {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.headerButton} onPress={onFilterPress}>
        <View style={[styles.headerItem, styles.headerLine]}>
          <Text
            style={
              showFilter ? styles.headerItemTextActive : styles.headerItemText
            }
          >
            品牌
          </Text>
          <Icon
            name={`arrow-${showFilter ? "up" : "down"}`}
            size={13}
            style={
              showFilter ? styles.headerItemIconActive : styles.headerItemIcon
            }
          />
        </View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.headerButton} onPress={onSorterPress}>
        <View style={styles.headerItem}>
          <Text
            style={
              showSorter ? styles.headerItemTextActive : styles.headerItemText
            }
          >
            推荐排序
          </Text>
          <Icon
            name={`arrow-${showSorter ? "up" : "down"}`}
            size={13}
            style={
              showSorter ? styles.headerItemIconActive : styles.headerItemIcon
            }
          />
        </View>
      </TouchableOpacity>
    </View>
  );
}

function Stars({ num = 1, id }: { num: number, id: string }) {
  let iconArr = [];
  let _num = Math.round(num);
  for (let i = 0; i < _num; i++) {
    iconArr.push(`${id}_${i}`);
  }
  return (
    <View style={styles.stars}>
      {iconArr.map(item => {
        return (
          <Icon
            key={item}
            name="star"
            backgroundColor="#ffc341"
            color="#ffc341"
            size={12}
            iconStyle={styles.star}
          />
        );
      })}
      <Text style={styles.starDes}>
        {num}
        <Text style={styles.starDesMeta}>分</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative"
  },
  header: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    justifyContent: "space-around"
  },
  headerItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 40
  },
  headerLine: {
    borderRightWidth: 1,
    borderColor: "#e5e5e5"
  },
  headerButton: {
    width: "50%"
  },
  headerItemText: {
    color: "rgb(102,102,102)",
    fontSize: 15,
    marginRight: 5
  },
  headerItemTextActive: {
    color: "#32c8fa",
    fontSize: 15,
    marginRight: 5
  },
  headerItemIcon: {
    color: "rgb(102,102,102)"
  },
  headerItemIconActive: {
    color: "#32c8fa"
  },
  list: {
    backgroundColor: "#ffffff"
  },
  lsitItem: {
    paddingVertical: 15,
    borderTopWidth: 1,
    borderColor: "rgba(0,0,0,0.04)",
    flexDirection: "row"
  },
  itemImg: {
    width: 75,
    height: 75,
    marginHorizontal: 15,
    marginTop: 3
  },
  brandImage: {
    width: 28,
    height: 28
  },
  brandRow: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  stars: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: 90,
    alignItems: "flex-end"
  },
  star: {
    color: "#ffc341",
    backgroundColor: "#ffc341"
  },
  address: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  addressContent: {
    color: "#666666",
    fontSize: 12
  },
  addressMeta: {
    color: "#999999",
    fontSize: 12
  },
  contentContainer: {
    marginRight: 15,
    flex: 1
  },
  nickName: {
    fontSize: 15,
    color: "#333333"
  },
  discountValueMin: {
    color: "#fa5a4b",
    fontSize: 16,
    lineHeight: 28
  },
  discountValueMinMeta: {
    fontSize: 12
  },
  starDes: {
    color: "#fa5a4b",
    fontSize: 16,
    marginLeft: 5
  },
  starDesMeta: {
    fontSize: 12
  },
  brandMaster: {
    zIndex: 999,
    position: "absolute",
    top: 40,
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.75)",
    width: "100%",
    height: "100%"
  },
  noBrand: {
    paddingVertical: 12,
    paddingHorizontal: 15
  },
  noBrandText: {
    fontSize: 15,
    lineHeight: 20,
    color: "#333333"
  }
});
