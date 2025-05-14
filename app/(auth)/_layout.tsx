import { Stack } from "expo-router";
import Colors from "@/constants/colors";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.light.background,
        },
        headerTintColor: Colors.light.text,
        headerTitleStyle: {
          fontWeight: "600",
        },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="login"
        options={{
          title: "Log In",
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          title: "Create Account",
        }}
      />
      <Stack.Screen
        name="forgot-password"
        options={{
          title: "Reset Password",
        }}
      />
      <Stack.Screen
        name="onboarding"
        options={{
          headerShown: false,
          gestureEnabled: false,
        }}
      />
    </Stack>
  );
}