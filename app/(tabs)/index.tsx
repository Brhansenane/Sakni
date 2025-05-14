import React, { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { apartments } from "@/mocks/apartments";
import FeaturedApartments from "@/components/FeaturedApartments";
import ApartmentList from "@/components/ApartmentList";
import SearchBar from "@/components/SearchBar";
import Colors from "@/constants/colors";

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredApartments = apartments.filter(
    (apartment) =>
      apartment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apartment.location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apartment.location.neighborhood.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search by city, neighborhood..."
        />
        <FeaturedApartments
          apartments={filteredApartments}
          title="Featured Apartments"
        />
        <ApartmentList
          apartments={filteredApartments}
          title="All Apartments"
          emptyMessage="No apartments match your search"
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  scrollContent: {
    paddingTop: 16,
    paddingBottom: 40,
  },
});