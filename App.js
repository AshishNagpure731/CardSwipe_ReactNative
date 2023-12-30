import React, { useCallback, useEffect, useRef, useState } from "react";
import { StyleSheet, View, Text, Animated, PanResponder } from "react-native";
import Card from "./Component/Card";

export default function App() {
  const [data, setdata] = useState([
    { id: 1, Color: "#4ad7f0" },
    { id: 2, Color: "#4af0a8" },
    { id: 3, Color: "#f0e24a" },
    { id: 4, Color: "#834bcc" },
  ]);
  useEffect(() => {
    if (!data.length) {
      setdata([
        { id: 1, Color: "#4ad7f0" },
        { id: 2, Color: "#4af0a8" },
        { id: 3, Color: "#f0e24a" },
        { id: 4, Color: "#834bcc" },
      ]);
    }
  }, [data]);

  const swipe = useRef(new Animated.ValueXY()).current;
  const panresponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => {
      return true;
    },
    onPanResponderMove: (_, { dx, dy }) => {
      console.log("Dx " + dx);
      swipe.setValue({ x: dx, y: dy });
    },
    onPanResponderRelease: (_, { dx, dy }) => {
      console.log("Released: dx " + dx);
      let direction = Math.sign(dx);
      let IsActionActive = Math.abs(dx) > 200;
      if (IsActionActive) {
        Animated.timing(swipe, {
          toValue: { x: 500 * dx, y: dy },
          useNativeDriver: true,
          duration: 300,
        }).start(removeCard);
      } else {
        Animated.spring(swipe, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: true,
          friction: 5,
        }).start();
      }
    },
  });
  const removeCard = useCallback(() => {
    setdata((prev) => prev.slice(1));
    swipe.setValue({ x: 0, y: 0 });
  }, [swipe]);

  return (
    <View style={styles.container}>
      {data
        .map((e, i) => {
          let isFirst = i === 0;
          let drageHandler = isFirst ? panresponder.panHandlers : {};

          return (
            <Card item={e} isFirst={isFirst} swipe={swipe} {...drageHandler} />
          );
        })
        .reverse()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
