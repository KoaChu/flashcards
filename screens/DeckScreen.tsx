import React, { FC } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { RootStackParamList } from "../types/types";
import { STYLING, COLORS } from "../constants/constants";
import DeckList from "../components/DeckList";

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Decks"
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

const DeckScreen: FC<Props> = ({ navigation }) => {
  const goToHome = () => {
    navigation.push("Home");
  };

  const styles = StyleSheet.create({
    backBtn: {
      width: STYLING.width * 0.12,
      height: STYLING.width * 0.12,
      borderRadius: (STYLING.width * 0.12) / 2,
      position: "absolute",
      zIndex: 999,
      top: STYLING.spacing * 8,
      left: STYLING.spacing * 2.25,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 2,
      borderColor: COLORS.white,
      backgroundColor: COLORS.db,
    },
    newDeckBtn: {
      width: STYLING.width * 0.25,
      height: STYLING.width * 0.15,
      backgroundColor: COLORS.db,
      borderWidth: 2,
      borderColor: COLORS.white,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: (STYLING.width * 0.15) / 2,
      position: "absolute",
      bottom: STYLING.spacing * 5,
    },
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.db,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TouchableOpacity style={styles.backBtn} onPress={goToHome}>
        <View>
          <Ionicons name="arrow-back" size={42} color={COLORS.white} />
        </View>
      </TouchableOpacity>
      <DeckList />
      <TouchableOpacity style={styles.newDeckBtn} onPress={goToHome}>
        <View>
          <FontAwesome5 name="plus" size={24} color={COLORS.white} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default DeckScreen;
