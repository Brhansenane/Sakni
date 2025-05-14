import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { Image } from "expo-image";
import { Send, Paperclip } from "lucide-react-native";
import Colors from "@/constants/colors";
import { useAuthStore } from "@/hooks/use-auth-store";

interface Message {
  id: string;
  text: string;
  sender: "user" | "other";
  timestamp: string;
  read: boolean;
}

// Mock conversation data
const mockConversations: Record<string, {
  id: string;
  user: {
    id: string;
    name: string;
    avatar: string;
  };
  property: {
    id: string;
    title: string;
  };
  messages: Message[];
}> = {
  "c1": {
    id: "c1",
    user: {
      id: "u1",
      name: "John Smith",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    },
    property: {
      id: "1",
      title: "Modern Studio in Downtown",
    },
    messages: [
      {
        id: "m1",
        text: "Hi, I'm interested in your apartment. Is it still available for viewing this weekend?",
        sender: "other",
        timestamp: "10:30 AM",
        read: true,
      },
      {
        id: "m2",
        text: "Yes, it's available! Would you like to schedule a viewing?",
        sender: "user",
        timestamp: "10:35 AM",
        read: true,
      },
      {
        id: "m3",
        text: "Great! I would love to see it on Saturday around 2 PM if that works for you?",
        sender: "other",
        timestamp: "10:40 AM",
        read: true,
      },
      {
        id: "m4",
        text: "Saturday at 2 PM works perfectly. I'll put you down for that time slot.",
        sender: "user",
        timestamp: "10:45 AM",
        read: true,
      },
      {
        id: "m5",
        text: "Awesome! By the way, does the apartment come with parking?",
        sender: "other",
        timestamp: "10:50 AM",
        read: false,
      },
    ],
  },
  "c2": {
    id: "c2",
    user: {
      id: "u2",
      name: "Emily Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    },
    property: {
      id: "2",
      title: "Luxury 2BR with Ocean View",
    },
    messages: [
      {
        id: "m1",
        text: "Hello, I saw your listing for the 2BR apartment with ocean view. I'm very interested!",
        sender: "other",
        timestamp: "Yesterday",
        read: true,
      },
      {
        id: "m2",
        text: "Hi Emily! Thanks for your interest. The apartment is still available. Would you like to schedule a viewing?",
        sender: "user",
        timestamp: "Yesterday",
        read: true,
      },
      {
        id: "m3",
        text: "Yes, I would love to see it tomorrow if possible?",
        sender: "other",
        timestamp: "Yesterday",
        read: true,
      },
      {
        id: "m4",
        text: "Tomorrow works! I have availability at 3 PM. Does that work for you?",
        sender: "user",
        timestamp: "Yesterday",
        read: true,
      },
      {
        id: "m5",
        text: "3 PM is perfect. I'll see you then!",
        sender: "other",
        timestamp: "Yesterday",
        read: true,
      },
      {
        id: "m6",
        text: "Great! I'll see you tomorrow at 3 PM for the viewing.",
        sender: "user",
        timestamp: "Yesterday",
        read: true,
      },
    ],
  },
};

export default function ChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { user } = useAuthStore();
  const [newMessage, setNewMessage] = useState("");
  const [conversation, setConversation] = useState(mockConversations[id as string]);
  const flatListRef = useRef<FlatList>(null);

  useEffect(() => {
    // Scroll to bottom when component mounts
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: false });
    }, 100);
  }, []);

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      text: newMessage.trim(),
      sender: "user",
      timestamp: "Just now",
      read: false,
    };

    setConversation({
      ...conversation,
      messages: [...conversation.messages, message],
    });
    setNewMessage("");

    // Scroll to bottom after sending message
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === "user" ? styles.userMessage : styles.otherMessage,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
      <Text style={styles.messageTimestamp}>{item.timestamp}</Text>
    </View>
  );

  if (!conversation) {
    return (
      <View style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>Conversation not found</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: conversation.user.name,
          headerRight: () => (
            <Image
              source={{ uri: conversation.user.avatar }}
              style={styles.headerAvatar}
              contentFit="cover"
            />
          ),
        }}
      />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 88 : 0}
      >
        <View style={styles.propertyInfoContainer}>
          <Text style={styles.propertyInfoText}>
            Conversation about: <Text style={styles.propertyTitle}>{conversation.property.title}</Text>
          </Text>
        </View>
        
        <FlatList
          ref={flatListRef}
          data={conversation.messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          contentContainerStyle={styles.messagesList}
          showsVerticalScrollIndicator={true}
        />
        
        <View style={styles.inputContainer}>
          <Pressable style={styles.attachButton}>
            <Paperclip size={20} color={Colors.light.subtext} />
          </Pressable>
          <TextInput
            style={styles.input}
            value={newMessage}
            onChangeText={setNewMessage}
            placeholder="Type a message..."
            placeholderTextColor={Colors.light.subtext}
            multiline
          />
          <Pressable
            style={[
              styles.sendButton,
              !newMessage.trim() && styles.sendButtonDisabled,
            ]}
            onPress={handleSendMessage}
            disabled={!newMessage.trim()}
          >
            <Send size={20} color={newMessage.trim() ? "white" : Colors.light.subtext} />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  headerAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  propertyInfoContainer: {
    padding: 12,
    backgroundColor: Colors.light.card,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  propertyInfoText: {
    fontSize: 14,
    color: Colors.light.subtext,
    textAlign: "center",
  },
  propertyTitle: {
    color: Colors.light.primary,
    fontWeight: "500",
  },
  messagesList: {
    padding: 16,
    paddingBottom: 20,
  },
  messageContainer: {
    maxWidth: "80%",
    padding: 12,
    borderRadius: 16,
    marginBottom: 12,
  },
  userMessage: {
    alignSelf: "flex-end",
    backgroundColor: Colors.light.primary,
    borderBottomRightRadius: 4,
  },
  otherMessage: {
    alignSelf: "flex-start",
    backgroundColor: Colors.light.card,
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 16,
    color: (props) => (props.style?.includes(styles.userMessage) ? "white" : Colors.light.text),
    marginBottom: 4,
  },
  messageTimestamp: {
    fontSize: 12,
    color: (props) => (props.style?.includes(styles.userMessage) ? "rgba(255, 255, 255, 0.7)" : Colors.light.subtext),
    alignSelf: "flex-end",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
    backgroundColor: Colors.light.background,
  },
  attachButton: {
    padding: 8,
  },
  input: {
    flex: 1,
    backgroundColor: Colors.light.card,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    maxHeight: 100,
    fontSize: 16,
    color: Colors.light.text,
    marginHorizontal: 8,
  },
  sendButton: {
    backgroundColor: Colors.light.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonDisabled: {
    backgroundColor: Colors.light.border,
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  notFoundText: {
    fontSize: 18,
    color: Colors.light.text,
  },
});