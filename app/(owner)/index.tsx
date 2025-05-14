import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Pressable,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import { Plus, Edit, Trash2, Eye, Star } from "lucide-react-native";
import Colors from "@/constants/colors";
import { apartments } from "@/mocks/apartments";
import { useAuthStore } from "@/hooks/use-auth-store";

// Filter apartments to only show those owned by the current user
// For demo purposes, we'll just show all apartments
const ownerApartments = apartments.map(apt => ({
  ...apt,
  status: Math.random() > 0.5 ? "active" : "draft",
  views: Math.floor(Math.random() * 500),
}));

export default function OwnerDashboardScreen() {
  const router = useRouter();
  const { user } = useAuthStore();
  const [showDrafts, setShowDrafts] = useState(false);

  const filteredApartments = ownerApartments.filter(apt => 
    showDrafts ? apt.status === "draft" : apt.status === "active"
  );

  const handleAddProperty = () => {
    Alert.alert(
      "Add New Property",
      "This feature would allow you to add a new property listing.",
      [{ text: "OK" }]
    );
  };

  const handleEditProperty = (id: string) => {
    Alert.alert(
      "Edit Property",
      "This feature would allow you to edit this property listing.",
      [{ text: "OK" }]
    );
  };

  const handleDeleteProperty = (id: string) => {
    Alert.alert(
      "Delete Property",
      "Are you sure you want to delete this property?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive",
          onPress: () => console.log("Would delete property:", id)
        }
      ]
    );
  };

  const handleViewProperty = (id: string) => {
    router.push(`/apartment/${id}`);
  };

  const renderPropertyItem = ({ item }: { item: typeof ownerApartments[0] }) => (
    <View style={styles.propertyCard}>
      <Image source={{ uri: item.images[0] }} style={styles.propertyImage} contentFit="cover" />
      
      {item.status === "draft" && (
        <View style={styles.draftBadge}>
          <Text style={styles.draftText}>Draft</Text>
        </View>
      )}
      
      <View style={styles.propertyContent}>
        <Text style={styles.propertyTitle} numberOfLines={1}>{item.title}</Text>
        <Text style={styles.propertyLocation}>{item.location.city}, {item.location.neighborhood}</Text>
        
        <View style={styles.propertyStats}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>${item.price}</Text>
            <Text style={styles.statLabel}>per month</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{item.views}</Text>
            <Text style={styles.statLabel}>views</Text>
          </View>
          <View style={styles.statItem}>
            <View style={styles.ratingContainer}>
              <Star size={14} color={Colors.light.rating} fill={Colors.light.rating} />
              <Text style={styles.statValue}>{item.rating}</Text>
            </View>
            <Text style={styles.statLabel}>{item.reviews} reviews</Text>
          </View>
        </View>
        
        <View style={styles.actionButtons}>
          <Pressable 
            style={[styles.actionButton, styles.viewButton]} 
            onPress={() => handleViewProperty(item.id)}
          >
            <Eye size={16} color={Colors.light.primary} />
            <Text style={styles.viewButtonText}>View</Text>
          </Pressable>
          <Pressable 
            style={[styles.actionButton, styles.editButton]} 
            onPress={() => handleEditProperty(item.id)}
          >
            <Edit size={16} color={Colors.light.text} />
            <Text style={styles.editButtonText}>Edit</Text>
          </Pressable>
          <Pressable 
            style={[styles.actionButton, styles.deleteButton]} 
            onPress={() => handleDeleteProperty(item.id)}
          >
            <Trash2 size={16} color={Colors.light.error} />
            <Text style={styles.deleteButtonText}>Delete</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <Text style={styles.ownerName}>{user?.name}</Text>
        </View>
        <Pressable style={styles.addButton} onPress={handleAddProperty}>
          <Plus size={20} color="white" />
          <Text style={styles.addButtonText}>Add Property</Text>
        </Pressable>
      </View>
      
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statCardValue}>{ownerApartments.length}</Text>
          <Text style={styles.statCardLabel}>Properties</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statCardValue}>
            {ownerApartments.filter(apt => apt.status === "active").length}
          </Text>
          <Text style={styles.statCardLabel}>Active</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statCardValue}>
            {ownerApartments.filter(apt => apt.status === "draft").length}
          </Text>
          <Text style={styles.statCardLabel}>Drafts</Text>
        </View>
      </View>
      
      <View style={styles.tabContainer}>
        <Pressable
          style={[styles.tab, !showDrafts && styles.activeTab]}
          onPress={() => setShowDrafts(false)}
        >
          <Text style={[styles.tabText, !showDrafts && styles.activeTabText]}>
            Active Listings
          </Text>
        </Pressable>
        <Pressable
          style={[styles.tab, showDrafts && styles.activeTab]}
          onPress={() => setShowDrafts(true)}
        >
          <Text style={[styles.tabText, showDrafts && styles.activeTabText]}>
            Drafts
          </Text>
        </Pressable>
      </View>
      
      <FlatList
        data={filteredApartments}
        keyExtractor={(item) => item.id}
        renderItem={renderPropertyItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {showDrafts 
                ? "You don't have any draft properties" 
                : "You don't have any active properties"}
            </Text>
            <Pressable style={styles.emptyButton} onPress={handleAddProperty}>
              <Text style={styles.emptyButtonText}>Add Property</Text>
            </Pressable>
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  welcomeText: {
    fontSize: 14,
    color: Colors.light.subtext,
  },
  ownerName: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.light.text,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.primary,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  addButtonText: {
    color: "white",
    fontWeight: "600",
    marginLeft: 4,
  },
  statsContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 8,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.light.card,
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  statCardValue: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.light.text,
  },
  statCardLabel: {
    fontSize: 12,
    color: Colors.light.subtext,
    marginTop: 4,
  },
  tabContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
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
  propertyCard: {
    backgroundColor: Colors.light.background,
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  propertyImage: {
    width: "100%",
    height: 160,
  },
  draftBadge: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  draftText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  propertyContent: {
    padding: 16,
  },
  propertyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.light.text,
    marginBottom: 4,
  },
  propertyLocation: {
    fontSize: 14,
    color: Colors.light.subtext,
    marginBottom: 12,
  },
  propertyStats: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  statItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.light.text,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.light.subtext,
    marginTop: 2,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  actionButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    borderRadius: 6,
    gap: 4,
  },
  viewButton: {
    backgroundColor: "rgba(74, 128, 240, 0.1)",
  },
  viewButtonText: {
    color: Colors.light.primary,
    fontWeight: "600",
    fontSize: 14,
  },
  editButton: {
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  editButtonText: {
    color: Colors.light.text,
    fontWeight: "600",
    fontSize: 14,
  },
  deleteButton: {
    backgroundColor: "rgba(244, 67, 54, 0.1)",
  },
  deleteButtonText: {
    color: Colors.light.error,
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
  emptyButton: {
    backgroundColor: Colors.light.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  emptyButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 16,
  },
});