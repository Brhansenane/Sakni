import React from "react";
import { StyleSheet, View, Text, FlatList, Dimensions } from "react-native";
import ApartmentCard from "./ApartmentCard";
import { Apartment } from "@/types/apartment";
import Colors from "@/constants/colors";

interface FeaturedApartmentsProps {
  apartments: Apartment[];
  title: string;
}

const { width } = Dimensions.get("window");
const cardWidth = width - 32; // Full width minus padding

export default function FeaturedApartments({ apartments, title }: FeaturedApartmentsProps) {
  const featuredApartments = apartments.filter((apt) => apt.featured);

  if (featuredApartments.length === 0) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        data={featuredApartments}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={cardWidth + 16}
        decelerationRate="fast"
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <ApartmentCard apartment={item} featured />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
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
  },
  cardContainer: {
    width: cardWidth,
    marginRight: 16,
  },
});