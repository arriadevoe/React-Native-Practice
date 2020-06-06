import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";

// import BodyText from "../"

import Colors from "../constants/colors"

const GameOverScreen = (props) => {
  return (
    <View style={styles.screen}>
      <Text>GAME OVER</Text>
      <Text>Number was guessed in {props.rounds} rounds!</Text>
      <Text>Your number: {props.userChoice}</Text>
      <Button title="NEW GAME" onPress={props.onRestartGame} color={Colors.secondary} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default GameOverScreen;
