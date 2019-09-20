import React, { useState} from 'react';
import { StyleSheet, Text, View ,SafeAreaView} from 'react-native';
import * as Font from "expo-font"
import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOver from './screens/GameOver';
import { AppLoading } from 'expo'
const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold':require('./assets/fonts/OpenSans-Bold.ttf')
  })
}

export default function App() {
  const [userNumber, setUserNumber] = useState()
  const [guessRounds, setGuessRounds] = useState(0)
  const [dataLoaded, setDataLoaded] = useState(false)
  
  if (!dataLoaded) {
    return (<AppLoading startAsync={fetchFonts} onFinish={() => setDataLoaded(true)} onError={(err)=>{console.log(err)}}/>)
  }
  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber)
  }
  const endGameHandler = (numberOfRounds) => {
    setGuessRounds(numberOfRounds)
  }
  const resetGame = () => {
    setGuessRounds(0)
    setUserNumber(null)
  }

  let content = <StartGameScreen startGameHandler={startGameHandler} />
  if (userNumber && guessRounds == 0) {
    content = <GameScreen userChoice={userNumber} onGameOver={endGameHandler}/>
  } else if (guessRounds > 0) {
    content = <GameOver roundsNumber={guessRounds} userNumber={userNumber} resetGame={resetGame}/>
  }
  return (
    <SafeAreaView style={styles.screen}>
      <Header title="Guess a number" />
      {content}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex:1
  }
});
