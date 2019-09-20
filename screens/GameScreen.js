import React, { useState , useRef, useEffect} from 'react';
import { View, Text, StyleSheet , Alert } from 'react-native'
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import MainButton from '../components/MainButton';
import { Ionicons } from '@expo/vector-icons'

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude) {
      return generateRandomBetween(min, max, exclude);
    } else {
      return rndNum;
    }
  };

const GameScreen = ({userChoice , onGameOver}) => {
    const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1, 100, userChoice))
    const [rounds,setRounds] = useState(1)
    const currentMin = useRef(1)
    const currentMax = useRef(100)
    const nextGuessHandler = direction => {
        if ((direction === "lower" && currentGuess < userChoice) || (direction === "higher" && currentGuess > userChoice)) {
            Alert.alert("Don't Lie!", "you know its not true", [{ text: "sorry", style: "cancel" }])
            return
        }
        if (direction == "lower") {
            currentMax.current = currentGuess
        }
        if(direction === "higher"){
            currentMin.current = currentGuess
        }
        const nextGuess = generateRandomBetween(currentMin.current, currentMax.current, currentGuess)
        setCurrentGuess(nextGuess)
        setRounds(currentRounds=>currentRounds+1)
    }
    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(rounds)
        }
    },[currentGuess,userChoice,onGameOver])
    return (
        <View style={styles.screen}>
            <Text>my guest is:</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={nextGuessHandler.bind(this, "lower")}><Ionicons name={'md-remove'} size={24} color={"white"}/></MainButton>
                <MainButton onPress={nextGuessHandler.bind(this,"higher")}><Ionicons name={'md-add'} size={24} color={"white"}/></MainButton>
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: "center",
        padding:10
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 20,
        width: 400,
        maxWidth:'90%'
    }
})

export default GameScreen