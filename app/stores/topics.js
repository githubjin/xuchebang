/**
 * @flow
 */
import { observable, action, computed } from "mobx";
import { Alert, ListView } from "react-native";

const uri =
  "https://news.lechebang.com/article/refresh?ref_limit=30&top_limit=3&appCode=101&lcb_client_id=2a1c77e1-cedc-4294-87d2-1ae8aebdb747&lcb_request_id=416cf925-382d-4bc7-96ab-5911463b6a63";

type Article = {
  id: number,
  title: string,
  type: string,
  description: string,
  source: string,
  label: string,
  preview_img_id: number,
  release_time: number,
  is_top: number,
  page_view: number,
  preview_img: string,
  preview_type: number,
  preview_large_img: string,
  preview_list_img: string,
  share_url: string,
  author: string
};

type ResponseData = {
  costTime: number,
  msg: string,
  result: {
    article_list: Article[]
  },
  statusCode: number,
  resultCode: number
};

class TopicStore {
  @observable topics: Article[] = [];
  _topicDs = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

  @action
  loadMore() {
    fetch(uri)
      .then(response => response.json())
      .then((data: ResponseData) => {
        // console.log("data", data);
        this.topics = this.topics.concat(data.result.article_list);
      })
      .catch(error => {
        console.log(uri, error);
        Alert.alert("提示", "查询头条信息失败！");
      });
  }

  @computed
  get topicDs() {
    console.log("this.topics", this.topics);
    return this._topicDs.cloneWithRows(this.topics.slice());
  }
}

const topicStore = new TopicStore();
export default topicStore;
export { TopicStore };
