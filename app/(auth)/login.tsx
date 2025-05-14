import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Mail, Lock, User, Home } from "lucide-react-native";
import Colors from "@/constants/colors";
import { useAuthStore } from "@/hooks/use-auth-store";

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState<"renter" | "owner">("renter");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    setIsLoading(true);
    try {
      const success = await login(email, password, userType);
      if (!success) {
        Alert.alert("Login Failed", "Invalid email or password");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred during login");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>
            Log in to continue your apartment search
          </Text>
        </View>

        <View style={styles.userTypeContainer}>
          <Pressable
            style={[
              styles.userTypeButton,
              userType === "renter" && styles.userTypeButtonActive,
            ]}
            onPress={() => setUserType("renter")}
          >
            <User
              size={20}
              color={userType === "renter" ? "white" : Colors.light.text}
            />
            <Text
              style={[
                styles.userTypeText,
                userType === "renter" && styles.userTypeTextActive,
              ]}
            >
              Renter
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.userTypeButton,
              userType === "owner" && styles.userTypeButtonActive,
            ]}
            onPress={() => setUserType("owner")}
          >
            <Home
              size={20}
              color={userType === "owner" ? "white" : Colors.light.text}
            />
            <Text
              style={[
                styles.userTypeText,
                userType === "owner" && styles.userTypeTextActive,
              ]}
            >
              Property Owner
            </Text>
          </Pressable>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Mail size={20} color={Colors.light.subtext} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
              placeholderTextColor={Colors.light.subtext}
            />
          </View>

          <View style={styles.inputContainer}>
            <Lock size={20} color={Colors.light.subtext} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              placeholderTextColor={Colors.light.subtext}
            />
          </View>

          <Pressable
            style={styles.forgotPassword}
            onPress={() => router.push("/forgot-password")}
          >
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </Pressable>

          <Pressable
            style={[styles.loginButton, (!email || !password) && styles.loginButtonDisabled]}
            onPress={handleLogin}
            disabled={isLoading || !email || !password}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.loginButtonText}>Log In</Text>
            )}
          </Pressable>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Don't have an account?</Text>
          <Pressable onPress={() => router.push("/register")}>
            <Text style={styles.signupText}>Sign Up</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.light.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.light.subtext,
  },
  userTypeContainer: {
    flexDirection: "row",
    marginBottom: 24,
    gap: 12,
  },
  userTypeButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.light.border,
    backgroundColor: Colors.light.card,
    gap: 8,
  },
  userTypeButtonActive: {
    backgroundColor: Colors.light.primary,
    borderColor: Colors.light.primary,
  },
  userTypeText: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.light.text,
  },
  userTypeTextActive: {
    color: "white",
  },
  form: {
    marginBottom: 24,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    height: 56,
    backgroundColor: Colors.light.card,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    height: "100%",
    fontSize: 16,
    color: Colors.light.text,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: Colors.light.primary,
    fontWeight: "500",
  },
  loginButton: {
    backgroundColor: Colors.light.primary,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  loginButtonDisabled: {
    backgroundColor: Colors.light.border,
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "auto",
    paddingVertical: 16,
  },
  footerText: {
    fontSize: 14,
    color: Colors.light.subtext,
    marginRight: 4,
  },
  signupText: {
    fontSize: 14,
    color: Colors.light.primary,
    fontWeight: "600",
  },
});