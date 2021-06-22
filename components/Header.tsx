import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { COLORS, STYLING } from "../constants/constants";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center'
  },
  backBtn: {
    width: STYLING.width * 0.12,
    height: STYLING.width * 0.12,
    borderRadius: (STYLING.width * 0.12) / 2,
    // position: "absolute",
    // zIndex: 999,
    // top: STYLING.spacing * 8,
    // left: STYLING.spacing * 2.25,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: COLORS.white,
    backgroundColor: COLORS.db,
  },
});

export default function Header() {

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backBtn} onPress={() => {}}>
        <View>
          <Ionicons name="arrow-back" size={42} color={COLORS.white} />
        </View>
      </TouchableOpacity>
    </View>
  );
}
