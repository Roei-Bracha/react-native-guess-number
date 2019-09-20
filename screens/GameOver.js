import React from 'react';
import { View, Text, StyleSheet , Button , Image } from 'react-native'
import NumberContainer from '../components/NumberContainer';
import globalStyles from '../constants/globalStyles';
import colors from '../constants/colors';
import MainButton from '../components/MainButton';

const GameOver = ({ roundsNumber, userNumber, resetGame}) => {
    
    return (
        <View style={styles.screen}>
            <Text style={globalStyles.title}> the game is over</Text>
            <View style={styles.imageContainer}>
                <Image style={styles.image} resizeMode={"cover"} source={require('../assets/images/success.png')} />
            </View>
            <View style={styles.resultsContainer}>
                <Text style={{ ...globalStyles.text, ...styles.resultText}}>
                    your phone needed<Text style={styles.highlight}> {roundsNumber} </Text>
                    rounds to guess that your number is <Text style={styles.highlight}>{userNumber}</Text></Text>
            </View>
            <MainButton onPress={resetGame}>NEW GAME</MainButton>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems:"center"
    },
    imageContainer: {
        width: 300,
        height: 300,
        borderRadius: 150,
        borderWidth: 3,
        borderColor: "black",
        overflow: "hidden",
        marginVertical:15
    },
    image: {
        width: '100%',
        height: '100%',
    },
    highlight: {
        color: colors.primary,
        fontFamily:'open-sans-bold'
    },
    resultsContainer: {
        width: '80%',
        marginVertical:15
    },
    resultText: {
        textAlign:'center'
    }
})

export default GameOver