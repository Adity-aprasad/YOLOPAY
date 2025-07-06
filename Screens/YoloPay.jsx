import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  ActivityIndicator,
  Alert,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";

const YoloPay = () => {
  const [selectedMode, setSelectedMode] = useState("card");
  const [showCVV, setShowCVV] = useState(false);
  const [isFrozen, setIsFrozen] = useState(false);
  const [cardData, setCardData] = useState({
    cardNumber: [],
    expiryDate: "01/28",
    cvv: "789",
    holderName: "JOHN DOE",
    loading: true,
  });

  // Fetch data from Faker.js API or generate fake data
  useEffect(() => {
    const fetchCardData = async () => {
      try {
        // Using a public API to get user data (simulating Faker.js)
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users/1"
        );
        const userData = await response.json();

        // Generate fake card data
        const fakeCardData = {
          cardNumber: generateCardNumber(),
          expiryDate: generateExpiryDate(),
          cvv: generateCVV(),
          holderName: userData.name.toUpperCase(),
          loading: false,
        };

        setCardData(fakeCardData);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Fallback to default generated data
        setCardData({
          cardNumber: generateCardNumber(),
          expiryDate: generateExpiryDate(),
          cvv: generateCVV(),
          holderName: "JOHN DOE",
          loading: false,
        });
      }
    };

    fetchCardData();
  }, []);

  // Helper functions to generate fake data
  const generateCardNumber = () => {
    const parts = [];
    for (let i = 0; i < 4; i++) {
      parts.push(Math.floor(1000 + Math.random() * 9000).toString());
    }
    return parts;
  };

  const generateExpiryDate = () => {
    const month = Math.floor(1 + Math.random() * 12)
      .toString()
      .padStart(2, "0");
    const year = (new Date().getFullYear() + Math.floor(1 + Math.random() * 5))
      .toString()
      .slice(-2);
    return `${month}/${year}`;
  };

  const generateCVV = () => {
    return Math.floor(100 + Math.random() * 900).toString();
  };

  const copyCardDetails = async () => {
    const details = `Card Number: ${cardData.cardNumber.join(" ")}\nExpiry: ${
      cardData.expiryDate
    }\nCVV: ${cardData.cvv}\nHolder: ${cardData.holderName}`;
    await Clipboard.setStringAsync(details);
    Alert.alert("Copied!", "Card details copied to clipboard");
  };

  const refreshCardData = () => {
    setCardData((prev) => ({ ...prev, loading: true }));
    setTimeout(() => {
      setCardData({
        cardNumber: generateCardNumber(),
        expiryDate: generateExpiryDate(),
        cvv: generateCVV(),
        holderName: "JOHN DOE",
        loading: false,
      });
    }, 1000);
  };
  const iconColor = isFrozen ? "red" : "white";
  const borderColor = isFrozen ? "red" : "white";

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      {/* Main Content */}
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>select payment mode</Text>
          <Text style={styles.subtitle}>
            choose your preferred payment method to make payment.
          </Text>
        </View>

        {/* Payment Mode Toggle */}
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              selectedMode === "pay" && styles.toggleButtonActive,
            ]}
            onPress={() => setSelectedMode("pay")}
          >
            <Text
              style={[
                styles.toggleText,
                selectedMode === "pay" && styles.toggleTextActive,
              ]}
            >
              pay
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.toggleButton,
              styles.toggleButtonCard,
              selectedMode === "card" && styles.toggleButtonCardActive,
            ]}
            onPress={() => setSelectedMode("card")}
          >
            <Text style={styles.toggleTextCard}>card</Text>
          </TouchableOpacity>
        </View>

        {/* Card Section */}
        <View style={styles.cardSection}>
          <View style={styles.cardSectionHeader}>
            <Text style={styles.cardSectionTitle}>YOUR DIGITAL DEBIT CARD</Text>
            <TouchableOpacity
              onPress={refreshCardData}
              style={styles.refreshButton}
            >
              <Ionicons name="refresh" size={20} color="#666" />
            </TouchableOpacity>
          </View>

          <View style={styles.cardContainer}>
            {/* Card */}
            <View style={styles.card}>
              {isFrozen ? (
                // Frozen card shows frozen state
                <View style={styles.frozenCardContent}>
                  <Image
                    source={require("../images/image.png")}
                    style={styles.cardImage}
                  />
                </View>
              ) : cardData.loading ? (
                // Loading state
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="large" color="#ff4444" />
                  <Text style={styles.loadingText}>Loading card data...</Text>
                </View>
              ) : (
                // Normal card content with fetched data
                <>
                  <View style={styles.cardHeader}>
                    <Text style={styles.yoloText}>YOLO</Text>
                    <View style={styles.yesBankContainer}>
                      <Text style={styles.yesBankText}>YES</Text>
                      <Text style={styles.bankText}>BANK</Text>
                    </View>
                  </View>

                  <View style={styles.cardBody}>
                    <View style={styles.cardLeft}>
                      <View style={styles.cardNumbers}>
                        {cardData.cardNumber.map((number, index) => (
                          <Text key={index} style={styles.cardNumber}>
                            {number}
                          </Text>
                        ))}
                      </View>
                      <Text style={styles.holderName}>
                        {cardData.holderName}
                      </Text>
                    </View>

                    <View style={styles.cardRight}>
                      <View style={styles.cardDetails}>
                        <Text style={styles.expiryLabel}>expiry</Text>
                        <Text style={styles.expiryDate}>
                          {cardData.expiryDate}
                        </Text>

                        <View style={styles.cvvContainer}>
                          <Text style={styles.cvvLabel}>cvv</Text>
                          <View style={styles.cvvRow}>
                            <Text style={styles.cvvText}>
                              {showCVV ? cardData.cvv : "***"}
                            </Text>
                            <TouchableOpacity
                              onPress={() => setShowCVV(!showCVV)}
                            >
                              <Ionicons
                                name={showCVV ? "eye-off" : "eye"}
                                size={16}
                                color="#ff4444"
                              />
                            </TouchableOpacity>
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>

                  <TouchableOpacity
                    style={styles.copyButton}
                    onPress={copyCardDetails}
                  >
                    <Ionicons name="copy-outline" size={16} color="#ff4444" />
                    <Text style={styles.copyText}>copy details</Text>
                  </TouchableOpacity>

                  <View style={styles.cardFooter}>
                    <Text style={styles.rupayText}>RuPay</Text>
                    <Text style={styles.prepaidText}>PREPAID</Text>
                  </View>
                </>
              )}
            </View>

            <TouchableOpacity
              style={styles.freezeButton}
              onPress={() => setIsFrozen(!isFrozen)}
            >
              <Ionicons
                name="snow"
                size={24}
                color={iconColor}
                style={[styles.icon, { borderColor: borderColor }]}
              />
              <Text style={styles.freezeText}>
                {isFrozen ? "unfreeze" : "freeze"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default YoloPay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    marginTop: 40,
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    color: "white",
    fontWeight: "300",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: "#888",
    lineHeight: 24,
  },
  toggleContainer: {
    flexDirection: "row",
    marginBottom: 60,
  },
  toggleButton: {
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#444",
    marginRight: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  toggleButtonActive: {
    backgroundColor: "white",
    borderColor: "white",
    shadowColor: "#fff",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  toggleButtonCard: {
    borderColor: "#ff4444",
  },
  toggleButtonCardActive: {
    borderColor: "#ff4444",
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  toggleText: {
    color: "white",
    fontSize: 16,
  },
  toggleTextActive: {
    color: "black",
  },
  toggleTextCard: {
    color: "#ff4444",
    fontSize: 16,
  },
  cardSection: {
    flex: 1,
  },
  cardSectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  cardSectionTitle: {
    color: "#666",
    fontSize: 12,
    fontWeight: "500",
    letterSpacing: 1,
  },
  refreshButton: {
    padding: 8,
  },
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  card: {
    width: 186,
    height: 296,
    backgroundColor: "#1a1a1a",
    borderRadius: 16,
    padding: 20,
    marginRight: 20,
    borderWidth: 1,
    borderColor: "#333",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 10,
  },
  frozenCardContent: {
    width: 86,
    height: 96,

    marginRight: 20,
  },
  cardImage: {
    width: 286,
    height: 370,
    resizeMode: "cover",
    right: 40,
    top: -40,
  },
  frozenText: {
    color: "#4a90e2",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: "#888",
    fontSize: 14,
    marginTop: 16,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  yoloText: {
    color: "#ff4444",
    fontSize: 24,
    fontWeight: "bold",
  },
  yesBankContainer: {
    backgroundColor: "#4a90e2",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  yesBankText: {
    color: "white",
    fontSize: 10,
    fontWeight: "bold",
  },
  bankText: {
    color: "white",
    fontSize: 8,
    textAlign: "center",
  },
  cardBody: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  cardLeft: {
    flex: 1,
  },
  cardNumbers: {
    gap: 8,
    marginBottom: 16,
  },
  cardNumber: {
    color: "white",
    fontSize: 18,
    fontWeight: "500",
  },
  holderName: {
    color: "#888",
    fontSize: 12,
    fontWeight: "500",
  },
  cardRight: {
    alignItems: "flex-end",
  },
  cardDetails: {
    alignItems: "flex-end",
  },
  expiryLabel: {
    color: "#888",
    fontSize: 12,
    marginBottom: 4,
  },
  expiryDate: {
    color: "white",
    fontSize: 16,
    marginBottom: 16,
  },
  cvvContainer: {
    alignItems: "flex-end",
  },
  cvvLabel: {
    color: "#888",
    fontSize: 12,
    marginBottom: 4,
  },
  cvvRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  cvvText: {
    color: "white",
    fontSize: 16,
  },
  copyButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginBottom: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: "flex-start",
  },
  copyText: {
    color: "#ff4444",
    fontSize: 14,
  },
  cardFooter: {
    alignItems: "center",
  },
  rupayText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    fontStyle: "italic",
  },
  prepaidText: {
    color: "#888",
    fontSize: 12,
    fontWeight: "500",
  },
  freezeButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#1a1a1a",
    gap: 8,
    borderWidth: 1,
    borderColor: "#444",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  freezeText: {
    color: "white",
    fontSize: 12,
  },
});
