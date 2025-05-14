import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { Platform } from "react-native";

import { ErrorBoundary } from "./error-boundary";
import { useAuthStore } from "@/hooks/use-auth-store";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(auth)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) {
      console.error(error);
      throw error;
    }
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ErrorBoundary>
      <RootLayoutNav />
    </ErrorBoundary>
  );
}

function RootLayoutNav() {
  const { isAuthenticated, userType } = useAuthStore();

  return (
    <Stack
      screenOptions={{
        headerBackTitle: "Back",
      }}
    >
      {!isAuthenticated ? (
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      ) : userType === "owner" ? (
        <Stack.Screen name="(owner)" options={{ headerShown: false }} />
      ) : (
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      )}
      
      <Stack.Screen name="modal" options={{ presentation: "modal" }} />
      <Stack.Screen name="settings" options={{ title: "Settings" }} />
      <Stack.Screen name="notifications" options={{ title: "Notifications" }} />
      <Stack.Screen name="chat/[id]" options={{ title: "Chat" }} />
      <Stack.Screen name="payment-methods" options={{ title: "Payment Methods" }} />
      <Stack.Screen name="saved-searches" options={{ title: "Saved Searches" }} />
      <Stack.Screen name="booking-history" options={{ title: "Booking History" }} />
      <Stack.Screen name="edit-profile" options={{ title: "Edit Profile" }} />
      <Stack.Screen 
        name="apartment/[id]" 
        options={{ 
          headerShown: false,
          animation: "slide_from_right"
        }} 
      />
      <Stack.Screen 
        name="booking/[id]" 
        options={{ 
          title: "Book Viewing",
          animation: "slide_from_bottom"
        }} 
      />
    </Stack>
  );
}