import React, { FC } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import  { RootStackParamList } from '../types/types';
import { STYLING, COLORS } from '../constants/constants';

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
            borderRadius: STYLING.width / 2,
            position: 'absolute',
            top: STYLING.spacing * 10,
            left: STYLING.spacing * 4,
            justifyContent: 'center',
            alignItems: 'center',
        }
    });

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.db,
                alignItems: 'center',
            }}
        >
            <View style={styles.backBtn}>
                <TouchableOpacity onPress={goToHome}>
                    <Ionicons name="arrow-back-circle-outline" size={48} color={COLORS.white} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default DeckScreen;
