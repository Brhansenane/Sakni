import React from "react";
import { StyleSheet, View, Text, FlatList } from "react-native";
import ApartmentCard from "./ApartmentCard";
import { Apartment } from "@/types/apartment";
import Colors from "@/constants/colors";

interface ApartmentListProps {
  apartments: Apartment[];
  title: string;
  emptyMessage?: string;
}

export default function ApartmentList({ 
  apartments, 
  title, 
  emptyMessage = "No apartments found" 
}: ApartmentListProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {apartments.length > 0 ? (
        <FlatList
          data={apartments}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          renderItem={({ item }) => <ApartmentCard apartment={item} />}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>{emptyMessage}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 16,
    paddingHorizontal: 16,
    color: Colors.light.text,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.light.subtext,
    textAlign: "center",
  },
});