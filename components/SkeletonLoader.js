import React, { useEffect, useRef } from "react";
import { View, Animated, Easing } from "react-native";

const SkeletonLoader = ({ width, height, borderRadius = 8 }) => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const shimmerTranslate = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-50, 150], // Move shimmer left to right
  });

  return (
    <View
    style={{
      backgroundColor: "#e0e0e0",
      overflow: "hidden",
      borderRadius,
      width,
      height,
    }}
  >
    <Animated.View
      style={{
        width: "100%",
        height: "100%",
        transform: [{ translateX: shimmerTranslate }],
        backgroundColor: "rgba(255, 255, 255, 0.3)",
        opacity: 0.5,
      }}
    />
  </View>
  );
};


export default SkeletonLoader;