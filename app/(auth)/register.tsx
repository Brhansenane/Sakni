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

export default function RegisterScreen() {
  const router = useRouter();
  const { register } = useAuthStore();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState<"renter" | "owner">("renter");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      const success = await register(name, email, password, userType);
      if (!success) {
        Alert.alert("Registration Failed", "Could not create account");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred during registration");
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
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>
            Sign up to start your apartment journey
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
            <User size={20} color={Colors.light.subtext} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={name}
              onChangeText={setName}
              placeholderTextColor={Colors.light.subtext}
            />
          </View>

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

          <View style={styles.inputContainer}>
            <Lock size={20} color={Colors.light.subtext} style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              placeholderTextColor={Colors.light.subtext}
            />
          </View>

          <Pressable
            style={[
              styles.registerButton,
              (!name || !email || !password || !confirmPassword) && styles.registerButtonDisabled,
            ]}
            onPress={handleRegister}
            disabled={isLoading || !name || !email || !password || !confirmPassword}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.registerButtonText}>Create Account</Text>
            )}
          </Pressable>
        </View>

        <Text style={styles.termsText}>
          By creating an account, you agree to our Terms of Service and Privacy Policy
        </Text>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <Pressable onPress={() => router.push("/login")}>
            <Text style={styles.loginText}>Log In</Text>
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
    marginBottom: 24,
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
    marginBottom: 16,
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
  registerButton: {
    backgroundColor: Colors.light.primary,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
  },
  registerButtonDisabled: {
    backgroundColor: Colors.light.border,
  },
  registerButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  termsText: {
    fontSize: 12,
    color: Colors.light.subtext,
    textAlign: "center",
    marginBottom: 24,
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
  loginText: {
    fontSize: 14,
    color: Colors.light.primary,
    fontWeight: "600",
  },
});