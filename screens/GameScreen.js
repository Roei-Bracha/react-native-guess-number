import React, { useState , useRef, useEffect} from 'react';
import { View, Text, StyleSheet , Alert , FlatList} from 'react-native'
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import MainButton from '../components/MainButton';
import { Ionicons } from '@expo/vector-icons'
import globalStyles from "../constants/globalStyles";

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


const renderListItem = (listLength,itemData)=>{
    return(
        <View style={styles.listItem}>
            <Text style={globalStyles.text}># {listLength- itemData.index}</Text>
            <Text style={globalStyles.text}>{itemData.item}</Text>
        </View>
    )
}


const GameScreen = ({userChoice , onGameOver}) => {
    const initalGuest = generateRandomBetween(1, 100, userChoice)
    const [currentGuess, setCurrentGuess] = useState(initalGuest)
    const [pastGuesses,setPassGuesses] = useState([initalGuest.toString()])
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
            currentMin.current = currentGuess + 1
        }
        const nextGuess = generateRandomBetween(currentMin.current, currentMax.current, currentGuess)
        setCurrentGuess(nextGuess)
        setPassGuesses(cuurentPassGuesses=>[...cuurentPassGuesses,nextGuess.toString()])
    };
    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(pastGuesses.length)
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
            <View style={styles.listContainer}>
                <FlatList keyExtractor={item=>item} data={pastGuesses} renderItem={renderListItem.bind(this, pastGuesses.length)} contentContainerStyle={styles.list}/>
            </View>
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
    },
    listContainer: {
        width: '60%',
        flex:1
    },
    list: {
        flexGrow:1,
        justifyContent:"flex-end"
    },
    listItem: {
        borderColor: '#ccc',
        borderWidth:1,
        marginVertical: 10,
        padding: 15,
        backgroundColor: 'white',
        flexDirection: "row",
        justifyContent: 'space-around',
        width:'100%'
    }
})

export default GameScreen