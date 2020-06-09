import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, Alert } from "react-native";

import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import MainButton from "../components/MainButton";
import TitleText from "../components/TitleText";

// BUILT OUTSIDE COMPONENT TO AVOID RE-RENDERING, FOR PERFORMANCE (NO PROPS OR STATE USED...)
const generateRandomBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  // WILL RETURN NUMBER BETWEEN MIN AND MAX
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

const GameScreen = (props) => {
  const [currentGuess, setCurrentGuess] = useState(
    generateRandomBetween(1, 100, props.userChoice)
  );
  const [rounds, setRounds] = useState(0);

  // useRef avoids re-rendering state, value stored in "current" property
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const { userChoice, onGameOver } = props;

  // useEffect allows you to run logic after every render cycle!
  // Dependencies of effect: second argument is array of dependencies
  // Will only re-run useEffect if dependencies are modified
  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(rounds);
    }
  }, [currentGuess, userChoice, onGameOver]);

  const nextGuessHandler = (direction) => {
    if (
      (direction === "LOWER" && currentGuess < props.userChoice) ||
      (direction === "GREATER" && currentGuess > props.userChoice)
    ) {
      Alert.alert("Don't lie!", "You know this is wrong...", [
        { text: "Sorry!", syle: "cancel" },
      ]);
      return;
    }

    if (direction === "LOWER") {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess;
    }

    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );

    setCurrentGuess(nextNumber);
    setRounds((currRounds) => currRounds + 1);
  };

  return (
    <View style={styles.screen}>
      <TitleText>Opponent's Guess:</TitleText>
      <NumberContainer userChoice={currentGuess} />
      <Card style={styles.buttonContainer}>
        <MainButton onPress={nextGuessHandler.bind(this, "LOWER")}>
          HIGHER
        </MainButton>
        <MainButton onPress={nextGuessHandler.bind(this, "HIGHER")}>
          LOWER
        </MainButton>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    width: 400,
    maxWidth: "90%",
  },
});

export default GameScreen;
