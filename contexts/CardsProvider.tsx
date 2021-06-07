import React, { useContext, createContext, useState, useEffect, FC } from "react";

import { CardsContextState, Card } from '../types/types';

const contextDefaultValues: CardsContextState = {
    listName: '',
    cardList: [
        {question: 'Deck Name', answer: 'description', key: '1'},
        {question: 'Q2', answer: '2', key: '2'},
        {question: '3', answer: '3', key: '3'},
        {question: '4', answer: '4', key: '4'},
        {question: '5', answer: '5', key: '5'},
        {question: '6', answer: '6', key: '6'},   
        {question: '1', answer: '1', key: '7'},
        {question: '2', answer: '2', key: '8'},
        {question: '3', answer: '3', key: '9'},
        {question: '4', answer: '4', key: '10'},
        {question: '5', answer: '5', key: '11'},
        {question: 'End', answer: 'options', key: '12'},  
    ],
    addCard: () => {},
    removeCard: () => {}
}

export const CardsContext = createContext<CardsContextState>(
    contextDefaultValues
);

export const useCardsContext = () => useContext(CardsContext);

const CardsProvider: FC = ({ children }) => {
    const [listName, setListName] = useState<string>(contextDefaultValues.listName);
    const [cardList, setCardList] = useState<Card[]>(contextDefaultValues.cardList);

    useEffect(() => {
        console.log('Context Running');
    },[]);
    
    const addCard = (card: Card) => {
        setCardList((cardList) => [...cardList, card])
    }

    const removeCard = (card: Card) => {
        setCardList(cardList.filter(currCard => currCard.question !== card.question))
    }

    return (
        <CardsContext.Provider
            value={{
                listName,
                cardList,
                addCard,
                removeCard,
            }}
        >
            {children}
        </CardsContext.Provider>
    );
}

export default CardsProvider;
