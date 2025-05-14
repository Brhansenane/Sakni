import React from "react";
import { StyleSheet, View } from "react-native";
import { apartments } from "@/mocks/apartments";
import ApartmentList from "@/components/ApartmentList";
import { useFavoritesStore } from "@/hooks/use-favorites-store";
import Colors from "@/constants/colors";

export default function FavoritesScreen() {
  const { favorites } = useFavoritesStore();
  
  const favoriteApartments = apartments.filter((apartment) => 
    favorites.includes(apartment.id)
  );

  return (
    <View style={styles.container}>
      <ApartmentList
        apartments={favoriteApartments}
        title="Your Favorites"
        emptyMessage="You haven't saved any apartments yet"
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
});