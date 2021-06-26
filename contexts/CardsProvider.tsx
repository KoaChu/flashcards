import React, {
  useContext,
  createContext,
  useState,
  useEffect,
  FC,
} from "react";
import { Platform } from "react-native";
import Realm, { ObjectSchema } from "realm";
const { UUID, ObjectId } = Realm.BSON;
let realm: any;

import { CardsContextState, Card, Deck } from "../types/types";

const contextDefaultValues: CardsContextState = {
  listName: "",
  cardList: [],
  deckList: [],
  addCard: () => {},
  removeCard: () => {},
  addDeck: () => {},
  listDecks: () => {},
};

export const CardsContext =
  createContext<CardsContextState>(contextDefaultValues);

export const useCardsContext = () => useContext(CardsContext);

const CardSchema: ObjectSchema = {
  name: "Card",
  primaryKey: "_id",
  properties: {
    _id: "objectId",
    question: "string",
    answer: "string",
  },
};

const DeckSchema: ObjectSchema = {
  name: "Deck",
  primaryKey: "_id",
  properties: {
    _id: "objectId",
    _createdAt: "date",
    title: "string",
    description: "string",
    cards: "Card[]",
  },
};

const CardsProvider: FC = ({ children }) => {
  const [listName, setListName] = useState<string>(
    contextDefaultValues.listName
  );
  const [cardList, setCardList] = useState<Card[]>(
    contextDefaultValues.cardList
  );
  const [deckList, setDeckList] = useState<Deck[]>(
    contextDefaultValues.deckList
  );

  const openDB = async () => {
    try {
      realm = new Realm({
        path: "deckdb.realm",
        schema: [DeckSchema, CardSchema],
      });

      let decks = await realm.objects('Deck');
      let sortedDecks = decks.sorted('_createdAt', true);
      setDeckList(sortedDecks);

      let initialCards = sortedDecks[0]?.cards;
      setCardList(initialCards);

      console.log(JSON.stringify(decks, null, 2));

    } catch (err) {
      console.error(err);
    }
    // console.log(realm.path);
  };

  const listDecks = async () => {
    let decks = await realm.objects('Deck');

    let deckInfo = decks[0];
    // let x = new ObjectId();

    console.log(JSON.stringify(decks, null, 3));
  };

  const addDeck = async (title: string, description: string, cards: Card[]) => {
    var deckId = new ObjectId();
    var date = new Date();

    realm.write(() => {
      let deck = realm.create(
        'Deck',
        {
          _id: deckId,
          _createdAt: date,
          title: title,
          description: description,
          cards: cards
        },
        'modified',
      )
    });
  };

  useEffect(() => {
    openDB();

    return () => {
      let decks = realm.objects('Deck');

      decks.removeAllListeners();
      realm.close();
    };
  }, []);

  const getInfo = async () => {
    // console.log(`${FileSystem.documentDirectory}SQLite/db.db`);
  };

  const addCard = (card: Card) => {
    setCardList((cardList) => [...cardList, card]);
  };

  const removeCard = (card: Card) => {
    setCardList(
      cardList.filter((currCard) => currCard.question !== card.question)
    );
  };

  return (
    <CardsContext.Provider
      value={{
        listName,
        cardList,
        deckList,
        addCard,
        removeCard,
        addDeck,
        listDecks,
      }}
    >
      {children}
    </CardsContext.Provider>
  );
};

export default CardsProvider;



// { question: "Deck Name", answer: "description", _id: "1" },
//     { question: "Q2", answer: "2", _id: "2" },
//     { question: "3", answer: "3", _id: "3" },
//     { question: "4", answer: "4", _id: "4" },
//     { question: "5", answer: "5", _id: "5" },
//     { question: "6", answer: "6", _id: "6" },
//     { question: "1", answer: "1", _id: "7" },
//     { question: "2", answer: "2", _id: "8" },
//     { question: "3", answer: "3", _id: "9" },
//     { question: "4", answer: "4", _id: "10" },
//     { question: "5", answer: "5", _id: "11" },
//     { question: "End", answer: "options", _id: "12" },


// {
//   title: "left-spacer",
//   description: "spacer",
//   cards: [],
//   _id: "left-spacer",
// },
// {
//   title: "Deck 1",
//   description: "First deck!",
//   _id: "1",
//   cards: [
//     { question: "Q2", answer: "2", _id: "2" },
//     { question: "3", answer: "3", _id: "3" },
//     { question: "4", answer: "4", _id: "4" },
//     { question: "5", answer: "5", _id: "5" },
//     { question: "6", answer: "6", _id: "6" },
//     { question: "1", answer: "1", _id: "7" },
//     { question: "2", answer: "2", _id: "8" },
//     { question: "3", answer: "3", _id: "9" },
//     { question: "4", answer: "4", _id: "10" },
//     { question: "5", answer: "5", _id: "11" },
//   ],
// },
// {
//   title: "Deck 2",
//   description: "Second deck!",
//   _id: "2",
//   cards: [
//     { question: "Q2", answer: "2", _id: "2" },
//     { question: "3", answer: "3", _id: "3" },
//     { question: "4", answer: "4", _id: "4" },
//     { question: "5", answer: "5", _id: "5" },
//     { question: "6", answer: "6", _id: "6" },
//     { question: "1", answer: "1", _id: "7" },
//     { question: "2", answer: "2", _id: "8" },
//     { question: "3", answer: "3", _id: "9" },
//     { question: "4", answer: "4", _id: "10" },
//     { question: "5", answer: "5", _id: "11" },
//   ],
// },
// {
//   title: "Deck 3",
//   description: "Third deck!",
//   _id: "3",
//   cards: [
//     { question: "Q2", answer: "2", _id: "2" },
//     { question: "3", answer: "3", _id: "3" },
//     { question: "4", answer: "4", _id: "4" },
//     { question: "5", answer: "5", _id: "5" },
//     { question: "6", answer: "6", _id: "6" },
//     { question: "1", answer: "1", _id: "7" },
//     { question: "2", answer: "2", _id: "8" },
//     { question: "3", answer: "3", _id: "9" },
//     { question: "4", answer: "4", _id: "10" },
//     { question: "5", answer: "5", _id: "11" },
//   ],
// },
// {
//   title: "Deck 4",
//   description: "Fourth deck!",
//   _id: "4",
//   cards: [
//     { question: "Q2", answer: "2", _id: "2" },
//     { question: "3", answer: "3", _id: "3" },
//     { question: "4", answer: "4", _id: "4" },
//     { question: "5", answer: "5", _id: "5" },
//     { question: "6", answer: "6", _id: "6" },
//     { question: "1", answer: "1", _id: "7" },
//     { question: "2", answer: "2", _id: "8" },
//     { question: "3", answer: "3", _id: "9" },
//     { question: "4", answer: "4", _id: "10" },
//     { question: "5", answer: "5", _id: "11" },
//   ],
// },
// {
//   title: "Deck 5",
//   description: "Fifth deck!",
//   _id: "5",
//   cards: [
//     { question: "Q2", answer: "2", _id: "2" },
//     { question: "3", answer: "3", _id: "3" },
//     { question: "4", answer: "4", _id: "4" },
//     { question: "5", answer: "5", _id: "5" },
//     { question: "6", answer: "6", _id: "6" },
//     { question: "1", answer: "1", _id: "7" },
//     { question: "2", answer: "2", _id: "8" },
//     { question: "3", answer: "3", _id: "9" },
//     { question: "4", answer: "4", _id: "10" },
//     { question: "5", answer: "5", _id: "11" },
//   ],
// },
// {
//   title: "spacer",
//   description: "spacer",
//   cards: [],
//   _id: "right-spacer",
// },