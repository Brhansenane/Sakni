import React, { useState } from "react";
import { StyleSheet, View, ScrollView, Text, Pressable, Modal } from "react-native";
import { apartments } from "@/mocks/apartments";
import ApartmentList from "@/components/ApartmentList";
import SearchBar from "@/components/SearchBar";
import FilterModal from "@/components/FilterModal";
import MapView from "@/components/MapView";
import { Map, List } from "lucide-react-native";
import Colors from "@/constants/colors";

// Get unique cities from apartments
const cities = [...new Set(apartments.map((apt) => apt.location.city))];

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [showMap, setShowMap] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 5000,
    bedrooms: 0,
    bathrooms: 0,
  });

  const handleCitySelect = (city: string) => {
    setSelectedCity(selectedCity === city ? null : city);
  };

  const toggleView = () => {
    setShowMap(!showMap);
  };

  const filteredApartments = apartments.filter((apartment) => {
    const matchesSearch =
      apartment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apartment.location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apartment.location.neighborhood.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCity = selectedCity ? apartment.location.city === selectedCity : true;
    
    const matchesPrice = 
      apartment.price >= filters.minPrice && 
      apartment.price <= filters.maxPrice;
    
    const matchesBedrooms = 
      filters.bedrooms === 0 || apartment.bedrooms >= filters.bedrooms;
    
    const matchesBathrooms = 
      filters.bathrooms === 0 || apartment.bathrooms >= filters.bathrooms;

    return matchesSearch && matchesCity && matchesPrice && matchesBedrooms && matchesBathrooms;
  });

  return (
    <View style={styles.container}>
      <SearchBar
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholder="Search apartments..."
        onFilterPress={() => setShowFilters(true)}
      />

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.cityFiltersContainer}
      >
        {cities.map((city) => (
          <Pressable
            key={city}
            style={[
              styles.cityFilter,
              selectedCity === city && styles.cityFilterSelected,
            ]}
            onPress={() => handleCitySelect(city)}
          >
            <Text
              style={[
                styles.cityFilterText,
                selectedCity === city && styles.cityFilterTextSelected,
              ]}
            >
              {city}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <View style={styles.viewToggleContainer}>
        <Text style={styles.resultsText}>
          {filteredApartments.length} {filteredApartments.length === 1 ? "result" : "results"}
        </Text>
        <Pressable style={styles.viewToggleButton} onPress={toggleView}>
          {showMap ? (
            <List size={20} color={Colors.light.primary} />
          ) : (
            <Map size={20} color={Colors.light.primary} />
          )}
          <Text style={styles.viewToggleText}>
            {showMap ? "List View" : "Map View"}
          </Text>
        </Pressable>
      </View>

      {showMap ? (
        <MapView apartments={filteredApartments} />
      ) : (
        <ApartmentList
          apartments={filteredApartments}
          title="Search Results"
          emptyMessage="No apartments match your search criteria"
        />
      )}

      <FilterModal
        visible={showFilters}
        onClose={() => setShowFilters(false)}
        filters={filters}
        onApplyFilters={setFilters}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    paddingTop: 16,
  },
  cityFiltersContainer: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  cityFilter: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.light.card,
    marginRight: 8,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  cityFilterSelected: {
    backgroundColor: Colors.light.primary,
    borderColor: Colors.light.primary,
  },
  cityFilterText: {
    fontSize: 14,
    color: Colors.light.text,
  },
  cityFilterTextSelected: {
    color: "white",
    fontWeight: "500",
  },
  viewToggleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  resultsText: {
    fontSize: 14,
    color: Colors.light.subtext,
  },
  viewToggleButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(74, 128, 240, 0.1)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  viewToggleText: {
    fontSize: 14,
    color: Colors.light.primary,
    fontWeight: "500",
    marginLeft: 6,
  },
});