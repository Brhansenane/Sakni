import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Pressable,
  Dimensions,
  Platform,
} from "react-native";
import { useLocalSearchParams, Stack, useRouter } from "expo-router";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import {
  Heart,
  Star,
  ChevronLeft,
  Share2,
  Bed,
  Bath,
  SquareIcon,
  MapPin,
  User,
} from "lucide-react-native";
import Colors from "@/constants/colors";
import { apartments } from "@/mocks/apartments";
import { useFavoritesStore } from "@/hooks/use-favorites-store";
import AmenityTag from "@/components/AmenityTag";

const { width } = Dimensions.get("window");

export default function ApartmentDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { isFavorite, addFavorite, removeFavorite } = useFavoritesStore();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const apartment = apartments.find((apt) => apt.id === id);

  if (!apartment) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>Apartment not found</Text>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </Pressable>
      </View>
    );
  }

  const favorite = isFavorite(apartment.id);

  const toggleFavorite = () => {
    if (favorite) {
      removeFavorite(apartment.id);
    } else {
      addFavorite(apartment.id);
    }
  };

  const handleShare = () => {
    // Share functionality would go here
    console.log("Share apartment:", apartment.title);
  };

  const handleImageChange = (index: number) => {
    setCurrentImageIndex(index);
  };

  const handleBookViewing = () => {
    router.push(`/booking/${apartment.id}`);
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <StatusBar style="light" />
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: apartment.images[currentImageIndex] }}
            style={styles.mainImage}
            contentFit="cover"
          />
          <View style={styles.imageIndicators}>
            {apartment.images.map((_, index) => (
              <Pressable
                key={index}
                style={[
                  styles.indicator,
                  index === currentImageIndex && styles.activeIndicator,
                ]}
                onPress={() => handleImageChange(index)}
              />
            ))}
          </View>
          <View style={styles.headerButtons}>
            <Pressable
              style={styles.headerButton}
              onPress={() => router.back()}
            >
              <ChevronLeft size={24} color="white" />
            </Pressable>
            <View style={styles.headerRightButtons}>
              <Pressable style={styles.headerButton} onPress={handleShare}>
                <Share2 size={22} color="white" />
              </Pressable>
              <Pressable style={styles.headerButton} onPress={toggleFavorite}>
                <Heart
                  size={22}
                  color="white"
                  fill={favorite ? "white" : "transparent"}
                />
              </Pressable>
            </View>
          </View>
        </View>

        <ScrollView
          style={styles.detailsContainer}
          contentContainerStyle={styles.detailsContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{apartment.title}</Text>
            <View style={styles.locationContainer}>
              <MapPin size={16} color={Colors.light.subtext} />
              <Text style={styles.location}>
                {apartment.location.neighborhood}, {apartment.location.city}
              </Text>
            </View>
          </View>

          <View style={styles.ratingContainer}>
            <Star size={18} color={Colors.light.rating} fill={Colors.light.rating} />
            <Text style={styles.rating}>
              {apartment.rating} · {apartment.reviews} reviews
            </Text>
          </View>

          <View style={styles.divider} />

          <View style={styles.featuresContainer}>
            <View style={styles.featureItem}>
              <Bed size={22} color={Colors.light.text} />
              <Text style={styles.featureText}>
                {apartment.bedrooms} {apartment.bedrooms === 1 ? "Bedroom" : "Bedrooms"}
              </Text>
            </View>
            <View style={styles.featureItem}>
              <Bath size={22} color={Colors.light.text} />
              <Text style={styles.featureText}>
                {apartment.bathrooms} {apartment.bathrooms === 1 ? "Bathroom" : "Bathrooms"}
              </Text>
            </View>
            <View style={styles.featureItem}>
              <SquareIcon size={22} color={Colors.light.text} />
              <Text style={styles.featureText}>{apartment.size} m²</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.hostContainer}>
            <View style={styles.hostInfo}>
              <Image
                source={{ uri: apartment.host.avatar }}
                style={styles.hostAvatar}
                contentFit="cover"
              />
              <View>
                <Text style={styles.hostedBy}>
                  Hosted by {apartment.host.name}
                </Text>
                {apartment.host.superhost && (
                  <View style={styles.superhostBadge}>
                    <Text style={styles.superhostText}>Superhost</Text>
                  </View>
                )}
              </View>
            </View>
            <Pressable style={styles.contactButton}>
              <Text style={styles.contactButtonText}>Contact</Text>
            </Pressable>
          </View>

          <View style={styles.divider} />

          <View>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{apartment.description}</Text>
          </View>

          <View style={styles.divider} />

          <View>
            <Text style={styles.sectionTitle}>Amenities</Text>
            <View style={styles.amenitiesContainer}>
              {apartment.amenities.map((amenity) => (
                <AmenityTag key={amenity} label={amenity} />
              ))}
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>
              ${apartment.price}
              <Text style={styles.priceUnit}> /month</Text>
            </Text>
          </View>
          <Pressable style={styles.bookButton} onPress={handleBookViewing}>
            <Text style={styles.bookButtonText}>Book Viewing</Text>
          </Pressable>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  notFoundText: {
    fontSize: 18,
    marginBottom: 20,
    color: Colors.light.text,
  },
  backButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.light.primary,
    borderRadius: 8,
  },
  backButtonText: {
    color: "white",
    fontWeight: "600",
  },
  imageContainer: {
    height: 300,
    width: "100%",
    position: "relative",
  },
  mainImage: {
    width: "100%",
    height: "100%",
  },
  imageIndicators: {
    position: "absolute",
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    marginHorizontal: 4,
  },
  activeIndicator: {
    backgroundColor: "white",
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  headerButtons: {
    position: "absolute",
    top: Platform.OS === "ios" ? 50 : 20,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
  },
  headerRightButtons: {
    flexDirection: "row",
  },
  detailsContainer: {
    flex: 1,
  },
  detailsContent: {
    padding: 20,
    paddingBottom: 100,
  },
  titleContainer: {
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.light.text,
    marginBottom: 8,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  location: {
    fontSize: 16,
    color: Colors.light.subtext,
    marginLeft: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  rating: {
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 6,
    color: Colors.light.text,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.light.border,
    marginVertical: 16,
  },
  featuresContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  featureItem: {
    alignItems: "center",
  },
  featureText: {
    fontSize: 14,
    color: Colors.light.text,
    marginTop: 8,
  },
  hostContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  hostInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  hostAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  hostedBy: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.light.text,
    marginBottom: 4,
  },
  superhostBadge: {
    backgroundColor: Colors.light.card,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  superhostText: {
    fontSize: 12,
    fontWeight: "500",
    color: Colors.light.text,
  },
  contactButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.light.primary,
  },
  contactButtonText: {
    color: Colors.light.primary,
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.light.text,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: Colors.light.text,
  },
  amenitiesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.light.background,
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    ...Platform.select({
      ios: {
        shadowColor: Colors.light.shadow,
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  priceContainer: {
    flex: 1,
  },
  price: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.light.text,
  },
  priceUnit: {
    fontSize: 16,
    fontWeight: "400",
    color: Colors.light.subtext,
  },
  bookButton: {
    backgroundColor: Colors.light.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  bookButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});