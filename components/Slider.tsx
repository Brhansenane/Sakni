import React, { useState, useRef } from "react";
import { StyleSheet, View, PanResponder, Animated, Dimensions } from "react-native";
import Colors from "@/constants/colors";

interface SliderProps {
  min: number;
  max: number;
  step: number;
  values: number[];
  onValuesChange: (values: number[]) => void;
}

const { width: screenWidth } = Dimensions.get("window");
const TRACK_WIDTH = screenWidth - 60;
const THUMB_SIZE = 24;

export default function Slider({ min, max, step, values, onValuesChange }: SliderProps) {
  // Keep track of current positions separately from animated values
  const [currentPositions, setCurrentPositions] = useState([
    ((values[0] - min) / (max - min)) * TRACK_WIDTH,
    ((values[1] - min) / (max - min)) * TRACK_WIDTH,
  ]);
  
  const [thumbPositions] = useState([
    new Animated.Value(currentPositions[0]),
    new Animated.Value(currentPositions[1]),
  ]);

  const createPanResponder = (index: number) => {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gestureState) => {
        const newPosition = currentPositions[index] + gestureState.dx;
        const boundedPosition = Math.max(
          0,
          Math.min(newPosition, TRACK_WIDTH)
        );
        
        // Prevent thumbs from crossing
        if (
          (index === 0 && boundedPosition <= currentPositions[1]) ||
          (index === 1 && boundedPosition >= currentPositions[0])
        ) {
          // Update the animated value
          thumbPositions[index].setValue(boundedPosition);
          
          // Update our tracked position
          const newPositions = [...currentPositions];
          newPositions[index] = boundedPosition;
          setCurrentPositions(newPositions);
          
          // Calculate new value based on position
          const newValue = min + Math.round(((boundedPosition / TRACK_WIDTH) * (max - min)) / step) * step;
          const newValues = [...values];
          newValues[index] = newValue;
          onValuesChange(newValues);
        }
      },
      onPanResponderRelease: () => {},
    });
  };

  const panResponders = [
    createPanResponder(0),
    createPanResponder(1),
  ];

  const leftThumbStyle = {
    transform: [{ translateX: thumbPositions[0] }],
  };

  const rightThumbStyle = {
    transform: [{ translateX: thumbPositions[1] }],
  };

  const selectedRangeStyle = {
    left: thumbPositions[0],
    right: Animated.subtract(TRACK_WIDTH, thumbPositions[1]),
  };

  return (
    <View style={styles.container}>
      <View style={styles.track} />
      <Animated.View style={[styles.selectedRange, selectedRangeStyle]} />
      <Animated.View
        style={[styles.thumb, leftThumbStyle]}
        {...panResponders[0].panHandlers}
      />
      <Animated.View
        style={[styles.thumb, rightThumbStyle]}
        {...panResponders[1].panHandlers}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: THUMB_SIZE,
    width: TRACK_WIDTH,
    marginHorizontal: 10,
    justifyContent: "center",
  },
  track: {
    height: 4,
    width: "100%",
    backgroundColor: Colors.light.border,
    borderRadius: 2,
  },
  selectedRange: {
    height: 4,
    position: "absolute",
    backgroundColor: Colors.light.primary,
  },
  thumb: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    backgroundColor: Colors.light.primary,
    position: "absolute",
    top: 0,
    marginLeft: -THUMB_SIZE / 2,
    marginTop: -THUMB_SIZE / 2 + 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
});