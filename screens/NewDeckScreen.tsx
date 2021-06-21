import React, { FC } from 'react'
import { View, Text } from 'react-native'
import { StackNavigationProp } from "@react-navigation/stack";

import { RootStackParamList } from "../types/types";

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "NewDeck"
>;

type Props = {
  navigation: ProfileScreenNavigationProp;
};

const NewDeckScreen: FC<Props> = ({ navigation }) => {
    return (
        <View>
            <Text></Text>
        </View>
    )
}

export default NewDeckScreen;
