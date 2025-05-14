import React from "react";
import { StyleSheet, View, Text, Pressable, ScrollView, Alert } from "react-native";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import { 
  ChevronRight, 
  Settings, 
  Bell, 
  CreditCard, 
  HelpCircle, 
  LogOut,
  BookmarkIcon,
  ClockIcon,
  Edit3
} from "lucide-react-native";
import Colors from "@/constants/colors";
import { useAuthStore } from "@/hooks/use-auth-store";

interface MenuItemProps {
  icon: React.ReactNode;
  title: string;
  onPress: () => void;
}

function MenuItem({ icon, title, onPress }: MenuItemProps) {
  return (
    <Pressable style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuItemLeft}>
        {icon}
        <Text style={styles.menuItemTitle}>{title}</Text>
      </View>
      <ChevronRight size={20} color={Colors.light.subtext} />
    </Pressable>
  );
}

export default function ProfileScreen() {
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const handleEditProfile = () => {
    router.push("/edit-profile");
  };

  const navigateToSettings = () => {
    router.push("/settings");
  };

  const navigateToNotifications = () => {
    router.push("/notifications");
  };

  const navigateToPaymentMethods = () => {
    router.push("/payment-methods");
  };

  const navigateToSavedSearches = () => {
    router.push("/saved-searches");
  };

  const navigateToBookingHistory = () => {
    router.push("/booking-history");
  };

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: () => logout(),
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.profileHeader}>
        <View style={styles.profileImageContainer}>
          <Image
            source={{ uri: user?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" }}
            style={styles.profileImage}
            contentFit="cover"
          />
          <Pressable style={styles.editImageButton} onPress={handleEditProfile}>
            <Edit3 size={16} color="white" />
          </Pressable>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>{user?.name || "Alex Johnson"}</Text>
          <Text style={styles.profileEmail}>{user?.email || "alex.johnson@example.com"}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.menuContainer}>
          <MenuItem
            icon={<Settings size={22} color={Colors.light.text} />}
            title="Settings"
            onPress={navigateToSettings}
          />
          <MenuItem
            icon={<Bell size={22} color={Colors.light.text} />}
            title="Notifications"
            onPress={navigateToNotifications}
          />
          <MenuItem
            icon={<CreditCard size={22} color={Colors.light.text} />}
            title="Payment Methods"
            onPress={navigateToPaymentMethods}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Activity</Text>
        <View style={styles.menuContainer}>
          <MenuItem
            icon={<BookmarkIcon size={22} color={Colors.light.text} />}
            title="Saved Searches"
            onPress={navigateToSavedSearches}
          />
          <MenuItem
            icon={<ClockIcon size={22} color={Colors.light.text} />}
            title="Booking History"
            onPress={navigateToBookingHistory}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        <View style={styles.menuContainer}>
          <MenuItem
            icon={<HelpCircle size={22} color={Colors.light.text} />}
            title="Help Center"
            onPress={() => {}}
          />
        </View>
      </View>

      <Pressable style={styles.logoutButton} onPress={handleLogout}>
        <LogOut size={20} color={Colors.light.error} />
        <Text style={styles.logoutText}>Log Out</Text>
      </Pressable>

      <Text style={styles.versionText}>Version 1.0.0</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  profileHeader: {
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  profileImageContainer: {
    position: "relative",
    marginBottom: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  editImageButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: Colors.light.primary,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: Colors.light.background,
  },
  profileInfo: {
    alignItems: "center",
  },
  profileName: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.light.text,
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: Colors.light.subtext,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.light.text,
    marginBottom: 12,
  },
  menuContainer: {
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    overflow: "hidden",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  menuItemLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  menuItemTitle: {
    fontSize: 16,
    color: Colors.light.text,
    marginLeft: 12,
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "rgba(244, 67, 54, 0.1)",
    borderRadius: 12,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.light.error,
    marginLeft: 8,
  },
  versionText: {
    fontSize: 12,
    color: Colors.light.subtext,
    textAlign: "center",
    marginTop: 24,
  },
});