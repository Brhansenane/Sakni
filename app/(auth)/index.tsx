import React from "react";
import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "@/constants/colors";

export default function WelcomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
        }}
        style={styles.backgroundImage}
      />
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.8)"]}
        style={styles.gradient}
      />

      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>HomeRent</Text>
        </View>

        <View style={styles.welcomeContainer}>
          <Text style={styles.title}>Find Your Perfect Home</Text>
          <Text style={styles.subtitle}>
            Discover beautiful apartments and schedule viewings with just a few taps
          </Text>

          <View style={styles.buttonContainer}>
            <Pressable
              style={[styles.button, styles.primaryButton]}
              onPress={() => router.push("/login")}
            >
              <Text style={styles.primaryButtonText}>Log In</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.secondaryButton]}
              onPress={() => router.push("/register")}
            >
              <Text style={styles.secondaryButtonText}>Create Account</Text>
            </Pressable>
            <Pressable
              style={styles.tertiaryButton}
              onPress={() => router.push("/onboarding")}
            >
              <Text style={styles.tertiaryButtonText}>Take a Tour</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  backgroundImage: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "70%",
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
    padding: 24,
  },
  logoContainer: {
    marginTop: 60,
    alignItems: "center",
  },
  logoText: {
    fontSize: 32,
    fontWeight: "700",
    color: "white",
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  welcomeContainer: {
    marginBottom: 40,
  },
  title: {
    fontSize: 36,
    fontWeight: "700",
    color: "white",
    marginBottom: 12,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
    marginBottom: 32,
    lineHeight: 24,
    textShadowColor: "rgba(0, 0, 0, 0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  buttonContainer: {
    gap: 12,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButton: {
    backgroundColor: Colors.light.primary,
  },
  primaryButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  secondaryButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  tertiaryButton: {
    paddingVertical: 12,
    alignItems: "center",
  },
  tertiaryButtonText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 14,
    fontWeight: "500",
  },
});