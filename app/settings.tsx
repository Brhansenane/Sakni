import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Pressable,
  Switch,
  Alert,
  Platform,
} from "react-native";
import { Stack } from "expo-router";
import {
  Bell,
  Globe,
  Lock,
  CreditCard,
  HelpCircle,
  Info,
  ChevronRight,
} from "lucide-react-native";
import Colors from "@/constants/colors";

interface SettingItemProps {
  icon: React.ReactNode;
  title: string;
  description?: string;
  onPress?: () => void;
  rightElement?: React.ReactNode;
}

function SettingItem({
  icon,
  title,
  description,
  onPress,
  rightElement,
}: SettingItemProps) {
  return (
    <Pressable
      style={styles.settingItem}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.settingIcon}>{icon}</View>
      <View style={styles.settingContent}>
        <Text style={styles.settingTitle}>{title}</Text>
        {description && (
          <Text style={styles.settingDescription}>{description}</Text>
        )}
      </View>
      {rightElement || (
        onPress && <ChevronRight size={20} color={Colors.light.subtext} />
      )}
    </Pressable>
  );
}

export default function SettingsScreen() {
  const [pushNotifications, setPushNotifications] = useState(true);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const togglePushNotifications = () => {
    setPushNotifications(!pushNotifications);
  };

  const toggleEmailNotifications = () => {
    setEmailNotifications(!emailNotifications);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    Alert.alert(
      "Feature Not Available",
      "Dark mode is not fully implemented in this demo."
    );
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
          onPress: () => {
            // In a real app, you would clear auth state here
            console.log("User logged out");
          },
        },
      ]
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Settings",
        }}
      />
      <ScrollView style={styles.container}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <View style={styles.settingGroup}>
            <SettingItem
              icon={<Bell size={22} color={Colors.light.text} />}
              title="Push Notifications"
              description="Receive notifications about new listings and updates"
              rightElement={
                <Switch
                  value={pushNotifications}
                  onValueChange={togglePushNotifications}
                  trackColor={{
                    false: Colors.light.border,
                    true: Colors.light.primary,
                  }}
                  thumbColor={Platform.OS === "ios" ? undefined : "white"}
                />
              }
            />
            <SettingItem
              icon={<Bell size={22} color={Colors.light.text} />}
              title="Email Notifications"
              description="Receive emails about new listings and updates"
              rightElement={
                <Switch
                  value={emailNotifications}
                  onValueChange={toggleEmailNotifications}
                  trackColor={{
                    false: Colors.light.border,
                    true: Colors.light.primary,
                  }}
                  thumbColor={Platform.OS === "ios" ? undefined : "white"}
                />
              }
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Appearance</Text>
          <View style={styles.settingGroup}>
            <SettingItem
              icon={<Globe size={22} color={Colors.light.text} />}
              title="Dark Mode"
              description="Switch between light and dark theme"
              rightElement={
                <Switch
                  value={darkMode}
                  onValueChange={toggleDarkMode}
                  trackColor={{
                    false: Colors.light.border,
                    true: Colors.light.primary,
                  }}
                  thumbColor={Platform.OS === "ios" ? undefined : "white"}
                />
              }
            />
            <SettingItem
              icon={<Globe size={22} color={Colors.light.text} />}
              title="Language"
              description="Change app language"
              onPress={() => {}}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.settingGroup}>
            <SettingItem
              icon={<Lock size={22} color={Colors.light.text} />}
              title="Privacy Settings"
              description="Manage your data and privacy preferences"
              onPress={() => {}}
            />
            <SettingItem
              icon={<CreditCard size={22} color={Colors.light.text} />}
              title="Payment Methods"
              description="Manage your payment options"
              onPress={() => {}}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <View style={styles.settingGroup}>
            <SettingItem
              icon={<HelpCircle size={22} color={Colors.light.text} />}
              title="Help Center"
              description="Get help with using the app"
              onPress={() => {}}
            />
            <SettingItem
              icon={<Info size={22} color={Colors.light.text} />}
              title="About"
              description="App version and information"
              onPress={() => {}}
            />
          </View>
        </View>

        <Pressable style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Log Out</Text>
        </Pressable>

        <Text style={styles.versionText}>Version 1.0.0</Text>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
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
  settingGroup: {
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    overflow: "hidden",
  },
  settingItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(74, 128, 240, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.light.text,
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
    color: Colors.light.subtext,
  },
  logoutButton: {
    marginTop: 40,
    marginHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: "rgba(244, 67, 54, 0.1)",
    borderRadius: 12,
    alignItems: "center",
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.light.error,
  },
  versionText: {
    fontSize: 12,
    color: Colors.light.subtext,
    textAlign: "center",
    marginTop: 24,
    marginBottom: 40,
  },
});