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
import { Search, Bell, Trash2, ChevronRight } from "lucide-react-native";
import Colors from "@/constants/colors";

interface SavedSearch {
  id: string;
  name: string;
  criteria: {
    location: string;
    priceRange: string;
    bedrooms: number;
    bathrooms: number;
  };
  notificationsEnabled: boolean;
  dateCreated: string;
}

const mockSavedSearches: SavedSearch[] = [
  {
    id: "1",
    name: "Downtown Apartments",
    criteria: {
      location: "San Francisco, Financial District",
      priceRange: "$1,000 - $2,000",
      bedrooms: 1,
      bathrooms: 1,
    },
    notificationsEnabled: true,
    dateCreated: "2023-05-15",
  },
  {
    id: "2",
    name: "Luxury Beachfront",
    criteria: {
      location: "Miami, South Beach",
      priceRange: "$3,000 - $5,000",
      bedrooms: 2,
      bathrooms: 2,
    },
    notificationsEnabled: false,
    dateCreated: "2023-05-10",
  },
  {
    id: "3",
    name: "Family Homes",
    criteria: {
      location: "Chicago, Lincoln Park",
      priceRange: "$2,500 - $3,500",
      bedrooms: 3,
      bathrooms: 2,
    },
    notificationsEnabled: true,
    dateCreated: "2023-05-05",
  },
];

export default function SavedSearchesScreen() {
  const router = useRouter();
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>(mockSavedSearches);

  const handleToggleNotifications = (id: string) => {
    setSavedSearches(
      savedSearches.map((search) =>
        search.id === id
          ? { ...search, notificationsEnabled: !search.notificationsEnabled }
          : search
      )
    );
  };

  const handleDeleteSearch = (id: string) => {
    Alert.alert(
      "Delete Saved Search",
      "Are you sure you want to delete this saved search?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive",
          onPress: () => {
            setSavedSearches(savedSearches.filter((search) => search.id !== id));
          }
        }
      ]
    );
  };

  const handleSearchPress = (search: SavedSearch) => {
    // In a real app, this would apply the search criteria and navigate to results
    Alert.alert(
      "Search Applied",
      `This would apply the "${search.name}" search criteria and show results.`,
      [{ text: "OK" }]
    );
  };

  const renderSavedSearchItem = ({ item }: { item: SavedSearch }) => (
    <Pressable
      style={styles.searchItem}
      onPress={() => handleSearchPress(item)}
    >
      <View style={styles.searchHeader}>
        <Text style={styles.searchName}>{item.name}</Text>
        <Text style={styles.searchDate}>{item.dateCreated}</Text>
      </View>
      
      <View style={styles.searchCriteria}>
        <Text style={styles.criteriaText}>
          <Text style={styles.criteriaLabel}>Location: </Text>
          {item.criteria.location}
        </Text>
        <Text style={styles.criteriaText}>
          <Text style={styles.criteriaLabel}>Price: </Text>
          {item.criteria.priceRange}
        </Text>
        <Text style={styles.criteriaText}>
          <Text style={styles.criteriaLabel}>Bedrooms: </Text>
          {item.criteria.bedrooms}
        </Text>
        <Text style={styles.criteriaText}>
          <Text style={styles.criteriaLabel}>Bathrooms: </Text>
          {item.criteria.bathrooms}
        </Text>
      </View>
      
      <View style={styles.searchActions}>
        <Pressable
          style={[
            styles.notificationButton,
            item.notificationsEnabled && styles.notificationButtonActive,
          ]}
          onPress={() => handleToggleNotifications(item.id)}
        >
          <Bell
            size={16}
            color={item.notificationsEnabled ? "white" : Colors.light.text}
          />
          <Text
            style={[
              styles.notificationText,
              item.notificationsEnabled && styles.notificationTextActive,
            ]}
          >
            {item.notificationsEnabled ? "Notifications On" : "Notifications Off"}
          </Text>
        </Pressable>
        
        <View style={styles.rightActions}>
          <Pressable
            style={styles.deleteButton}
            onPress={() => handleDeleteSearch(item.id)}
          >
            <Trash2 size={20} color={Colors.light.error} />
          </Pressable>
          <ChevronRight size={20} color={Colors.light.subtext} />
        </View>
      </View>
    </Pressable>
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: "Saved Searches",
        }}
      />
      <View style={styles.container}>
        <FlatList
          data={savedSearches}
          keyExtractor={(item) => item.id}
          renderItem={renderSavedSearchItem}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Search size={48} color={Colors.light.subtext} />
              <Text style={styles.emptyText}>No saved searches yet</Text>
              <Text style={styles.emptySubtext}>
                Save your search criteria to quickly access them later
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
  searchItem: {
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  searchHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  searchName: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.light.text,
  },
  searchDate: {
    fontSize: 12,
    color: Colors.light.subtext,
  },
  searchCriteria: {
    marginBottom: 16,
  },
  criteriaText: {
    fontSize: 14,
    color: Colors.light.text,
    marginBottom: 4,
  },
  criteriaLabel: {
    fontWeight: "600",
  },
  searchActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  notificationButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.background,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  notificationButtonActive: {
    backgroundColor: Colors.light.primary,
    borderColor: Colors.light.primary,
  },
  notificationText: {
    fontSize: 12,
    color: Colors.light.text,
    marginLeft: 4,
  },
  notificationTextActive: {
    color: "white",
  },
  rightActions: {
    flexDirection: "row",
    alignItems: "center",
  },
  deleteButton: {
    padding: 4,
    marginRight: 8,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
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
    maxWidth: "80%",
  },
});