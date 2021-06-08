import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useFonts, Rubik_400Regular } from '@expo-google-fonts/rubik';

import CardsProvider from './contexts/CardsProvider';
import { RootNavigator } from './navigation/navigator';

export default function App() {

  let [fontsLoaded] = useFonts({
    'Rubik': Rubik_400Regular,
  });

  if (!fontsLoaded) {
    return <Text>Loading Placeholder</Text>
  }

  return (
    <CardsProvider>
      <RootNavigator />
    </CardsProvider>
  );
}
