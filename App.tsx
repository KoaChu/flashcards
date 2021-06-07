import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import CardsProvider from './contexts/CardsProvider';
import { RootNavigator } from './navigation/navigator';

export default function App() {
  return (
    <CardsProvider>
      <RootNavigator />
    </CardsProvider>
  );
}
