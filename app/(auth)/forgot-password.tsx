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
} from "react-native";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react-native";
import Colors from "@/constants/colors";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);

  const handleResetPassword = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email address");
      return;
    }

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setResetSent(true);
    }, 1500);
  };

  if (resetSent) {
    return (
      <View style={styles.container}>
        <StatusBar style="dark" />
        <View style={styles.successContainer}>
          <CheckCircle size={64} color={Colors.light.success} />
          <Text style={styles.successTitle}>Check Your Email</Text>
          <Text style={styles.successMessage}>
            We've sent password reset instructions to {email}
          </Text>
          <Pressable
            style={styles.backToLoginButton}
            onPress={() => router.push("/login")}
          >
            <Text style={styles.backToLoginText}>Back to Login</Text>
          </Pressable>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <StatusBar style="dark" />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title}>Reset Password</Text>
          <Text style={styles.subtitle}>
            Enter your email address and we'll send you instructions to reset your password
          </Text>
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

          <Pressable
            style={[styles.resetButton, !email && styles.resetButtonDisabled]}
            onPress={handleResetPassword}
            disabled={isLoading || !email}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.resetButtonText}>Send Reset Link</Text>
            )}
          </Pressable>
        </View>

        <Pressable
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={20} color={Colors.light.primary} />
          <Text style={styles.backButtonText}>Back to Login</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  content: {
    flex: 1,
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
    lineHeight: 24,
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
    marginBottom: 24,
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
  resetButton: {
    backgroundColor: Colors.light.primary,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  resetButtonDisabled: {
    backgroundColor: Colors.light.border,
  },
  resetButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  backButtonText: {
    fontSize: 16,
    color: Colors.light.primary,
    fontWeight: "500",
    marginLeft: 8,
  },
  successContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.light.text,
    marginTop: 24,
    marginBottom: 12,
  },
  successMessage: {
    fontSize: 16,
    color: Colors.light.subtext,
    textAlign: "center",
    marginBottom: 32,
    lineHeight: 24,
  },
  backToLoginButton: {
    backgroundColor: Colors.light.primary,
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  backToLoginText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});