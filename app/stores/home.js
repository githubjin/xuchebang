/**
 * @flow
 */
import { observable, action } from "mobx";
import { API_HOME_DATA } from "../constants/apis";
import * as server from "../services/server";

import { HOME_DATA } from "./json/homeData";
import type { BrandsMinPrice } from "../types";

const options = {
  minResultCount: 5,
  page: { currentPage: 1, pageSize: 5 },
  queryType: 1,
  recommended: true,
  appCode: 101,
  lcb_client_id: "712fd85e-77f0-4bda-96e4-6fa5b06b8dde",
  lcb_request_id: "bea81af6-1cc1-43d7-9393-cfb9eea38388",
  lcb_h5_v: "4.1.0"
};

class HomeStore {
  @observable brandsMinPrices: BrandsMinPrices[];
  @action
  getHomeData(): void {
    setTimeout(() => {
      this.brandsMinPrices = HOME_DATA.result.brandsMinPrice;
    }, 100);
  }
  @action
  getOrderHyperCommentList(): void {
    server
      .post("ord_comment/getOrderHyperCommentList", options)
      .then((response: Response) => response.json())
      .then(data => {
        // console.log(JSON.stringify(data));
      })
      .catch(error => {
        // console.log("eeror : ", error);
      });
  }
}

const homeStore = new HomeStore();
export default homeStore;
export { HomeStore };
