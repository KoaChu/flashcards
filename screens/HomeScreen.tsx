import React, { FC, ReactElement, useEffect, useState } from 'react'
import { View, Text, ViewStyle, StyleSheet, FlatList, ListRenderItem, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import { StatusBar } from 'expo-status-bar';

import { useCardsContext } from '../contexts/CardsProvider';

import { STYLING, COLORS } from '../constants/constants';
import { Card } from '../types/types';

const CARD_HEIGHT = STYLING.height * 0.5 + (STYLING.height - (STYLING.height * 0.5));

interface Styles {
    container: ViewStyle;
    card: ViewStyle;
    editBtn: ViewStyle;
}

interface ListProps {
    data: Card[];
}

const styles = StyleSheet.create<Styles>({
    container: {
        flex: 1,
        backgroundColor: COLORS.lb,
        justifyContent: 'center',
        alignItems: 'center',
    },
    card: {
        width: STYLING.width * 0.85,
        height: STYLING.height * 0.5,
        backgroundColor: COLORS.white,
        marginTop: (STYLING.height - (STYLING.height * 0.5)) / 2,
        marginBottom: (STYLING.height - (STYLING.height * 0.5)) / 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,
    },
    editBtn: {
        width: STYLING.width * 0.4,
        height: STYLING.height * 0.05,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        borderColor: COLORS.black,
        borderWidth: 2,
        borderRadius: 10,
        position: 'absolute',
        bottom: STYLING.spacing * 2.5,
    }
});

const CardList: FC<ListProps> = ({ data }: ListProps): ReactElement => {
    // console.log("DATA -> " + data);
    const [answer, setAnswer] = useState(false);

    return (
        <FlatList
            data={data}
            snapToAlignment={"start"}
            snapToInterval={CARD_HEIGHT}
            decelerationRate={0}
            contentContainerStyle={{
                width: STYLING.width,
                alignItems: 'center',
                justifyContent: 'center',
            }}
            keyExtractor={item => item.key}
            renderItem={({ item, index }: { item: Card, index: number } ) => {
                return (
                    <TouchableWithoutFeedback onPress={() => { setAnswer(!answer) }}>
                        <View 
                            style={styles.card}
                        >
                            <Text>{answer ? item.answer : item.question}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                );
            }}
        />
    );
}

const HomeScreen: FC = ({}): ReactElement => {
    const { cardList } = useCardsContext();

    return (
        <View style={styles.container}>
            <StatusBar style="dark" />
            <CardList data={cardList}/>
        </View>
    )
}

export default HomeScreen;