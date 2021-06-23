import React, { FC } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";

import Header from "../components/Header";
import { RootStackParamList } from "../types/types";
import { STYLING, COLORS } from "../constants/constants";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { useCardsContext } from "../contexts/CardsProvider";

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "NewDeck"
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
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
  saveBtn: {
    width: STYLING.width * 0.2,
    height: STYLING.width * 0.12,
    borderRadius: (STYLING.width * 0.12) / 2,
    position: "absolute",
    zIndex: 999,
    top: STYLING.spacing * 8,
    right: STYLING.spacing * 2.25,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: COLORS.white,
    backgroundColor: COLORS.db,
  },
  formWrapper: {
    width: "100%",
    flexGrow: 1,
    padding: STYLING.spacing * 1.5,
    // backgroundColor: "blue",
  },
  header: {
    height: STYLING.height * 0.16,
    backgroundColor: "transparent",
  },
  section: {
    width: "100%",
    // height: STYLING.height * 0.17,
    flexGrow: 1,
    backgroundColor: COLORS.lb,
    opacity: 0.8,
    borderRadius: 9,
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: STYLING.spacing,
    padding: STYLING.spacing,
  },
  title: {
    fontFamily: "Rubik",
    fontSize: responsiveFontSize(2.5),
    textAlign: "center",
  },
  input: {
    backgroundColor: COLORS.white,
    width: "90%",
    height: "50%",
    borderRadius: 9,
    padding: STYLING.spacing,
    fontFamily: "Rubik",
    fontSize: responsiveFontSize(2),
  },
  qaInput: {
    backgroundColor: COLORS.white,
    width: "90%",
    height: "35%",
    borderRadius: 9,
    padding: STYLING.spacing,
    fontFamily: "Rubik",
    fontSize: responsiveFontSize(2),
  },
});

const NewDeckScreen: FC<Props> = ({ navigation }) => {

  const { listDecks } = useCardsContext();

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={goBack}>
          <View>
            <Ionicons name="arrow-back" size={42} color={COLORS.white} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveBtn} onPress={listDecks}>
          <View>
            <Text
              style={{
                fontSize: responsiveFontSize(2),
                color: COLORS.white,
                fontFamily: "Rubik",
              }}
            >
              Save
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.formWrapper}>
        <ScrollView style={{ flexGrow: 1 }}>
          <View style={{ ...styles.section, maxHeight: STYLING.height * 0.17 }}>
            <Text style={styles.title}>Deck Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Max 30 characters"
              maxLength={30}
            />
          </View>

          <View style={{ ...styles.section, maxHeight: STYLING.height * 0.17 }}>
            <Text style={styles.title}>Description</Text>
            <TextInput
              style={styles.input}
              placeholder="Max 30 characters"
              maxLength={30}
            />
          </View>

          <View style={{ ...styles.section, maxHeight: STYLING.height * 0.45 }}>
            <Text style={styles.title}>Question 1</Text>
            <TextInput
              style={styles.qaInput}
              placeholder="Question"
              //   maxLength={30}
              multiline
            />
            <TextInput
              style={styles.qaInput}
              placeholder="Answer"
              //   maxLength={30}
              multiline
            />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default NewDeckScreen;
