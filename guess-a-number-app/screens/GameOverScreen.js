import React from "react";
import { View, Button, StyleSheet, Image } from "react-native";

import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";

import Colors from "../constants/colors";

const GameOverScreen = (props) => {
  return (
    <View style={styles.screen}>
      <TitleText>GAME OVER</TitleText>
      <View style={styles.imageContainer} >
        <Image
          style={styles.image}
          source={require("../assets/success.png")}
          // resizeMode={"contain"} // "COVER" BY DEFAULT
        />
      </View>
      <BodyText>Number was guessed in {props.rounds} rounds!</BodyText>
      <BodyText>Your number: {props.userChoice}</BodyText>
      <Button
        title="NEW GAME"
        onPress={props.onRestartGame}
        color={Colors.secondary}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: 300, // WILL NEED RESPONSIVENESS LATER 
    height: 300,
    borderRadius: 300,
    borderWidth: 2,
    borderColor: "black",
    overflow: "hidden",
    marginVertical: 30
  },
  image: {
    width: "100%",
    height: "100%"
  },
});

export default GameOverScreen;
