import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Pressable,
  TextInput,
} from "react-native";
import { useRouter } from "expo-router";
import { Image } from "expo-image";
import { Search, Circle } from "lucide-react-native";
import Colors from "@/constants/colors";

// Mock conversation data
interface Conversation {
  id: string;
  user: {
    id: string;
    name: string;
    avatar: string;
  };
  lastMessage: {
    text: string;
    timestamp: string;
    isRead: boolean;
    isOwn: boolean;
  };
  property: {
    id: string;
    title: string;
  };
}

const mockConversations: Conversation[] = [
  {
    id: "c1",
    user: {
      id: "u1",
      name: "John Smith",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    },
    lastMessage: {
      text: "Is the apartment still available for viewing this weekend?",
      timestamp: "10:30 AM",
      isRead: false,
      isOwn: false,
    },
    property: {
      id: "1",
      title: "Modern Studio in Downtown",
    },
  },
  {
    id: "c2",
    user: {
      id: "u2",
      name: "Emily Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    },
    lastMessage: {
      text: "Great! I'll see you tomorrow at 3 PM for the viewing.",
      timestamp: "Yesterday",
      isRead: true,
      isOwn: true,
    },
    property: {
      id: "2",
      title: "Luxury 2BR with Ocean View",
    },
  },
  {
    id: "c3",
    user: {
      id: "u3",
      name: "Michael Brown",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    },
    lastMessage: {
      text: "Does the apartment come with parking?",
      timestamp: "Yesterday",
      isRead: true,
      isOwn: false,
    },
    property: {
      id: "3",
      title: "Cozy 1BR in Historic District",
    },
  },
  {
    id: "c4",
    user: {
      id: "u4",
      name: "Sarah Wilson",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    },
    lastMessage: {
      text: "I'm interested in a long-term lease. Is that possible?",
      timestamp: "2 days ago",
      isRead: false,
      isOwn: false,
    },
    property: {
      id: "5",
      title: "Stylish 3BR Family Apartment",
    },
  },
  {
    id: "c5",
    user: {
      id: "u5",
      name: "David Lee",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    },
    lastMessage: {
      text: "Yes, utilities are included in the rent.",
      timestamp: "3 days ago",
      isRead: true,
      isOwn: true,
    },
    property: {
      id: "6",
      title: "Penthouse with Private Terrace",
    },
  },
];

export default function MessagesScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredConversations = mockConversations.filter(
    (conversation) =>
      conversation.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conversation.property.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleConversationPress = (id: string) => {
    router.push(`/chat/${id}`);
  };

  const renderConversationItem = ({ item }: { item: Conversation }) => (
    <Pressable
      style={styles.conversationItem}
      onPress={() => handleConversationPress(item.id)}
    >
      <View style={styles.avatarContainer}>
        <Image source={{ uri: item.user.avatar }} style={styles.avatar} contentFit="cover" />
        {!item.lastMessage.isRead && !item.lastMessage.isOwn && (
          <View style={styles.unreadBadge} />
        )}
      </View>
      
      <View style={styles.conversationContent}>
        <View style={styles.conversationHeader}>
          <Text style={styles.userName}>{item.user.name}</Text>
          <Text style={styles.timestamp}>{item.lastMessage.timestamp}</Text>
        </View>
        
        <Text style={styles.propertyTitle} numberOfLines={1}>
          Re: {item.property.title}
        </Text>
        
        <Text
          style={[
            styles.lastMessage,
            !item.lastMessage.isRead && !item.lastMessage.isOwn && styles.unreadMessage,
          ]}
          numberOfLines={1}
        >
          {item.lastMessage.isOwn ? "You: " : ""}{item.lastMessage.text}
        </Text>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Search size={20} color={Colors.light.subtext} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search messages..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={Colors.light.subtext}
        />
      </View>
      
      <FlatList
        data={filteredConversations}
        keyExtractor={(item) => item.id}
        renderItem={renderConversationItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              {searchQuery ? "No conversations match your search" : "No messages yet"}
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.light.card,
    margin: 16,
    marginBottom: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: Colors.light.text,
  },
  listContent: {
    paddingHorizontal: 16,
  },
  conversationItem: {
    flexDirection: "row",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  avatarContainer: {
    position: "relative",
    marginRight: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  unreadBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: Colors.light.primary,
    borderWidth: 2,
    borderColor: Colors.light.background,
  },
  conversationContent: {
    flex: 1,
  },
  conversationHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  userName: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.light.text,
  },
  timestamp: {
    fontSize: 12,
    color: Colors.light.subtext,
  },
  propertyTitle: {
    fontSize: 14,
    color: Colors.light.primary,
    marginBottom: 4,
  },
  lastMessage: {
    fontSize: 14,
    color: Colors.light.subtext,
  },
  unreadMessage: {
    color: Colors.light.text,
    fontWeight: "500",
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.light.subtext,
  },
});