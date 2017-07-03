var React = require("react");
var ReactNative = require("react-native");
var {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Share,
  PermissionsAndroid,
  Alert
} = ReactNative;

// exports.framework = "React";
// exports.title = "Share";
// exports.description = "Share data with other Apps.";
// exports.examples = [
//   {
//     title: "Share Text Content",
//     render() {
//       return <ShareMessageExample />;
//     }
//   }
// ];

export default class ShareMessageExample extends React.Component {
  _shareMessage: Function;
  _shareText: Function;
  _showResult: Function;
  state: any;

  constructor(props) {
    super(props);

    this._shareMessage = this._shareMessage.bind(this);
    this._shareText = this._shareText.bind(this);
    this._showResult = this._showResult.bind(this);

    this.state = {
      result: ""
    };
  }
  componentDidMount() {
    this.requestCameraPermission();
  }
  async requestCameraPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: "申请摄像头权限",
          message: "一个很牛逼的应用想借用你的摄像头，" + "然后你就可以拍出酷炫的皂片啦。"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert("现在你获得摄像头权限了");
      } else {
        Alert.alert("用户并没有开放该权限");
      }
    } catch (err) {
      Alert.alert("Alert", err);
    }
  }
  render() {
    return (
      <View>
        <TouchableHighlight style={styles.wrapper} onPress={this._shareMessage}>
          <View style={styles.button}>
            <Text>Click to share message</Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={styles.wrapper} onPress={this._shareText}>
          <View style={styles.button}>
            <Text>Click to share message, URL and title</Text>
          </View>
        </TouchableHighlight>
        <Text>
          {this.state.result}
        </Text>
      </View>
    );
  }

  _shareMessage() {
    Share.share({
      message: "React Native | A framework for building native apps using React"
    })
      .then(this._showResult)
      .catch(error => this.setState({ result: "error: " + error.message }));
  }

  _shareText() {
    Share.share(
      {
        message: "A framework for building native apps using React",
        url: "http://facebook.github.io/react-native/",
        title: "React Native"
      },
      {
        dialogTitle: "Share React Native website",
        excludedActivityTypes: ["com.apple.UIKit.activity.PostToTwitter"],
        tintColor: "green"
      }
    )
      .then(this._showResult)
      .catch(error => this.setState({ result: "error: " + error.message }));
  }

  _showResult(result) {
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        this.setState({
          result: "shared with an activityType: " + result.activityType
        });
      } else {
        this.setState({ result: "shared" });
      }
    } else if (result.action === Share.dismissedAction) {
      this.setState({ result: "dismissed" });
    }
  }
}

var styles = StyleSheet.create({
  wrapper: {
    borderRadius: 5,
    marginBottom: 5
  },
  button: {
    backgroundColor: "#eeeeee",
    padding: 10
  }
});
