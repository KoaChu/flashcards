import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import { STYLING, COLORS } from '../constants/constants';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function DeckButton({}) {
    return (
        <View 
            style={{
                width: STYLING.width * 0.175,
                height: STYLING.width * 0.175,
                borderRadius: (STYLING.width * 0.175) / 2,
                backgroundColor: COLORS.db,
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: COLORS.white,
                borderWidth: 2,
            }}
        >
            <TouchableOpacity onPress={() => console.log('nav placeholder') }>
                <MaterialCommunityIcons name="cards-outline" size={28} color="white" />
            </TouchableOpacity>
        </View>
    )
}
