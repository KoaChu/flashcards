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
  deleteDeck: () => {},
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

      let decks = await realm.objects("Deck");
      let sortedDecks = decks.sorted("_createdAt", true);
      setDeckList(sortedDecks);

      let initialCards = sortedDecks[0]?.cards;
      setCardList(initialCards);

      decks.addListener(() => {
        let updatedDecks = decks.sorted("_createdAt", true);
        setDeckList(updatedDecks);
      });

      // console.log(JSON.stringify(decks, null, 2));
    } catch (err) {
      console.error(err);
    }
    // console.log(realm.path);
  };

  const listDecks = async () => {
    let decks = await realm.objects("Deck");

    let deckInfo = decks[0];
    // let x = new ObjectId();

    console.log(JSON.stringify(decks, null, 3));
  };

  const addDeck = async (title: string, description: string, cards: Card[]) => {
    var deckId = new ObjectId();
    var date = new Date();

    realm.write(() => {
      let deck = realm.create(
        "Deck",
        {
          _id: deckId,
          _createdAt: date,
          title: title,
          description: description,
          cards: cards,
        },
        "modified"
      );
    });
  };

  const deleteDeck = (deck: Deck) => {
    realm.write(() => {
      realm.delete(deck);
    })
  }

  useEffect(() => {
    openDB();

    return () => {
      let decks = realm.objects("Deck");

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
        deleteDeck,
        listDecks,
      }}
    >
      {children}
    </CardsContext.Provider>
  );
};

export default CardsProvider;
