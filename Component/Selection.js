import { View, Text, Image } from "react-native";
import React from "react";

const Selection = ({ type }) => {
  return (
    <View>
      {type === "Like" ? (
        <Image
          style={{ width: 90, height: 90 }}
          source={require("../assets/right.png")}
        />
      ) : (
        <Image
          style={{ width: 90, height: 90 }}
          source={require("../assets/wrong.png")}
        />
      )}
    </View>
  );
};

export default Selection;
