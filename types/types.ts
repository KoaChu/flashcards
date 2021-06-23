export type Card = {
    question: string;
    answer: string;
    key: string;
};

export type Deck = {
    title: string;
    description: string;
    cards: Card[];
    key: string;
};

export type CardsContextState = {
    listName: string;
    cardList: Card[];
    deckList: Deck[];
    addCard: (card: Card) => void;
    removeCard: (card: Card) => void;
    listDecks: () => void;
};

export type RootStackParamList = {
    Home: undefined;
    Decks: undefined;
    NewDeck: undefined;
};