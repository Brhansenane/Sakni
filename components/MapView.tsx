import React, { useState } from "react";
import { StyleSheet, View, Text, Dimensions, Platform } from "react-native";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import { MapPin } from "lucide-react-native";
import Colors from "@/constants/colors";
import { Apartment } from "@/types/apartment";

interface MapViewProps {
  apartments: Apartment[];
}

const { width, height } = Dimensions.get("window");

export default function MapView({ apartments }: MapViewProps) {
  const router = useRouter();
  const [selectedApartment, setSelectedApartment] = useState<Apartment | null>(null);

  // This is a mock map view since we can't use actual maps without native modules
  // In a real app, you would use react-native-maps or similar

  const handleMarkerPress = (apartment: Apartment) => {
    setSelectedApartment(apartment);
  };

  const handleCardPress = (id: string) => {
    router.push(`/apartment/${id}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <Image
          source={{ uri: "https://images.unsplash.com/photo-1569336415962-a4bd9f69c07a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" }}
          style={styles.mapImage}
          contentFit="cover"
        />
        
        {/* Mock map markers */}
        {apartments.map((apartment) => (
          <View
            key={apartment.id}
            style={[
              styles.marker,
              {
                left: `${30 + Math.random() * 40}%`,
                top: `${20 + Math.random() * 50}%`,
              },
              selectedApartment?.id === apartment.id && styles.selectedMarker,
            ]}
            onTouchEnd={() => handleMarkerPress(apartment)}
          >
            <MapPin
              size={24}
              color={selectedApartment?.id === apartment.id ? "white" : Colors.light.primary}
              fill={selectedApartment?.id === apartment.id ? Colors.light.primary : "white"}
            />
            {selectedApartment?.id === apartment.id && (
              <View style={styles.markerPrice}>
                <Text style={styles.markerPriceText}>${apartment.price}</Text>
              </View>
            )}
          </View>
        ))}
      </View>

      {selectedApartment && (
        <View style={styles.previewCard} onTouchEnd={() => handleCardPress(selectedApartment.id)}>
          <Image
            source={{ uri: selectedApartment.images[0] }}
            style={styles.previewImage}
            contentFit="cover"
          />
          <View style={styles.previewInfo}>
            <Text style={styles.previewTitle} numberOfLines={1}>
              {selectedApartment.title}
            </Text>
            <Text style={styles.previewLocation} numberOfLines={1}>
              {selectedApartment.location.neighborhood}, {selectedApartment.location.city}
            </Text>
            <Text style={styles.previewPrice}>
              ${selectedApartment.price}
              <Text style={styles.previewPriceUnit}> /month</Text>
            </Text>
          </View>
        </View>
      )}

      <View style={styles.disclaimer}>
        <Text style={styles.disclaimerText}>
          This is a mock map view. In a real app, this would use react-native-maps.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  mapContainer: {
    flex: 1,
    overflow: "hidden",
  },
  mapImage: {
    width: "100%",
    height: "100%",
  },
  marker: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "white",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
      web: {
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
      },
    }),
  },
  selectedMarker: {
    backgroundColor: Colors.light.primary,
    transform: [{ scale: 1.2 }],
    zIndex: 10,
  },
  markerPrice: {
    position: "absolute",
    top: -30,
    backgroundColor: "white",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      },
    }),
  },
  markerPriceText: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.light.text,
  },
  previewCard: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    height: 100,
    backgroundColor: "white",
    borderRadius: 12,
    flexDirection: "row",
    overflow: "hidden",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 5,
      },
      web: {
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      },
    }),
  },
  previewImage: {
    width: 100,
    height: "100%",
  },
  previewInfo: {
    flex: 1,
    padding: 12,
    justifyContent: "space-between",
  },
  previewTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.light.text,
  },
  previewLocation: {
    fontSize: 14,
    color: Colors.light.subtext,
  },
  previewPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.light.text,
  },
  previewPriceUnit: {
    fontSize: 14,
    fontWeight: "400",
    color: Colors.light.subtext,
  },
  disclaimer: {
    position: "absolute",
    top: 10,
    left: 10,
    right: 10,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 8,
    borderRadius: 8,
  },
  disclaimerText: {
    color: "white",
    fontSize: 12,
    textAlign: "center",
  },
});