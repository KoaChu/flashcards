import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
// import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

import { RootStackParamList } from '../types/types';

import HomeScreen from '../screens/HomeScreen';
import DeckScreen from '../screens/DeckScreen';
import NewDeckScreen from '../screens/NewDeckScreen';

const Stack = createStackNavigator<RootStackParamList>();

export const RootNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator 
                screenOptions={{
                    headerShown: false,
                    gestureEnabled: false,
                }} 
                initialRouteName={'Home'}
            >
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="Decks" component={DeckScreen} />
                <Stack.Screen name="NewDeck" component={NewDeckScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}