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
  cardList: [
    { question: "Deck Name", answer: "description", key: "1" },
    { question: "Q2", answer: "2", key: "2" },
    { question: "3", answer: "3", key: "3" },
    { question: "4", answer: "4", key: "4" },
    { question: "5", answer: "5", key: "5" },
    { question: "6", answer: "6", key: "6" },
    { question: "1", answer: "1", key: "7" },
    { question: "2", answer: "2", key: "8" },
    { question: "3", answer: "3", key: "9" },
    { question: "4", answer: "4", key: "10" },
    { question: "5", answer: "5", key: "11" },
    { question: "End", answer: "options", key: "12" },
  ],
  deckList: [
    {
      title: "left-spacer",
      description: "spacer",
      cards: [],
      key: "left-spacer",
    },
    {
      title: "Deck 1",
      description: "First deck!",
      key: "1",
      cards: [
        { question: "Q2", answer: "2", key: "2" },
        { question: "3", answer: "3", key: "3" },
        { question: "4", answer: "4", key: "4" },
        { question: "5", answer: "5", key: "5" },
        { question: "6", answer: "6", key: "6" },
        { question: "1", answer: "1", key: "7" },
        { question: "2", answer: "2", key: "8" },
        { question: "3", answer: "3", key: "9" },
        { question: "4", answer: "4", key: "10" },
        { question: "5", answer: "5", key: "11" },
      ],
    },
    {
      title: "Deck 2",
      description: "Second deck!",
      key: "2",
      cards: [
        { question: "Q2", answer: "2", key: "2" },
        { question: "3", answer: "3", key: "3" },
        { question: "4", answer: "4", key: "4" },
        { question: "5", answer: "5", key: "5" },
        { question: "6", answer: "6", key: "6" },
        { question: "1", answer: "1", key: "7" },
        { question: "2", answer: "2", key: "8" },
        { question: "3", answer: "3", key: "9" },
        { question: "4", answer: "4", key: "10" },
        { question: "5", answer: "5", key: "11" },
      ],
    },
    {
      title: "Deck 3",
      description: "Third deck!",
      key: "3",
      cards: [
        { question: "Q2", answer: "2", key: "2" },
        { question: "3", answer: "3", key: "3" },
        { question: "4", answer: "4", key: "4" },
        { question: "5", answer: "5", key: "5" },
        { question: "6", answer: "6", key: "6" },
        { question: "1", answer: "1", key: "7" },
        { question: "2", answer: "2", key: "8" },
        { question: "3", answer: "3", key: "9" },
        { question: "4", answer: "4", key: "10" },
        { question: "5", answer: "5", key: "11" },
      ],
    },
    {
      title: "Deck 4",
      description: "Fourth deck!",
      key: "4",
      cards: [
        { question: "Q2", answer: "2", key: "2" },
        { question: "3", answer: "3", key: "3" },
        { question: "4", answer: "4", key: "4" },
        { question: "5", answer: "5", key: "5" },
        { question: "6", answer: "6", key: "6" },
        { question: "1", answer: "1", key: "7" },
        { question: "2", answer: "2", key: "8" },
        { question: "3", answer: "3", key: "9" },
        { question: "4", answer: "4", key: "10" },
        { question: "5", answer: "5", key: "11" },
      ],
    },
    {
      title: "Deck 5",
      description: "Fifth deck!",
      key: "5",
      cards: [
        { question: "Q2", answer: "2", key: "2" },
        { question: "3", answer: "3", key: "3" },
        { question: "4", answer: "4", key: "4" },
        { question: "5", answer: "5", key: "5" },
        { question: "6", answer: "6", key: "6" },
        { question: "1", answer: "1", key: "7" },
        { question: "2", answer: "2", key: "8" },
        { question: "3", answer: "3", key: "9" },
        { question: "4", answer: "4", key: "10" },
        { question: "5", answer: "5", key: "11" },
      ],
    },
    {
      title: "spacer",
      description: "spacer",
      cards: [],
      key: "right-spacer",
    },
  ],
  addCard: () => {},
  removeCard: () => {},
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
    } catch (err) {
      console.error(err);
    }
    // console.log(realm.path);
  };

  const listDecks = async () => {
    let decks = await realm.objects('Deck');
    let deckInfo = decks[0];
    // let x = new ObjectId();

    console.log(deckInfo);
  };

  const addDeck = async (deckId: string, title: string, description: string, cards: any[]) => {
    realm.write(() => {
      let deck = realm.create(
        'Deck',
        'modified',
        {
          _id: deckId,
          title: title,
          description: description,
          cards: cards
        }
      )
    });
  };

  useEffect(() => {
    openDB();

    return () => {
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
        listDecks,
      }}
    >
      {children}
    </CardsContext.Provider>
  );
};

export default CardsProvider;
