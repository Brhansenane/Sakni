import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  Alert,
  Platform,
} from "react-native";
import { useLocalSearchParams, Stack, useRouter } from "expo-router";
import { Image } from "expo-image";
import { StatusBar } from "expo-status-bar";
import { Calendar, Clock, CreditCard, CheckCircle } from "lucide-react-native";
import Colors from "@/constants/colors";
import { apartments } from "@/mocks/apartments";

export default function BookingScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const apartment = apartments.find((apt) => apt.id === id);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [bookingComplete, setBookingComplete] = useState(false);

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

  const handleBooking = () => {
    if (!date || !time || !name || !email || !phone) {
      Alert.alert("Missing Information", "Please fill in all fields to continue.");
      return;
    }

    // In a real app, you would send this data to your backend
    console.log("Booking details:", { apartmentId: id, date, time, name, email, phone });
    
    // Show success state
    setBookingComplete(true);
  };

  const handleGoToHome = () => {
    router.push("/");
  };

  if (bookingComplete) {
    return (
      <View style={styles.successContainer}>
        <StatusBar style="dark" />
        <CheckCircle size={80} color={Colors.light.success} />
        <Text style={styles.successTitle}>Booking Confirmed!</Text>
        <Text style={styles.successMessage}>
          Your viewing for {apartment.title} has been scheduled for {date} at {time}.
        </Text>
        <Text style={styles.successDetails}>
          We've sent a confirmation email to {email} with all the details.
        </Text>
        <Pressable style={styles.homeButton} onPress={handleGoToHome}>
          <Text style={styles.homeButtonText}>Return to Home</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: "Schedule Viewing",
          headerBackTitle: "Details",
        }}
      />
      <StatusBar style="dark" />
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.apartmentPreview}>
          <Image
            source={{ uri: apartment.images[0] }}
            style={styles.apartmentImage}
            contentFit="cover"
          />
          <View style={styles.apartmentInfo}>
            <Text style={styles.apartmentTitle} numberOfLines={2}>
              {apartment.title}
            </Text>
            <Text style={styles.apartmentLocation}>
              {apartment.location.neighborhood}, {apartment.location.city}
            </Text>
            <Text style={styles.apartmentPrice}>
              ${apartment.price}
              <Text style={styles.apartmentPriceUnit}> /month</Text>
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Date & Time</Text>
          <View style={styles.inputContainer}>
            <Calendar size={20} color={Colors.light.subtext} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Select date (MM/DD/YYYY)"
              value={date}
              onChangeText={setDate}
              placeholderTextColor={Colors.light.subtext}
            />
          </View>
          <View style={styles.inputContainer}>
            <Clock size={20} color={Colors.light.subtext} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Select time"
              value={time}
              onChangeText={setTime}
              placeholderTextColor={Colors.light.subtext}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Information</Text>
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            value={name}
            onChangeText={setName}
            placeholderTextColor={Colors.light.subtext}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor={Colors.light.subtext}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            placeholderTextColor={Colors.light.subtext}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Payment Method</Text>
          <View style={styles.paymentOption}>
            <CreditCard size={24} color={Colors.light.text} />
            <Text style={styles.paymentText}>No payment required for viewing</Text>
          </View>
        </View>

        <Text style={styles.disclaimer}>
          By scheduling a viewing, you agree to our terms and conditions. We'll send you a confirmation email with all the details.
        </Text>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable style={styles.bookButton} onPress={handleBooking}>
          <Text style={styles.bookButtonText}>Confirm Booking</Text>
        </Pressable>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 100,
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
  apartmentPreview: {
    flexDirection: "row",
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 24,
  },
  apartmentImage: {
    width: 100,
    height: 100,
  },
  apartmentInfo: {
    flex: 1,
    padding: 12,
    justifyContent: "space-between",
  },
  apartmentTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.light.text,
    marginBottom: 4,
  },
  apartmentLocation: {
    fontSize: 14,
    color: Colors.light.subtext,
    marginBottom: 4,
  },
  apartmentPrice: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.light.text,
  },
  apartmentPriceUnit: {
    fontSize: 14,
    fontWeight: "400",
    color: Colors.light.subtext,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.light.text,
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: 48,
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    color: Colors.light.text,
    marginBottom: 12,
  },
  paymentOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: Colors.light.card,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  paymentText: {
    fontSize: 16,
    color: Colors.light.text,
    marginLeft: 12,
  },
  disclaimer: {
    fontSize: 14,
    color: Colors.light.subtext,
    textAlign: "center",
    marginTop: 8,
    marginBottom: 24,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.light.background,
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
    padding: 20,
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
  bookButton: {
    backgroundColor: Colors.light.primary,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  bookButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  successContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: Colors.light.background,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.light.text,
    marginTop: 24,
    marginBottom: 16,
  },
  successMessage: {
    fontSize: 16,
    color: Colors.light.text,
    textAlign: "center",
    marginBottom: 8,
  },
  successDetails: {
    fontSize: 14,
    color: Colors.light.subtext,
    textAlign: "center",
    marginBottom: 40,
  },
  homeButton: {
    backgroundColor: Colors.light.primary,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  homeButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});