import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { STYLING, COLORS } from "../constants/constants";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const DeckButton = () => {
  const navigation = useNavigation();

  const goToDecks = () => {
    navigation.navigate("Decks");
  };

  return (
    <TouchableOpacity
      style={{
        width: STYLING.width * 0.175,
        height: STYLING.width * 0.175,
        borderRadius: (STYLING.width * 0.175) / 2,
        backgroundColor: COLORS.db,
        justifyContent: "center",
        alignItems: "center",
        borderColor: COLORS.white,
        borderWidth: 2,
      }}
      onPress={goToDecks}
    >
      <View>
        <MaterialCommunityIcons name="cards-outline" size={28} color="white" />
      </View>
    </TouchableOpacity>
  );
};

export default DeckButton;
