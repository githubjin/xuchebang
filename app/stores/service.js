/**
 * https://m.lechebang.com/gateway/shop/getServiceNetList
 * @flow
 */
import { observable, action, computed } from "mobx";
import { ListView, Alert } from "react-native";

import type { ServiceNetType } from "../types";
import { API_4s_DATA } from "../constants/apis";
import * as server from "../services/server";

const conditions = {
  cityId: 10201,
  lat: 36.20482389343373,
  lon: 138.2529239999999,
  appCode: 101,
  lcb_client_id: "712fd85e-77f0-4bda-96e4-6fa5b06b8dde",
  lcb_request_id: "f3fe4b7b-519c-4216-b5fb-acc61391acad",
  lcb_h5_v: "4.1.0"
};

const PAGE_SIZE = 10;

class ServiceNet {
  @observable currentPage = 0;
  @observable reachEnd = false;

  storeDetailResults: ServiceNetType[] = [];
  totalPage = 0;
  snDs = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
  showedList: ServiceNetType[] = [];

  loadAll(): void {
    server
      .post(API_4s_DATA, conditions)
      .then((response: Response) => response.json())
      .then(data => {
        this.storeDetailResults = data.result.storeDetailResults;
        // 计算总页数
        this.totalPage =
          this.storeDetailResults.length / PAGE_SIZE +
          (this.storeDetailResults % PAGE_SIZE === 0 ? 0 : 1);
        // 显示第一页
        this.loadMore();
      })
      .catch(error => {
        console.log("提示", error);
      });
  }

  @action
  loadMore() {
    if (this.currentPage >= this.totalPage) {
      this.reachEnd = true;
    } else {
      this.currentPage += 1;
    }
  }

  @computed
  get serviceNetDs() {
    let start = (this.currentPage - 1) * PAGE_SIZE;
    let end = this.currentPage * PAGE_SIZE;
    if (end > this.storeDetailResults.length) {
      end = this.storeDetailResults.length;
    }
    this.showedList = this.showedList.concat(
      this.storeDetailResults.slice(start, end)
    );
    return this.snDs.cloneWithRows(this.showedList);
  }
}

const serviceNetStore = new ServiceNet();
export default serviceNetStore;

export { ServiceNet };
