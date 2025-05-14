import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  ScrollView,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Stack } from "expo-router";
import { CreditCard, Plus, Trash2, CheckCircle } from "lucide-react-native";
import Colors from "@/constants/colors";

interface PaymentMethod {
  id: string;
  type: "visa" | "mastercard" | "amex";
  last4: string;
  expiry: string;
  isDefault: boolean;
}

export default function PaymentMethodsScreen() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: "1",
      type: "visa",
      last4: "4242",
      expiry: "12/24",
      isDefault: true,
    },
    {
      id: "2",
      type: "mastercard",
      last4: "5678",
      expiry: "06/25",
      isDefault: false,
    },
  ]);
  
  const [showAddCard, setShowAddCard] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const handleSetDefault = (id: string) => {
    setPaymentMethods(
      paymentMethods.map((method) => ({
        ...method,
        isDefault: method.id === id,
      }))
    );
  };

  const handleDeleteCard = (id: string) => {
    Alert.alert(
      "Delete Card",
      "Are you sure you want to delete this payment method?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Delete", 
          style: "destructive",
          onPress: () => {
            const updatedMethods = paymentMethods.filter((method) => method.id !== id);
            
            // If we deleted the default card and there are other cards, make the first one default
            if (paymentMethods.find((method) => method.id === id)?.isDefault && updatedMethods.length > 0) {
              updatedMethods[0].isDefault = true;
            }
            
            setPaymentMethods(updatedMethods);
          }
        }
      ]
    );
  };

  const handleAddCard = () => {
    // Basic validation
    if (!cardNumber || !cardName || !expiryDate || !cvv) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    
    if (cardNumber.length < 16) {
      Alert.alert("Error", "Please enter a valid card number");
      return;
    }
    
    // In a real app, you would validate the card with a payment processor
    
    const newCard: PaymentMethod = {
      id: Date.now().toString(),
      type: "visa", // This would be determined by the card number in a real app
      last4: cardNumber.slice(-4),
      expiry: expiryDate,
      isDefault: paymentMethods.length === 0, // Make default if it's the first card
    };
    
    setPaymentMethods([...paymentMethods, newCard]);
    setShowAddCard(false);
    
    // Reset form
    setCardNumber("");
    setCardName("");
    setExpiryDate("");
    setCvv("");
  };

  const getCardIcon = (type: string) => {
    // In a real app, you would use actual card brand icons
    switch (type) {
      case "visa":
        return "Visa";
      case "mastercard":
        return "Mastercard";
      case "amex":
        return "Amex";
      default:
        return "Card";
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Payment Methods",
        }}
      />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 88 : 0}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.sectionTitle}>Your Payment Methods</Text>
          
          {paymentMethods.length > 0 ? (
            <View style={styles.cardList}>
              {paymentMethods.map((method) => (
                <View key={method.id} style={styles.cardItem}>
                  <View style={styles.cardInfo}>
                    <Text style={styles.cardType}>{getCardIcon(method.type)}</Text>
                    <Text style={styles.cardNumber}>•••• {method.last4}</Text>
                    <Text style={styles.cardExpiry}>Expires {method.expiry}</Text>
                    {method.isDefault && (
                      <View style={styles.defaultBadge}>
                        <Text style={styles.defaultText}>Default</Text>
                      </View>
                    )}
                  </View>
                  <View style={styles.cardActions}>
                    {!method.isDefault && (
                      <Pressable
                        style={styles.setDefaultButton}
                        onPress={() => handleSetDefault(method.id)}
                      >
                        <Text style={styles.setDefaultText}>Set Default</Text>
                      </Pressable>
                    )}
                    <Pressable
                      style={styles.deleteButton}
                      onPress={() => handleDeleteCard(method.id)}
                    >
                      <Trash2 size={20} color={Colors.light.error} />
                    </Pressable>
                  </View>
                </View>
              ))}
            </View>
          ) : (
            <View style={styles.emptyState}>
              <CreditCard size={48} color={Colors.light.subtext} />
              <Text style={styles.emptyText}>No payment methods added yet</Text>
            </View>
          )}
          
          {!showAddCard ? (
            <Pressable
              style={styles.addCardButton}
              onPress={() => setShowAddCard(true)}
            >
              <Plus size={20} color={Colors.light.primary} />
              <Text style={styles.addCardText}>Add New Card</Text>
            </Pressable>
          ) : (
            <View style={styles.addCardForm}>
              <Text style={styles.formTitle}>Add New Card</Text>
              
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Card Number</Text>
                <TextInput
                  style={styles.input}
                  value={cardNumber}
                  onChangeText={setCardNumber}
                  placeholder="1234 5678 9012 3456"
                  keyboardType="number-pad"
                  maxLength={16}
                  placeholderTextColor={Colors.light.subtext}
                />
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Cardholder Name</Text>
                <TextInput
                  style={styles.input}
                  value={cardName}
                  onChangeText={setCardName}
                  placeholder="John Smith"
                  placeholderTextColor={Colors.light.subtext}
                />
              </View>
              
              <View style={styles.inputRow}>
                <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                  <Text style={styles.label}>Expiry Date</Text>
                  <TextInput
                    style={styles.input}
                    value={expiryDate}
                    onChangeText={setExpiryDate}
                    placeholder="MM/YY"
                    maxLength={5}
                    placeholderTextColor={Colors.light.subtext}
                  />
                </View>
                
                <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                  <Text style={styles.label}>CVV</Text>
                  <TextInput
                    style={styles.input}
                    value={cvv}
                    onChangeText={setCvv}
                    placeholder="123"
                    keyboardType="number-pad"
                    maxLength={4}
                    placeholderTextColor={Colors.light.subtext}
                  />
                </View>
              </View>
              
              <View style={styles.formButtons}>
                <Pressable
                  style={styles.cancelFormButton}
                  onPress={() => setShowAddCard(false)}
                >
                  <Text style={styles.cancelFormText}>Cancel</Text>
                </Pressable>
                <Pressable
                  style={styles.saveCardButton}
                  onPress={handleAddCard}
                >
                  <Text style={styles.saveCardText}>Save Card</Text>
                </Pressable>
              </View>
            </View>
          )}
          
          <Text style={styles.securityNote}>
            Your payment information is securely stored and encrypted.
          </Text>
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
    paddingBottom: 40,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.light.text,
    marginBottom: 16,
  },
  cardList: {
    marginBottom: 24,
  },
  cardItem: {
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  cardInfo: {
    marginBottom: 12,
  },
  cardType: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.light.text,
    marginBottom: 4,
  },
  cardNumber: {
    fontSize: 14,
    color: Colors.light.text,
    marginBottom: 4,
  },
  cardExpiry: {
    fontSize: 14,
    color: Colors.light.subtext,
  },
  defaultBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    backgroundColor: Colors.light.primary,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  defaultText: {
    color: "white",
    fontSize: 12,
    fontWeight: "600",
  },
  cardActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  setDefaultButton: {
    marginRight: 16,
  },
  setDefaultText: {
    color: Colors.light.primary,
    fontWeight: "600",
  },
  deleteButton: {
    padding: 4,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    marginBottom: 24,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.light.subtext,
    marginTop: 16,
  },
  addCardButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    backgroundColor: "rgba(74, 128, 240, 0.1)",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.light.primary,
    borderStyle: "dashed",
  },
  addCardText: {
    color: Colors.light.primary,
    fontWeight: "600",
    fontSize: 16,
    marginLeft: 8,
  },
  addCardForm: {
    backgroundColor: Colors.light.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.light.text,
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.light.text,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
    color: Colors.light.text,
    backgroundColor: Colors.light.background,
  },
  inputRow: {
    flexDirection: "row",
    marginBottom: 16,
  },
  formButtons: {
    flexDirection: "row",
    gap: 12,
  },
  cancelFormButton: {
    flex: 1,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 8,
  },
  cancelFormText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.light.text,
  },
  saveCardButton: {
    flex: 2,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.light.primary,
    borderRadius: 8,
  },
  saveCardText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
  securityNote: {
    fontSize: 12,
    color: Colors.light.subtext,
    textAlign: "center",
    marginTop: 16,
  },
});