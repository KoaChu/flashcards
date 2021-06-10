import React, { useEffect, useRef } from "react";
import { View, Text, FlatList, StyleSheet, Animated } from "react-native";

import { useCardsContext } from "../contexts/CardsProvider";
import { STYLING, COLORS } from "../constants/constants";

const ITEM_SIZE = STYLING.width * 0.85 + STYLING.spacing;
const SPACER_SIZE = STYLING.width - ITEM_SIZE / 2;

export default function DeckList() {
  const { deckList } = useCardsContext();
  const scrollX = useRef(new Animated.Value(0)).current;

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
  });

  return (
    <View
      style={{
        width: STYLING.width,
        height: STYLING.height,
        backgroundColor: COLORS.db,
        // justifyContent: "center",
        // alignItems: "center",
      }}
    >
      <Animated.FlatList
        data={deckList}
        keyExtractor={(item) => item.key}
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
            { useNativeDriver: false }
        )}
        renderItem={({ item, index }) => {
          if (item.key === "left-spacer" || item.key === "right-spacer") {
            return (
              <View
                style={{
                  width: STYLING.spacing * 2.25,
                }}
              />
            );
          }

          const inputRange = [(index - 2) * ITEM_SIZE, (index - 1) * ITEM_SIZE, (index) * ITEM_SIZE];

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [ 0.4, 1, 0.4]
          });

          const translateY = scrollX.interpolate({
            inputRange,
            outputRange: [40, 0, 40],
          });

          return (
            <Animated.View
              style={{
                ...styles.card,
                opacity: opacity,
                transform: [
                    { translateY: translateY }
                ]
              }}
            >
              <Text>{item.title}</Text>
            </Animated.View>
          );
        }}
      />
    </View>
  );
}
