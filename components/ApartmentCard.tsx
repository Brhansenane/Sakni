import React from "react";
import { StyleSheet, View, Text, Pressable, Platform } from "react-native";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { Heart, Star } from "lucide-react-native";
import Colors from "@/constants/colors";
import { useFavoritesStore } from "@/hooks/use-favorites-store";
import { Apartment } from "@/types/apartment";

interface ApartmentCardProps {
  apartment: Apartment;
  featured?: boolean;
}

export default function ApartmentCard({ apartment, featured = false }: ApartmentCardProps) {
  const router = useRouter();
  const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore();
  const favorite = isFavorite(apartment.id);

  const handlePress = () => {
    router.push(`/apartment/${apartment.id}`);
  };

  const toggleFavorite = (e: any) => {
    e.stopPropagation();
    if (favorite) {
      removeFavorite(apartment.id);
    } else {
      addFavorite(apartment.id);
    }
  };

  return (
    <Pressable
      style={[styles.container, featured && styles.featuredContainer]}
      onPress={handlePress}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: apartment.images[0] }}
          style={styles.image}
          contentFit="cover"
          transition={200}
        />
        <Pressable
          style={styles.favoriteButton}
          onPress={toggleFavorite}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Heart
            size={22}
            color={favorite ? Colors.light.error : "white"}
            fill={favorite ? Colors.light.error : "transparent"}
          />
        </Pressable>
        {apartment.host.superhost && (
          <View style={styles.superhostBadge}>
            <Text style={styles.superhostText}>Superhost</Text>
          </View>
        )}
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.locationRow}>
          <Text style={styles.location} numberOfLines={1}>
            {apartment.location.neighborhood}, {apartment.location.city}
          </Text>
          <View style={styles.ratingContainer}>
            <Star size={14} color={Colors.light.rating} fill={Colors.light.rating} />
            <Text style={styles.rating}>{apartment.rating}</Text>
          </View>
        </View>
        <Text style={styles.title} numberOfLines={featured ? 2 : 1}>
          {apartment.title}
        </Text>
        <View style={styles.detailsRow}>
          <Text style={styles.details}>
            {apartment.bedrooms} {apartment.bedrooms === 1 ? "bed" : "beds"} · {apartment.bathrooms}{" "}
            {apartment.bathrooms === 1 ? "bath" : "baths"} · {apartment.size} m²
          </Text>
        </View>
        <Text style={styles.price}>
          <Text style={styles.priceValue}>
            ${apartment.price}
          </Text>
          <Text style={styles.priceUnit}> /month</Text>
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.light.background,
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: Colors.light.shadow,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
      web: {
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
      },
    }),
  },
  featuredContainer: {
    marginBottom: 24,
  },
  imageContainer: {
    position: "relative",
    height: 200,
  },
  image: {
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  favoriteButton: {
    position: "absolute",
    top: 12,
    right: 12,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    borderRadius: 50,
    padding: 8,
    zIndex: 1,
  },
  superhostBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: Colors.light.background,
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  superhostText: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.light.text,
  },
  infoContainer: {
    padding: 16,
  },
  locationRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  location: {
    fontSize: 14,
    color: Colors.light.subtext,
    flex: 1,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rating: {
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 4,
    color: Colors.light.text,
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
    color: Colors.light.text,
  },
  detailsRow: {
    marginBottom: 8,
  },
  details: {
    fontSize: 14,
    color: Colors.light.subtext,
  },
  price: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  priceValue: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.light.text,
  },
  priceUnit: {
    fontSize: 14,
    color: Colors.light.subtext,
  },
});