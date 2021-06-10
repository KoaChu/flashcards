import React, { FC } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import  { RootStackParamList } from '../types/types';
import { STYLING, COLORS } from '../constants/constants';
import DeckList from '../components/DeckList';

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Decks'
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

const DeckScreen: FC<Props> = ({ navigation }) => {

    const goToHome = () => {
        navigation.push('Home');
    };

    const styles = StyleSheet.create({
        backBtn: {
            width: STYLING.width * 0.12,
            height: STYLING.width * 0.12,
            borderRadius: (STYLING.width * 0.12) / 2,
            position: 'absolute',
            zIndex: 999,
            top: STYLING.spacing * 8,
            left: STYLING.spacing * 2.25,
            justifyContent: 'center',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: COLORS.white,
        }
    });

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.db,
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <View style={styles.backBtn}>
                <TouchableOpacity onPress={goToHome}>
                    <Ionicons name="arrow-back" size={42} color={COLORS.white} />
                </TouchableOpacity>
            </View>
            <DeckList />
        </View>
    )
}

export default DeckScreen;
