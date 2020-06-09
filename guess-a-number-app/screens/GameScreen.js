import React, { useState, useRef, useEffect } from "react";
import { View, StyleSheet, Alert, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // https://icons.expo.fyi/

import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import MainButton from "../components/MainButton";
import TitleText from "../components/TitleText";
import BodyText from "../components/BodyText";

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

const renderListItem = (value, round) => (
  <View style={styles.listItem} key={value}>
    <BodyText>#{round}</BodyText>
    <BodyText>{value}</BodyText>
  </View>
);

const GameScreen = (props) => {
  const initialGuess = generateRandomBetween(1, 100, props.userChoice);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [pastGuesses, setPastGuesses] = useState([initialGuess]);

  // useRef avoids re-rendering state, value stored in "current" property
  const currentLow = useRef(1);
  const currentHigh = useRef(100);

  const { userChoice, onGameOver } = props;

  // useEffect allows you to run logic after every render cycle!
  // Dependencies of effect: second argument is array of dependencies
  // Will only re-run useEffect if dependencies are modified
  useEffect(() => {
    if (currentGuess === userChoice) {
      onGameOver(pastGuesses.length);
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
      currentLow.current = currentGuess + 1;
    }

    const nextNumber = generateRandomBetween(
      currentLow.current,
      currentHigh.current,
      currentGuess
    );

    setCurrentGuess(nextNumber);
    setPastGuesses((currPastGuesses) => [nextNumber, ...currPastGuesses]);
  };

  return (
    <View style={styles.screen}>
      <TitleText>Computer's Guess:</TitleText>
      <NumberContainer userChoice={currentGuess} />
      <Card style={styles.buttonContainer}>
        <MainButton onPress={nextGuessHandler.bind(this, "LOWER")}>
          <Ionicons name="md-remove" size={24} color="white" />
        </MainButton>
        <MainButton onPress={nextGuessHandler.bind(this, "HIGHER")}>
          <Ionicons name="md-add" size={24} color="white" />
        </MainButton>
      </Card>
      <View style={styles.list}>
        <ScrollView>
          {pastGuesses.map((guess, index) =>
            renderListItem(guess, pastGuesses.length - index)
          )}
        </ScrollView>
      </View>
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
    width: 300,
    maxWidth: "80%",
  },
  list: {
    flex: 1, // REQUIRED FOR SCROLL FUNCTIONALITY ON ANDROID!!
    width: "80%",
  },
  listItem: {
    flexDirection: "row",
    borderColor: "black",
    borderWidth: 1,
    padding: 15,
    marginVertical: 10,
    justifyContent: "space-around",
  },
});

export default GameScreen;
