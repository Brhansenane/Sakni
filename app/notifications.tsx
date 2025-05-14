import React from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Pressable,
  Platform,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { Image } from "expo-image";
import { Bell, Home, MessageCircle, Calendar, Star } from "lucide-react-native";
import Colors from "@/constants/colors";

interface Notification {
  id: string;
  type: "new_listing" | "message" | "booking" | "review";
  title: string;
  message: string;
  time: string;
  read: boolean;
  image?: string;
  apartmentId?: string;
}

const notifications: Notification[] = [
  {
    id: "1",
    type: "new_listing",
    title: "New Listing Available",
    message: "A new apartment matching your search criteria is now available in South Beach.",
    time: "Just now",
    read: false,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    apartmentId: "2",
  },
  {
    id: "2",
    type: "message",
    title: "New Message",
    message: "Emma Wilson: Hi there! I wanted to ask about the availability of the studio apartment.",
    time: "2 hours ago",
    read: false,
  },
  {
    id: "3",
    type: "booking",
    title: "Booking Confirmed",
    message: "Your viewing for Modern Studio in Downtown has been confirmed for tomorrow at 3:00 PM.",
    time: "Yesterday",
    read: true,
    apartmentId: "1",
  },
  {
    id: "4",
    type: "review",
    title: "New Review",
    message: "Michael Rodriguez left a 5-star review for your recent stay at Luxury 2BR with Ocean View.",
    time: "2 days ago",
    read: true,
  },
  {
    id: "5",
    type: "new_listing",
    title: "Price Drop Alert",
    message: "The price for Cozy 1BR in Historic District has been reduced by $200.",
    time: "3 days ago",
    read: true,
    image: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    apartmentId: "3",
  },
];

export default function NotificationsScreen() {
  const router = useRouter();

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "new_listing":
        return <Home size={22} color="white" />;
      case "message":
        return <MessageCircle size={22} color="white" />;
      case "booking":
        return <Calendar size={22} color="white" />;
      case "review":
        return <Star size={22} color="white" />;
      default:
        return <Bell size={22} color="white" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "new_listing":
        return Colors.light.primary;
      case "message":
        return "#9C27B0"; // Purple
      case "booking":
        return "#4CAF50"; // Green
      case "review":
        return "#FF9800"; // Orange
      default:
        return Colors.light.primary;
    }
  };

  const handleNotificationPress = (notification: Notification) => {
    if (notification.apartmentId) {
      router.push(`/apartment/${notification.apartmentId}`);
    } else if (notification.type === "message") {
      // In a real app, navigate to messages
      console.log("Navigate to messages");
    } else if (notification.type === "booking") {
      // In a real app, navigate to bookings
      console.log("Navigate to bookings");
    }
  };

  const renderNotification = ({ item }: { item: Notification }) => (
    <Pressable
      style={[
        styles.notificationItem,
        !item.read && styles.unreadNotification,
      ]}
      onPress={() => handleNotificationPress(item)}
    >
      <View
        style={[
          styles.notificationIcon,
          { backgroundColor: getNotificationColor(item.type) },
        ]}
      >
        {getNotificationIcon(item.type)}
      </View>
      <View style={styles.notificationContent}>
        <View style={styles.notificationHeader}>
          <Text style={styles.notificationTitle}>{item.title}</Text>
          <Text style={styles.notificationTime}>{item.time}</Text>
        </View>
        <Text style={styles.notificationMessage} numberOfLines={2}>
          {item.message}
        </Text>
        {item.image && (
          <Image
            source={{ uri: item.image }}
            style={styles.notificationImage}
            contentFit="cover"
          />
        )}
      </View>
    </Pressable>
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: "Notifications",
        }}
      />
      <View style={styles.container}>
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          renderItem={renderNotification}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Bell size={60} color={Colors.light.subtext} />
              <Text style={styles.emptyText}>No notifications yet</Text>
              <Text style={styles.emptySubtext}>
                We'll notify you when there are new listings or updates
              </Text>
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
  listContent: {
    padding: 16,
  },
  notificationItem: {
    flexDirection: "row",
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    marginBottom: 12,
    padding: 16,
    ...Platform.select({
      ios: {
        shadowColor: Colors.light.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
      web: {
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.05)",
      },
    }),
  },
  unreadNotification: {
    borderLeftWidth: 4,
    borderLeftColor: Colors.light.primary,
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.light.text,
    flex: 1,
  },
  notificationTime: {
    fontSize: 12,
    color: Colors.light.subtext,
    marginLeft: 8,
  },
  notificationMessage: {
    fontSize: 14,
    color: Colors.light.text,
    marginBottom: 8,
  },
  notificationImage: {
    width: "100%",
    height: 120,
    borderRadius: 8,
    marginTop: 8,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.light.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: Colors.light.subtext,
    textAlign: "center",
  },
});