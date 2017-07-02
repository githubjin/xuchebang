/**z
 * @flow
 */
import React from "react";
import { View, ActivityIndicator } from "react-native";
function Loadding() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 100
      }}
    >
      <ActivityIndicator size="large" color="#32c8fa" />
    </View>
  );
}

export default Loadding;
