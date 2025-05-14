import React, { useState } from "react";
import { StyleSheet, View, Text, Modal, Pressable, ScrollView } from "react-native";
import { X } from "lucide-react-native";
import Slider from "@/components/Slider";
import Colors from "@/constants/colors";

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  filters: {
    minPrice: number;
    maxPrice: number;
    bedrooms: number;
    bathrooms: number;
  };
  onApplyFilters: (filters: {
    minPrice: number;
    maxPrice: number;
    bedrooms: number;
    bathrooms: number;
  }) => void;
}

export default function FilterModal({
  visible,
  onClose,
  filters,
  onApplyFilters,
}: FilterModalProps) {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleApply = () => {
    onApplyFilters(localFilters);
    onClose();
  };

  const handleReset = () => {
    const resetFilters = {
      minPrice: 0,
      maxPrice: 5000,
      bedrooms: 0,
      bathrooms: 0,
    };
    setLocalFilters(resetFilters);
    onApplyFilters(resetFilters);
    onClose();
  };

  const handlePriceChange = (values: number[]) => {
    setLocalFilters({
      ...localFilters,
      minPrice: values[0],
      maxPrice: values[1],
    });
  };

  const handleBedroomsChange = (value: number) => {
    setLocalFilters({
      ...localFilters,
      bedrooms: value,
    });
  };

  const handleBathroomsChange = (value: number) => {
    setLocalFilters({
      ...localFilters,
      bathrooms: value,
    });
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Filters</Text>
            <Pressable onPress={onClose} hitSlop={10}>
              <X size={24} color={Colors.light.text} />
            </Pressable>
          </View>

          <ScrollView style={styles.filtersContainer}>
            <View style={styles.filterSection}>
              <Text style={styles.sectionTitle}>Price Range</Text>
              <Slider
                min={0}
                max={5000}
                step={100}
                values={[localFilters.minPrice, localFilters.maxPrice]}
                onValuesChange={handlePriceChange}
              />
              <View style={styles.priceLabels}>
                <Text style={styles.priceLabel}>${localFilters.minPrice}</Text>
                <Text style={styles.priceLabel}>${localFilters.maxPrice}</Text>
              </View>
            </View>

            <View style={styles.filterSection}>
              <Text style={styles.sectionTitle}>Bedrooms</Text>
              <View style={styles.optionsContainer}>
                {[0, 1, 2, 3, 4].map((num) => (
                  <Pressable
                    key={`bed-${num}`}
                    style={[
                      styles.optionButton,
                      localFilters.bedrooms === num && styles.selectedOption,
                    ]}
                    onPress={() => handleBedroomsChange(num)}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        localFilters.bedrooms === num && styles.selectedOptionText,
                      ]}
                    >
                      {num === 0 ? "Any" : num === 4 ? "4+" : num}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>

            <View style={styles.filterSection}>
              <Text style={styles.sectionTitle}>Bathrooms</Text>
              <View style={styles.optionsContainer}>
                {[0, 1, 2, 3, 4].map((num) => (
                  <Pressable
                    key={`bath-${num}`}
                    style={[
                      styles.optionButton,
                      localFilters.bathrooms === num && styles.selectedOption,
                    ]}
                    onPress={() => handleBathroomsChange(num)}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        localFilters.bathrooms === num && styles.selectedOptionText,
                      ]}
                    >
                      {num === 0 ? "Any" : num === 4 ? "4+" : num}
                    </Text>
                  </Pressable>
                ))}
              </View>
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <Pressable style={styles.resetButton} onPress={handleReset}>
              <Text style={styles.resetButtonText}>Reset</Text>
            </Pressable>
            <Pressable style={styles.applyButton} onPress={handleApply}>
              <Text style={styles.applyButtonText}>Apply Filters</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: Colors.light.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
    paddingBottom: 30,
    height: "80%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.light.border,
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: Colors.light.text,
  },
  filtersContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  filterSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.light.text,
    marginBottom: 16,
  },
  priceLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  priceLabel: {
    fontSize: 14,
    color: Colors.light.subtext,
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginHorizontal: -4,
  },
  optionButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.light.border,
    marginHorizontal: 4,
    marginBottom: 8,
    minWidth: 60,
    alignItems: "center",
  },
  selectedOption: {
    backgroundColor: Colors.light.primary,
    borderColor: Colors.light.primary,
  },
  optionText: {
    fontSize: 14,
    color: Colors.light.text,
  },
  selectedOptionText: {
    color: "white",
    fontWeight: "500",
  },
  footer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
  },
  resetButton: {
    flex: 1,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.light.border,
    borderRadius: 8,
    marginRight: 8,
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.light.text,
  },
  applyButton: {
    flex: 2,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.light.primary,
    borderRadius: 8,
    marginLeft: 8,
  },
  applyButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
});