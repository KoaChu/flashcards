import React, {
  AnimationEventHandler,
  FC,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  View,
  Text,
  ViewStyle,
  StyleSheet,
  FlatList,
  ListRenderItem,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Animated,
  Easing,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { FontAwesome5 } from "@expo/vector-icons";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";

import { useCardsContext } from "../contexts/CardsProvider";
import { STYLING, COLORS } from "../constants/constants";
import { Card } from "../types/types";
import DeckButton from "../components/DeckButton";

const CARD_HEIGHT =
  STYLING.height * 0.6 + (STYLING.height - STYLING.height * 0.6);

interface Styles {
  container: ViewStyle;
  card: ViewStyle;
  editBtn: ViewStyle;
  gradient: ViewStyle;
  deckBtn: ViewStyle;
}

interface ListProps {
  data: Card[];
}

const styles = StyleSheet.create<Styles>({
  container: {
    flex: 1,
    backgroundColor: COLORS.db,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: STYLING.width * 0.85,
    height: STYLING.height * 0.6,
    backgroundColor: COLORS.white,
    marginTop: (STYLING.height - STYLING.height * 0.6) / 2,
    marginBottom: (STYLING.height - STYLING.height * 0.6) / 2,
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

    // elevation: 24,
  },
  editBtn: {
    width: STYLING.width * 0.4,
    height: STYLING.height * 0.05,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    borderColor: COLORS.black,
    borderWidth: 2,
    borderRadius: 10,
    position: "absolute",
    bottom: STYLING.spacing * 2.5,
  },
  gradient: {
    height: STYLING.height,
    width: STYLING.width,
    position: "absolute",
    zIndex: 0,
  },
  deckBtn: {
    position: "absolute",
    zIndex: 999,
    bottom: STYLING.spacing * 5,
    left: STYLING.spacing * 5,
  },
});

const CardList: FC<ListProps> = ({ data }: ListProps): ReactElement => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  const [answer, setAnswer] = useState(false);

  // const animation = (toValue: number) => Animated.timing(animatedValue, {
  //     toValue,
  //     duration: 1000,
  //     useNativeDriver: false,
  // });

  const flipCard = (toValue: number) => {
    Animated.timing(animatedValue, {
      toValue,
      duration: 1000,
      easing: Easing.elastic(0.5),
      useNativeDriver: false,
    }).start();
    setAnswer(!answer);
  };


  return (
    <FlatList
      data={data}
      snapToAlignment={"start"}
      snapToInterval={CARD_HEIGHT}
      decelerationRate={0}
      showsVerticalScrollIndicator={false}
      onMomentumScrollBegin={() => {
        if (answer) {
          flipCard(0);
        }
      }}
      contentContainerStyle={{
        width: STYLING.width,
        alignItems: "center",
        justifyContent: "center",
      }}
      ListEmptyComponent={() => {
        return (
          <View
            style={{
              position: "absolute",
              bottom: 0,
              top: 0,
              zIndex: 98,
              // backgroundColor: 'red',
              justifyContent: "center",
              alignItems: "center",
              width: STYLING.width,
              height: STYLING.height,
            }}
          >
            <Animatable.Text
              animation={"fadeIn"}
              style={{
                color: COLORS.white,
                alignSelf: "center",
                fontFamily: "Rubik",
                fontSize: responsiveFontSize(3),
              }}
            >
              Create a deck!
            </Animatable.Text>
            <Animatable.Text
              animation="bounce"
              useNativeDriver
              iterationCount="infinite"
              iterationDelay={3000}
              duration={3000}
              style={{
                position: "absolute",
                bottom: (STYLING.spacing * 7) + (STYLING.width * 0.175),
                left: (STYLING.spacing * 5) + ((STYLING.width * 0.175) / 4),
                transform: [{ rotate: "45deg" }],
              }}
            >
              <FontAwesome5 name="arrow-down" size={38} color={COLORS.white} />
            </Animatable.Text>
          </View>
        );
      }}
      keyExtractor={(item) => item._id.toString()}
      renderItem={({ item, index }: { item: Card; index: number }) => {
        const rotateY = animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: ["0deg", "180deg"],
        });

        const opacity = animatedValue.interpolate({
          inputRange: [0, 0.001, 0.5, 0.999, 1],
          outputRange: [1, 0, 0, 0, 1],
        });

        const elevation = animatedValue.interpolate({
          inputRange: [0, 0.001, 0.999, 1],
          outputRange: [24, 0, 0, 24],
        });

        return (
          <TouchableWithoutFeedback
            onPress={() => {
              flipCard(answer ? 0 : 1);
            }}
          >
            <Animated.View
              style={{
                ...styles.card,
                transform: [{ rotateY: rotateY }],
                elevation: elevation,
              }}
            >
              <Animated.Text
                style={{
                  position: "absolute",
                  top: STYLING.spacing * 3,
                  right: STYLING.spacing * 3,
                  transform: [{ rotateY: rotateY }],
                  opacity: opacity,
                }}
              >
                {answer ? (
                  <FontAwesome5 name="check-circle" size={24} color="green" />
                ) : (
                  <FontAwesome5 name="question-circle" size={24} color="red" />
                )}
              </Animated.Text>
              <View
                style={{
                  width: STYLING.width * 0.8,
                  height: STYLING.height * 0.47,
                  transform: [{ translateY: STYLING.spacing * 2 }],
                  justifyContent: "center",
                  alignItems: "center",
                  padding: STYLING.spacing,
                  // overflow: 'scroll',
                  // backgroundColor: 'red',
                }}
              >
                <Animated.Text
                  style={{
                    transform: [{ rotateY: rotateY }],
                    opacity: opacity,
                    fontFamily: "Rubik",
                    fontSize: responsiveFontSize(2.5),
                    textAlign: "center",
                  }}
                >
                  {answer ? item.answer : item.question}
                </Animated.Text>
              </View>
            </Animated.View>
          </TouchableWithoutFeedback>
        );
      }}
    />
  );
};

const HomeScreen: FC = ({}): ReactElement => {
  const { cardList } = useCardsContext();

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <LinearGradient
        colors={[COLORS.db, COLORS.black]}
        style={styles.gradient}
      />
      <CardList data={cardList} />
      <View style={styles.deckBtn}>
        <DeckButton />
      </View>
    </View>
  );
};

export default HomeScreen;
