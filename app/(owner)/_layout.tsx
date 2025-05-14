import { Tabs } from "expo-router";
import { Home, MessageCircle, Calendar, User } from "lucide-react-native";
import Colors from "@/constants/colors";

export default function OwnerTabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.light.primary,
        tabBarInactiveTintColor: Colors.light.subtext,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: Colors.light.border,
          height: 60,
          paddingBottom: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "500",
        },
        headerStyle: {
          borderBottomWidth: 1,
          borderBottomColor: Colors.light.border,
        },
        headerTitleStyle: {
          fontWeight: "600",
          fontSize: 18,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "My Properties",
          tabBarIcon: ({ color }) => <Home size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="reservations"
        options={{
          title: "Reservations",
          tabBarIcon: ({ color }) => <Calendar size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: "Messages",
          tabBarIcon: ({ color }) => <MessageCircle size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => <User size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}