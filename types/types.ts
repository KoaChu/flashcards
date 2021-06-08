export type Card = {
    question: string;
    answer: string;
    key: string;
};

export type CardsContextState = {
    listName: string;
    cardList: Card[];
    addCard: (card: Card) => void;
    removeCard: (card: Card) => void;
};

export type RootStackParamList = {
    Home: undefined;
    Decks: undefined;
};