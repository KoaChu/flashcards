import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

interface C {
    lb: string;
    db: string;
    white: string;
    black: string;
}

export const COLORS: C = {
    lb: "#AED6F1",
    db: '#2874A6',
    white: '#F0F3F4',
    black: '#17202A'
}

interface S {
    spacing: number;
    width: number;
    height: number;
}

export const STYLING: S = {
    spacing: 10,
    width: width,
    height: height
}
