import { View, Text, Animated } from "react-native";
import React, { useCallback } from "react";
import Selection from "./Selection";

const Card = ({ item, isFirst, swipe, ...rest }) => {
  const rotate = swipe.x.interpolate({
    inputRange: [-100, 0, 100],
    outputRange: ["-8deg", "0deg", "8deg"],
    extrapolate: "clamp",
  });
  const likeOpacity = swipe.x.interpolate({
    inputRange: [10, 100],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });
  const wrongOpacity = swipe.x.interpolate({
    inputRange: [-100, -10],
    outputRange: [1, 0],
    extrapolate: "clamp",
  });
  const cardselection = useCallback(() => {
    return (
      <>
        <Animated.View
          style={{ position: "absolute", left: 20, opacity: likeOpacity }}
        >
          <Selection type={"Like"} />
        </Animated.View>
        <Animated.View
          style={{ position: "absolute", right: 20, opacity: wrongOpacity }}
        >
          <Selection type={"Nope"} />
        </Animated.View>
      </>
    );
  }, []);
  return (
    <Animated.View
      key={item.id}
      style={[
        {
          flex: 1,
          top: 130 + item.id * 10,
          width: 350,
          height: 500,
          backgroundColor: item.Color,
          borderRadius: 7,
          position: "absolute",
          shadowOffset: {
            width: 3,
            height: 3,
          },
          shadowOpacity: 0.2,
          shadowColor: item.Color,
        },
        isFirst && {
          transform: [...swipe.getTranslateTransform(), { rotate: rotate }],
        },
      ]}
      {...rest}
    >
      {isFirst && cardselection()}
    </Animated.View>
  );
};

export default Card;
