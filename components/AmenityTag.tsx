import React from "react";
import { StyleSheet, View, Text } from "react-native";
import Colors from "@/constants/colors";

interface AmenityTagProps {
  label: string;
}

export default function AmenityTag({ label }: AmenityTagProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.card,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: Colors.light.text,
  },
});