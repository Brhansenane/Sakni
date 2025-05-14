import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { Image } from "expo-image";
import { Camera, User, Mail, Phone } from "lucide-react-native";
import * as ImagePicker from "expo-image-picker";
import Colors from "@/constants/colors";
import { useAuthStore } from "@/hooks/use-auth-store";

export default function EditProfileScreen() {
  const router = useRouter();
  const { user, updateUser } = useAuthStore();
  
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState(user?.phone || "");
  const [avatar, setAvatar] = useState(user?.avatar || "");

  const handlePickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert("Permission Required", "You need to grant permission to access your photos");
      return;
    }
    
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });
    
    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    if (!name || !email) {
      Alert.alert("Error", "Name and email are required");
      return;
    }
    
    updateUser({
      name,
      email,
      phone,
      avatar,
    });
    
    Alert.alert("Success", "Profile updated successfully", [
      { text: "OK", onPress: () => router.back() }
    ]);
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Edit Profile",
        }}
      />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 88 : 0}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80" }}
              style={styles.avatar}
              contentFit="cover"
            />
            <Pressable style={styles.changePhotoButton} onPress={handlePickImage}>
              <Camera size={20} color="white" />
              <Text style={styles.changePhotoText}>Change Photo</Text>
            </Pressable>
          </View>

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Full Name</Text>
              <View style={styles.inputContainer}>
                <User size={20} color={Colors.light.subtext} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                  placeholder="Enter your full name"
                  placeholderTextColor={Colors.light.subtext}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <View style={styles.inputContainer}>
                <Mail size={20} color={Colors.light.subtext} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  placeholderTextColor={Colors.light.subtext}
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Phone Number</Text>
              <View style={styles.inputContainer}>
                <Phone size={20} color={Colors.light.subtext} style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  value={phone}
                  onChangeText={setPhone}
                  placeholder="Enter your phone number"
                  keyboardType="phone-pad"
                  placeholderTextColor={Colors.light.subtext}
                />
              </View>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <Pressable style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </Pressable>
            <Pressable style={styles.cancelButton} onPress={() => router.back()}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  scrollContent: {
    padding: 20,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
  },
  changePhotoButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  changePhotoText: {
    color: "white",
    fontWeight: "600",
    marginLeft: 8,
  },
  form: {
    marginBottom: 32,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.light.text,
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 8,
    paddingHorizontal: 12,
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
  buttonContainer: {
    gap: 12,
  },
  saveButton: {
    backgroundColor: Colors.light.primary,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  cancelButton: {
    backgroundColor: Colors.light.card,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  cancelButtonText: {
    color: Colors.light.text,
    fontSize: 16,
    fontWeight: "600",
  },
});