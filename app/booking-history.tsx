import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Pressable,
  Alert,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { Image } from "expo-image";
import { Calendar, Clock, CheckCircle, XCircle, MessageCircle } from "lucide-react-native";
import Colors from "@/constants/colors";
import { apartments } from "@/mocks/apartments";

// Mock booking data
interface Booking {
  id: string;
  apartmentId: string;
  date: string;
  time: string;
  status: "upcoming" | "completed" | "cancelled";
  notes?: string;
}

const mockBookings: Booking[] = [
  {
    id: "b1",
    apartmentId: "1",
    date: "2023-06-20",
    time: "10:00 AM",
    status: "upcoming",
  },
  {
    id: "b2",
    apartmentId: "2",
    date: "2023-06-15",
    time: "2:30 PM",
    status: "upcoming",
    notes: "Remember to ask about parking options",
  },
  {
    id: "b3",
    apartmentId: "3",
    date: "2023-05-28",
    time: "11:00 AM",
    status: "completed",
  },
  {
    id: "b4",
    apartmentId: "5",
    date: "2023-05-20",
    time: "4:00 PM",
    status: "completed",
  },
  {
    id: "b5",
    apartmentId: "6",
    date: "2023-05-15",
    time: "1:00 PM",
    status: "cancelled",
  },
];

export default function BookingHistoryScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"upcoming" | "completed" | "cancelled">("upcoming");

  const filteredBookings = mockBookings.filter(
    (booking) => booking.status === activeTab
  );

  const getApartmentDetails = (apartmentId: string) => {
    return apartments.find((apt) => apt.id === apartmentId);
  };

  const handleCancelBooking = (id: string) => {
    Alert.alert(
      "Cancel Booking",
      "Are you sure you want to cancel this viewing?",
      [
        { text: "No", style: "cancel" },
        { 
          text: "Yes, Cancel", 
          style: "destructive",
          onPress: () => console.log("Would cancel booking:", id)
        }
      ]
    );
  };

  const handleRescheduleBooking = (id: string) => {
    Alert.alert(
      "Reschedule Booking",
      "This would open the reschedule interface.",
      [{ text: "OK" }]
    );
  };

  const handleContactHost = (apartmentId: string) => {
    const apartment = getApartmentDetails(apartmentId);
    if (apartment) {
      Alert.alert(
        "Contact Host",
        `This would open a chat with ${apartment.host.name}.`,
        [{ text: "OK" }]
      );
    }
  };

  const handleViewApartment = (apartmentId: string) => {
    router.push(`/apartment/${apartmentId}`);
  };

  const renderBookingItem = ({ item }: { item: Booking }) => {
    const apartment = getApartmentDetails(item.apartmentId);
    if (!apartment) return null;

    return (
      <View style={styles.bookingCard}>
        <Pressable 
          style={styles.apartmentPreview}
          onPress={() => handleViewApartment(item.apartmentId)}
        >
          <Image source={{ uri: apartment.images[0] }} style={styles.apartmentImage} contentFit="cover" />
          <View style={styles.apartmentInfo}>
            <Text style={styles.apartmentTitle} numberOfLines={1}>{apartment.title}</Text>
            <Text style={styles.apartmentLocation}>{apartment.location.city}, {apartment.location.neighborhood}</Text>
            <View style={styles.hostInfo}>
              <Image source={{ uri: apartment.host.avatar }} style={styles.hostAvatar} contentFit="cover" />
              <Text style={styles.hostName}>{apartment.host.name}</Text>
            </View>
          </View>
        </Pressable>

        <View style={styles.bookingDetails}>
          <View style={styles.detailItem}>
            <Calendar size={16} color={Colors.light.subtext} />
            <Text style={styles.detailText}>{item.date}</Text>
          </View>
          <View style={styles.detailItem}>
            <Clock size={16} color={Colors.light.subtext} />
            <Text style={styles.detailText}>{item.time}</Text>
          </View>
          <View style={[styles.statusBadge, styles[`${item.status}Badge`]]}>
            <Text style={styles.statusText}>
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
            </Text>
          </View>
        </View>

        {item.notes && (
          <View style={styles.notesContainer}>
            <Text style={styles.notesLabel}>Notes:</Text>
            <Text style={styles.notesText}>{item.notes}</Text>
          </View>
        )}

        <View style={styles.actionButtons}>
          {item.status === "upcoming" && (
            <>
              <Pressable 
                style={[styles.actionButton, styles.rescheduleButton]} 
                onPress={() => handleRescheduleBooking(item.id)}
              >
                <Calendar size={16} color={Colors.light.primary} />
                <Text style={styles.rescheduleButtonText}>Reschedule</Text>
              </Pressable>
              <Pressable 
                style={[styles.actionButton, styles.cancelButton]} 
                onPress={() => handleCancelBooking(item.id)}
              >
                <XCircle size={16} color={Colors.light.error} />
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </Pressable>
            </>
          )}
          
          {(item.status === "completed" || item.status === "cancelled") && (
            <Pressable 
              style={[styles.actionButton, styles.contactButton]} 
              onPress={() => handleContactHost(item.apartmentId)}
            >
              <MessageCircle size={16} color={Colors.light.primary} />
              <Text style={styles.contactButtonText}>Contact Host</Text>
            </Pressable>
          )}
          
          {item.status === "completed" && (
            <Pressable 
              style={[styles.actionButton, styles.bookAgainButton]} 
              onPress={() => router.push(`/booking/${item.apartmentId}`)}
            >
              <CheckCircle size={16} color="white" />
              <Text style={styles.bookAgainButtonText}>Book Again</Text>
            </Pressable>
          )}
        </View>
      </View>
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Booking History",
        }}
      />
      <View style={styles.container}>
        <View style={styles.tabContainer}>
          <Pressable
            style={[styles.tab, activeTab === "upcoming" && styles.activeTab]}
            onPress={() => setActiveTab("upcoming")}
          >
            <Text style={[styles.tabText, activeTab === "upcoming" && styles.activeTabText]}>
              Upcoming
            </Text>
          </Pressable>
          <Pressable
            style={[styles.tab, activeTab === "completed" && styles.activeTab]}
            onPress={() => setActiveTab("completed")}
          >
            <Text style={[styles.tabText, activeTab === "completed" && styles.activeTabText]}>
              Completed
            </Text>
          </Pressable>
          <Pressable
            style={[styles.tab, activeTab === "cancelled" && styles.activeTab]}
            onPress={() => setActiveTab("cancelled")}
          >
            <Text style={[styles.tabText, activeTab === "cancelled" && styles.activeTabText]}>
              Cancelled
            </Text>
          </Pressable>
        </View>
        
        <FlatList
          data={filteredBookings}
          keyExtractor={(item) => item.id}
          renderItem={renderBookingItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                No {activeTab} bookings
              </Text>
              {activeTab === "upcoming" && (
                <Pressable 
                  style={styles.browseButton}
                  onPress={() => router.push("/")}
                >
                  <Text style={styles.browseButtonText}>Browse Apartments</Text>
                </Pressable>
              )}
            </View>
          }
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingTop: 16,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: Colors.light.border,
  },
  activeTab: {
    borderBottomColor: Colors.light.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.light.subtext,
  },
  activeTabText: {
    color: Colors.light.primary,
  },
  listContent: {
    padding: 16,
    paddingTop: 0,
  },
  bookingCard: {
    backgroundColor: Colors.light.background,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.light.border,
    padding: 16,
  },
  apartmentPreview: {
    flexDirection: "row",
    marginBottom: 16,
  },
  apartmentImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  apartmentInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "space-between",
  },
  apartmentTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.light.text,
  },
  apartmentLocation: {
    fontSize: 14,
    color: Colors.light.subtext,
  },
  hostInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  hostAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  hostName: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.light.text,
  },
  bookingDetails: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
    gap: 6,
  },
  detailText: {
    fontSize: 14,
    color: Colors.light.text,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginLeft: "auto",
  },
  upcomingBadge: {
    backgroundColor: "rgba(74, 128, 240, 0.1)",
  },
  completedBadge: {
    backgroundColor: "rgba(76, 175, 80, 0.1)",
  },
  cancelledBadge: {
    backgroundColor: "rgba(244, 67, 54, 0.1)",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.light.text,
  },
  notesContainer: {
    backgroundColor: Colors.light.card,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  notesLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.light.subtext,
    marginBottom: 4,
  },
  notesText: {
    fontSize: 14,
    color: Colors.light.text,
    lineHeight: 20,
  },
  actionButtons: {
    flexDirection: "row",
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 8,
    gap: 6,
  },
  rescheduleButton: {
    backgroundColor: "rgba(74, 128, 240, 0.1)",
  },
  rescheduleButtonText: {
    color: Colors.light.primary,
    fontWeight: "600",
    fontSize: 14,
  },
  cancelButton: {
    backgroundColor: "rgba(244, 67, 54, 0.1)",
  },
  cancelButtonText: {
    color: Colors.light.error,
    fontWeight: "600",
    fontSize: 14,
  },
  contactButton: {
    backgroundColor: "rgba(74, 128, 240, 0.1)",
  },
  contactButtonText: {
    color: Colors.light.primary,
    fontWeight: "600",
    fontSize: 14,
  },
  bookAgainButton: {
    backgroundColor: Colors.light.success,
  },
  bookAgainButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.light.subtext,
    marginBottom: 16,
  },
  browseButton: {
    backgroundColor: Colors.light.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  browseButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});