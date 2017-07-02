/**
 * @flow
 */
import { observable, action, computed } from "mobx";
import { ListView, Alert } from "react-native";
import _ from "lodash/array";
import { API_HOME_DATA } from "../constants/apis";
import * as server from "../services/server";

import { HOME_DATA } from "./json/homeData";
import type { BrandsMinPrice, Comment, PageInfo } from "../types";

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
function createCommentQueryCondition(currentPage: number): Object {
  return {
    minResultCount: 5,
    page: { currentPage, pageSize: 5 },
    queryType: 1,
    recommended: true,
    appCode: 101,
    lcb_client_id: "712fd85e-77f0-4bda-96e4-6fa5b06b8dde",
    lcb_request_id: "bea81af6-1cc1-43d7-9393-cfb9eea38388",
    lcb_h5_v: "4.1.0"
  };
}

class HomeStore {
  @observable brandsMinPrices: BrandsMinPrices[] = [];
  @observable comments: Comment[] = [];
  pageInfo: PageInfo = { currentPage: 0 };

  commentDs = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

  @computed
  get commentDataSource() {
    // console.log("this.comments", this.comments);
    return this.commentDs.cloneWithRows(
      this.comments ? this.comments.slice() : []
    );
  }

  @action
  getHomeData(): void {
    setTimeout(() => {
      this.brandsMinPrices = HOME_DATA.result.brandsMinPrice;
    }, 100);
  }
  @action
  getOrderHyperCommentList(): void {
    server
      .post(
        "ord_comment/getOrderHyperCommentList",
        createCommentQueryCondition(this.pageInfo.currentPage + 1)
      )
      .then((response: Response) => response.json())
      .then(data => {
        this.comments = this.comments.concat(data.result.lists);
        this.pageInfo = data.result.pageInfo;
        // console.log("评价", JSON.stringify(data));
      })
      .catch(error => {
        console.log("提示", error);
      });
  }
}

const homeStore = new HomeStore();
export default homeStore;
export { HomeStore };
