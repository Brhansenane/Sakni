import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  FlatList,
  Dimensions,
  Animated,
} from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image } from "expo-image";
import { ChevronRight } from "lucide-react-native";
import Colors from "@/constants/colors";

const { width } = Dimensions.get("window");

interface OnboardingSlide {
  id: string;
  title: string;
  description: string;
  image: string;
}

const slides: OnboardingSlide[] = [
  {
    id: "1",
    title: "Find Your Dream Home",
    description: "Browse thousands of apartments in top locations with detailed information and high-quality photos.",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
  },
  {
    id: "2",
    title: "Schedule Viewings",
    description: "Book apartment viewings directly through the app and get instant confirmations.",
    image: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
  },
  {
    id: "3",
    title: "Secure Your Apartment",
    description: "Complete the rental process seamlessly with our integrated booking and payment system.",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef<FlatList>(null);

  const viewableItemsChanged = useRef(({ viewableItems }: any) => {
    setCurrentIndex(viewableItems[0].index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollTo = () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      router.push("/login");
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.skipContainer}>
        <Pressable onPress={() => router.push("/login")}>
          <Text style={styles.skipText}>Skip</Text>
        </Pressable>
      </View>

      <FlatList
        data={slides}
        renderItem={({ item }) => (
          <View style={styles.slide}>
            <Image source={{ uri: item.image }} style={styles.image} contentFit="cover" />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          </View>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        bounces={false}
        keyExtractor={(item) => item.id}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        ref={slidesRef}
      />

      <View style={styles.footer}>
        <View style={styles.indicatorContainer}>
          {slides.map((_, index) => {
            const inputRange = [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ];

            const dotWidth = scrollX.interpolate({
              inputRange,
              outputRange: [8, 16, 8],
              extrapolate: "clamp",
            });

            const opacity = scrollX.interpolate({
              inputRange,
              outputRange: [0.3, 1, 0.3],
              extrapolate: "clamp",
            });

            return (
              <Animated.View
                key={index.toString()}
                style={[
                  styles.indicator,
                  { width: dotWidth, opacity },
                ]}
              />
            );
          })}
        </View>

        <Pressable style={styles.nextButton} onPress={scrollTo}>
          <Text style={styles.nextButtonText}>
            {currentIndex === slides.length - 1 ? "Get Started" : "Next"}
          </Text>
          <ChevronRight size={20} color="white" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  skipContainer: {
    position: "absolute",
    top: 50,
    right: 20,
    zIndex: 10,
  },
  skipText: {
    fontSize: 16,
    color: Colors.light.primary,
    fontWeight: "600",
  },
  slide: {
    width,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "60%",
  },
  textContainer: {
    flex: 0.4,
    alignItems: "center",
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.light.text,
    marginBottom: 16,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: Colors.light.subtext,
    textAlign: "center",
    lineHeight: 24,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  indicatorContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  indicator: {
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.light.primary,
    marginHorizontal: 4,
  },
  nextButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  nextButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
    marginRight: 4,
  },
});