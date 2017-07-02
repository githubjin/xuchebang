/**
 * @flow
 */
import { observable, action, computed, asFlat } from "mobx";
import {
  API_FIRST_LEVEL_BRAND_TYPE,
  API_BRAND_PRODUCER_CAR
} from "../constants/apis";
import * as server from "../services/server";
import { Alert } from "react-native";

type BrandType = {
  brandName: string,
  id: number,
  imgUrl: string,
  minPrice: number,
  price: number
};
type BrandCar = {
  carImgUrl: string,
  carName: string,
  id: number
};
type ResultBrandType = {
  pinYin: string,
  results: BrandType[]
};
type ResultBrandCar = {
  brandProduceCar: BrandCar[],
  id: number,
  isCanOrder: number,
  producerName: string
};
type Section = {
  data: BrandType[] | BrandCar[],
  title: string
};

const TypeConditions = {
  cityId: 10201,
  serviceType: 1,
  appCode: 101,
  lcb_client_id: "62e9a50f-94d1-46a6-a9e1-c0b204794193",
  lcb_request_id: "d33a4e0f-a826-4555-bea2-13014f0f0f9e",
  lcb_h5_v: "4.1.0"
};

class BrandStore {
  @observable brandTypes: Section[] = [];
  @observable cars: Section[] = [];

  @observable showBrandFilter: boolean = false;
  @observable showBrandSorter: boolean = false;

  @action
  listBrandTypes() {
    server
      .post(API_FIRST_LEVEL_BRAND_TYPE, TypeConditions)
      .then(response => response.json())
      .then(data => {
        this.brandTypes = this.parseTypesToSection(data.result);
        console.log("this.brandTypes : -- ", this.brandTypes);
      })
      .catch(error => {
        console.log("-----------", error);
        Alert.alert("提示", "获取车辆品牌类型失败");
      });
  }
  @action
  listBrandCarsByType(brandId: number) {
    server
      .post(API_BRAND_PRODUCER_CAR, { ...TypeConditions, brandId })
      .then(response => response.json())
      .then(data => {
        this.cars = this.parseCarsToSection(data.result);
      })
      .catch(error => {
        console.log("-----------", error);
        Alert.alert("提示", "获取品牌下汽车类型失败");
      });
  }

  @action
  toggleBrandFilter() {
    if (this.showBrandSorter) {
      this.toggleBrandSorter();
    }
    this.showBrandFilter = !this.showBrandFilter;
  }
  @action
  toggleBrandSorter() {
    if (this.showBrandFilter) {
      this.toggleBrandFilter();
    }
    this.showBrandSorter = !this.showBrandSorter;
  }

  parseTypesToSection(results: ResultBrandType[] = []): Section {
    return results.map(item => {
      //   console.log("item.results length ; ", item.results.length);
      return {
        data: item.results,
        title: item.pinYin
      };
    });
  }

  parseCarsToSection(results: ResultBrandCar[] = []): Section {
    return results.map(item => ({
      data: item.brandProduceCar,
      title: item.producerName,
      id: item.id
    }));
  }
}

const brandStore = new BrandStore();
export default brandStore;
export { BrandStore };
