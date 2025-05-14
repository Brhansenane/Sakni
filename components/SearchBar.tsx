import React from "react";
import { StyleSheet, View, TextInput, Pressable } from "react-native";
import { Search, Sliders } from "lucide-react-native";
import Colors from "@/constants/colors";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onFilterPress?: () => void;
  placeholder?: string;
}

export default function SearchBar({
  value,
  onChangeText,
  onFilterPress,
  placeholder = "Search apartments...",
}: SearchBarProps) {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Search size={20} color={Colors.light.subtext} style={styles.searchIcon} />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={Colors.light.subtext}
          value={value}
          onChangeText={onChangeText}
        />
      </View>
      {onFilterPress && (
        <Pressable style={styles.filterButton} onPress={onFilterPress}>
          <Sliders size={20} color={Colors.light.text} />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 48,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: 16,
    color: Colors.light.text,
  },
  filterButton: {
    marginLeft: 12,
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
});