import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Animated,
  TouchableOpacity,
} from "react-native";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { Ionicons, MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";

import { Deck } from "../types/types";
import { useCardsContext } from "../contexts/CardsProvider";
import { STYLING, COLORS } from "../constants/constants";

const CARD_WIDTH = STYLING.width * 0.85
const ITEM_SIZE = CARD_WIDTH + STYLING.spacing;
const SPACER_SIZE = STYLING.width - ITEM_SIZE / 2;

export default function DeckList() {
  const [deckListWithSpacers, setDeckListWithSpacers] = useState<Deck[] | []>([]);

  const { deckList } = useCardsContext();
  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setDeckListWithSpacers([
      {
        title: "left-spacer",
        description: "spacer",
        cards: [],
        _id: "left-spacer",
        _createdAt: new Date()
      },
      ...deckList,
      {
        title: "right-spacer",
        description: "spacer",
        cards: [],
        _id: "right-spacer",
        _createdAt: new Date()
      },
    ])
  },[deckList]);

  const styles = StyleSheet.create({
    card: {
      width: STYLING.width * 0.85,
      height: STYLING.height * 0.5,
      backgroundColor: COLORS.white,
      margin: STYLING.spacing / 2,
      //   margin: (STYLING.width - STYLING.width * 0.85) / 2,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 10,
      borderColor: COLORS.black,
      borderWidth: 1,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 12,
      },
      shadowOpacity: 0.58,
      shadowRadius: 16.0,

      elevation: 24,
    },
    text: {
      fontFamily: "Rubik",
      fontSize: responsiveFontSize(2.5),
      textAlign: "center",
    },
    trashBtn: {
      width: STYLING.width * 0.09,
      height: STYLING.width * 0.09,
      borderRadius: (STYLING.width * 0.09) / 2,
      position: "absolute",
      zIndex: 999,
      top: STYLING.spacing * 2,
      right: STYLING.spacing * 2.25,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 2,
      borderColor: 'maroon',
      backgroundColor: 'transparent',
    },
    editBtn: {
      width: STYLING.width * 0.09,
      height: STYLING.width * 0.09,
      borderRadius: (STYLING.width * 0.09) / 2,
      position: "absolute",
      zIndex: 999,
      top: (STYLING.spacing * 3) + (STYLING.width * 0.09),
      right: STYLING.spacing * 2.25,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: COLORS.black,
      backgroundColor: COLORS.db,
    },
  });

  return (
    <View
      style={{
        width: STYLING.width,
        height: STYLING.height,
        backgroundColor: COLORS.black,
        // justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Animated.FlatList
        data={deckListWithSpacers}
        keyExtractor={(item) => item._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToAlignment="start"
        snapToInterval={ITEM_SIZE}
        decelerationRate={0}
        scrollEventThrottle={16}
        bounces={false}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        renderItem={({ item, index }) => {
          if (item._id === "left-spacer" || item._id === "right-spacer") {
            return (
              <View
                style={{
                  width: (STYLING.width - CARD_WIDTH) / 2,
                }}
              />
            );
          }

          const inputRange = [
            (index - 2) * ITEM_SIZE,
            (index - 1) * ITEM_SIZE,
            (index) * ITEM_SIZE,
          ];

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.4, 1, 0.4],
          });

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [40, 0, 40],
          });

          return (
            <Animated.View
              style={{
                ...styles.card,
                opacity: deckList.length > 1 ? opacity : 1,
                transform: [{ translateY: deckList.length > 1 ? translateY : 0 }],
              }}
            >
              <View style={styles.trashBtn}>
                <TouchableOpacity onPress={() => console.log("placeholder")}>
                  <Ionicons name="md-trash-sharp" size={22} color={"maroon"} />
                </TouchableOpacity>
              </View>
              <View style={styles.editBtn}>
                <TouchableOpacity onPress={() => console.log("placeholder")}>
                  <MaterialIcons name="mode-edit" size={24} color={COLORS.white} />
                </TouchableOpacity>
              </View>
              <Text style={styles.text}>{item.title}</Text>
            </Animated.View>
          );
        }}
      />
    </View>
  );
}
