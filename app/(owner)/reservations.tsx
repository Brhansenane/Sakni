import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Pressable,
  Alert,
} from "react-native";
import { Image } from "expo-image";
import { Calendar, Clock, CheckCircle, XCircle, MessageCircle } from "lucide-react-native";
import Colors from "@/constants/colors";
import { apartments } from "@/mocks/apartments";

// Mock reservation data
interface Reservation {
  id: string;
  apartmentId: string;
  renterName: string;
  renterAvatar: string;
  date: string;
  time: string;
  status: "pending" | "confirmed" | "cancelled";
  message?: string;
}

const mockReservations: Reservation[] = [
  {
    id: "r1",
    apartmentId: "1",
    renterName: "John Smith",
    renterAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    date: "2023-06-15",
    time: "10:00 AM",
    status: "confirmed",
  },
  {
    id: "r2",
    apartmentId: "2",
    renterName: "Emily Johnson",
    renterAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    date: "2023-06-16",
    time: "2:30 PM",
    status: "pending",
    message: "I'm interested in a long-term lease. Looking forward to seeing the apartment!",
  },
  {
    id: "r3",
    apartmentId: "3",
    renterName: "Michael Brown",
    renterAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    date: "2023-06-14",
    time: "4:00 PM",
    status: "cancelled",
  },
  {
    id: "r4",
    apartmentId: "5",
    renterName: "Sarah Wilson",
    renterAvatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    date: "2023-06-17",
    time: "11:00 AM",
    status: "pending",
  },
  {
    id: "r5",
    apartmentId: "6",
    renterName: "David Lee",
    renterAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    date: "2023-06-18",
    time: "3:00 PM",
    status: "confirmed",
  },
];

export default function ReservationsScreen() {
  const [activeTab, setActiveTab] = useState<"pending" | "confirmed" | "cancelled">("pending");

  const filteredReservations = mockReservations.filter(
    (reservation) => reservation.status === activeTab
  );

  const getApartmentDetails = (apartmentId: string) => {
    return apartments.find((apt) => apt.id === apartmentId);
  };

  const handleConfirmReservation = (id: string) => {
    Alert.alert(
      "Confirm Reservation",
      "Are you sure you want to confirm this viewing?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Confirm", 
          style: "default",
          onPress: () => console.log("Would confirm reservation:", id)
        }
      ]
    );
  };

  const handleCancelReservation = (id: string) => {
    Alert.alert(
      "Cancel Reservation",
      "Are you sure you want to cancel this viewing?",
      [
        { text: "No", style: "cancel" },
        { 
          text: "Yes, Cancel", 
          style: "destructive",
          onPress: () => console.log("Would cancel reservation:", id)
        }
      ]
    );
  };

  const handleMessageRenter = (renterName: string) => {
    Alert.alert(
      "Message Renter",
      `This would open a chat with ${renterName}.`,
      [{ text: "OK" }]
    );
  };

  const renderReservationItem = ({ item }: { item: Reservation }) => {
    const apartment = getApartmentDetails(item.apartmentId);
    if (!apartment) return null;

    return (
      <View style={styles.reservationCard}>
        <View style={styles.reservationHeader}>
          <Image source={{ uri: apartment.images[0] }} style={styles.apartmentImage} contentFit="cover" />
          <View style={styles.headerInfo}>
            <Text style={styles.apartmentTitle} numberOfLines={1}>{apartment.title}</Text>
            <Text style={styles.apartmentLocation}>{apartment.location.city}</Text>
            <View style={styles.renterInfo}>
              <Image source={{ uri: item.renterAvatar }} style={styles.renterAvatar} contentFit="cover" />
              <Text style={styles.renterName}>{item.renterName}</Text>
            </View>
          </View>
        </View>

        <View style={styles.reservationDetails}>
          <View style={styles.detailItem}>
            <Calendar size={16} color={Colors.light.subtext} />
            <Text style={styles.detailText}>{item.date}</Text>
          </View>
          <View style={styles.detailItem}>
            <Clock size={16} color={Colors.light.subtext} />
            <Text style={styles.detailText}>{item.time}</Text>
          </View>
        </View>

        {item.message && (
          <View style={styles.messageContainer}>
            <Text style={styles.messageLabel}>Message:</Text>
            <Text style={styles.messageText}>{item.message}</Text>
          </View>
        )}

        <View style={styles.actionButtons}>
          {item.status === "pending" && (
            <>
              <Pressable 
                style={[styles.actionButton, styles.confirmButton]} 
                onPress={() => handleConfirmReservation(item.id)}
              >
                <CheckCircle size={16} color="white" />
                <Text style={styles.confirmButtonText}>Confirm</Text>
              </Pressable>
              <Pressable 
                style={[styles.actionButton, styles.cancelButton]} 
                onPress={() => handleCancelReservation(item.id)}
              >
                <XCircle size={16} color={Colors.light.error} />
                <Text style={styles.cancelButtonText}>Decline</Text>
              </Pressable>
            </>
          )}
          
          {item.status === "confirmed" && (
            <>
              <Pressable 
                style={[styles.actionButton, styles.messageButton]} 
                onPress={() => handleMessageRenter(item.renterName)}
              >
                <MessageCircle size={16} color={Colors.light.primary} />
                <Text style={styles.messageButtonText}>Message</Text>
              </Pressable>
              <Pressable 
                style={[styles.actionButton, styles.cancelButton]} 
                onPress={() => handleCancelReservation(item.id)}
              >
                <XCircle size={16} color={Colors.light.error} />
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </Pressable>
            </>
          )}
          
          {item.status === "cancelled" && (
            <Pressable 
              style={[styles.actionButton, styles.messageButton]} 
              onPress={() => handleMessageRenter(item.renterName)}
            >
              <MessageCircle size={16} color={Colors.light.primary} />
              <Text style={styles.messageButtonText}>Message</Text>
            </Pressable>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <Pressable
          style={[styles.tab, activeTab === "pending" && styles.activeTab]}
          onPress={() => setActiveTab("pending")}
        >
          <Text style={[styles.tabText, activeTab === "pending" && styles.activeTabText]}>
            Pending
          </Text>
        </Pressable>
        <Pressable
          style={[styles.tab, activeTab === "confirmed" && styles.activeTab]}
          onPress={() => setActiveTab("confirmed")}
        >
          <Text style={[styles.tabText, activeTab === "confirmed" && styles.activeTabText]}>
            Confirmed
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
        data={filteredReservations}
        keyExtractor={(item) => item.id}
        renderItem={renderReservationItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No {activeTab} reservations
            </Text>
          </View>
        }
      />
    </View>
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
  reservationCard: {
    backgroundColor: Colors.light.background,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.light.border,
    padding: 16,
  },
  reservationHeader: {
    flexDirection: "row",
    marginBottom: 16,
  },
  apartmentImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  headerInfo: {
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
  renterInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  renterAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  renterName: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.light.text,
  },
  reservationDetails: {
    flexDirection: "row",
    marginBottom: 16,
    gap: 16,
  },
  detailItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  detailText: {
    fontSize: 14,
    color: Colors.light.text,
  },
  messageContainer: {
    backgroundColor: Colors.light.card,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  messageLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.light.subtext,
    marginBottom: 4,
  },
  messageText: {
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
  confirmButton: {
    backgroundColor: Colors.light.success,
  },
  confirmButtonText: {
    color: "white",
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
  messageButton: {
    backgroundColor: "rgba(74, 128, 240, 0.1)",
  },
  messageButtonText: {
    color: Colors.light.primary,
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
  },
});