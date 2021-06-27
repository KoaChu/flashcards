import React, { FC, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { ObjectId } from "bson";

import Header from "../components/Header";
import { RootStackParamList } from "../types/types";
import { STYLING, COLORS } from "../constants/constants";
import { responsiveFontSize } from "react-native-responsive-dimensions";
import { useCardsContext } from "../contexts/CardsProvider";
import { Card } from "../types/types";

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
  trashBtn: {
    width: STYLING.width * 0.07,
    height: STYLING.width * 0.07,
    borderRadius: (STYLING.width * 0.07) / 2,
    position: "absolute",
    zIndex: 999,
    top: STYLING.spacing * 1.5,
    right: STYLING.spacing * 2.25,
    justifyContent: "center",
    alignItems: "center",
    // borderWidth: 2,
    borderColor: "maroon",
    backgroundColor: "transparent",
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
  newDeckBtn: {
    width: STYLING.width * 0.25,
    height: STYLING.width * 0.15,
    backgroundColor: COLORS.db,
    borderWidth: 2,
    borderColor: COLORS.white,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: (STYLING.width * 0.15) / 2,
    margin: STYLING.spacing * 0.5,
    // position: "absolute",
    // bottom: 0,
  },
});

const NewDeckScreen: FC<Props> = ({ navigation }) => {
  const { listDecks, addDeck } = useCardsContext();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [questions, setQuestions] = useState<Card[] | []>([]);

  const addCard = () => {
    var newId = new ObjectId();

    setQuestions((questions) => [
      ...questions,
      { _id: newId, question: "", answer: "" },
    ]);
  };

  const removeCard = (removeId: number) => {
    Alert.alert("Remove Card?", "", [
      {
        text: "Cancel",
        onPress: () => {
          return;
        },
        style: "cancel",
      },
      {
        text: "Remove",
        onPress: () => {
          setQuestions(questions.filter((q) => q._id !== removeId));
        },
      },
    ]);
  };

  const setNameText = (text: string) => {
    setName(text);
  };

  const setDescriptionText = (text: string) => {
    setDescription(text);
  };

  const changeQuestionText = (text: string, index: number) => {
    let tempArr = [...questions];

    tempArr[index].question = text;
    setQuestions(tempArr);
  };

  const changeAnswerText = (text: string, index: number) => {
    let tempArr = [...questions];

    tempArr[index].answer = text;
    setQuestions(tempArr);
  };

  const goBack = () => {
    Alert.alert("Going Back", "Unsaved changes will be lost!", [
      {
        text: "Stay",
        onPress: () => {
          return;
        },
        style: "cancel",
      },
      {
        text: "Leave",
        onPress: () => {
          navigation.goBack();
        },
      },
    ]);
  };

  const saveDeck = async () => {
    if (!name || !description) {
      Alert.alert('Give your deck a name and description!');
      return;
    }
    if (questions.length < 1) {
      Alert.alert('Add some cards before saving. You can edit these later!');
      return;
    }
    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].question || !questions[i].answer) {
        Alert.alert('Some of your cards are missing information!');
        return;
      }
    }
    try {
      addDeck(name, description, questions);
      navigation.navigate("Decks");
    } catch (err) {
      console.error(err);
    }
  };  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={goBack}>
          <View>
            <Ionicons name="arrow-back" size={42} color={COLORS.white} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveBtn} onPress={saveDeck}>
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
      <ScrollView
        style={{ flexGrow: 1, marginBottom: STYLING.spacing * 3 }}
        contentContainerStyle={{
          alignItems: "center",
        }}
      >
        <View style={{ ...styles.section, maxHeight: STYLING.height * 0.17 }}>
          <Text style={styles.title}>Deck Name</Text>
          <TextInput
            onChangeText={setNameText}
            style={styles.input}
            placeholder="Max 30 characters"
            maxLength={30}
          />
        </View>

        <View style={{ ...styles.section, maxHeight: STYLING.height * 0.35 }}>
          <Text style={styles.title}>Description</Text>
          <TextInput
            onChangeText={setDescriptionText}
            style={{...styles.qaInput, height: '65%'}}
            placeholder="Description"
            multiline
            // maxLength={60}
          />
        </View>

        {questions.map((q: Card, index: number) => {
          return (
            <View
              style={{ ...styles.section, maxHeight: STYLING.height * 0.45 }}
              key={q._id}
            >
              <View style={styles.trashBtn}>
                <TouchableOpacity onPress={() => removeCard(q._id)}>
                  <Ionicons name="md-trash-sharp" size={22} color={"maroon"} />
                </TouchableOpacity>
              </View>
              <Text style={styles.title}>Question {index + 1}</Text>
              <TextInput
                onChangeText={(text: string) => changeQuestionText(text, index)}
                style={styles.qaInput}
                placeholder="Question"
                //   maxLength={30}
                multiline
              />
              <TextInput
                onChangeText={(text: string) => changeAnswerText(text, index)}
                style={styles.qaInput}
                placeholder="Answer"
                //   maxLength={30}
                multiline
              />
            </View>
          );
        })}

        <TouchableOpacity style={styles.newDeckBtn} onPress={addCard}>
          <View>
            <FontAwesome5 name="plus" size={24} color={COLORS.white} />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default NewDeckScreen;
