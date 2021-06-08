import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons';

import { STYLING, COLORS } from '../constants/constants';

export default function DeckScreen() {
    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.db,
                alignItems: 'center',
            }}
        >
            <TouchableOpacity>
                <Ionicons name="arrow-back-circle-outline" size={32} color={COLORS.lb} />
            </TouchableOpacity>
        </View>
    )
}
