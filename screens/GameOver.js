import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions } from 'react-native'
import NumberContainer from '../components/NumberContainer';
import globalStyles from '../constants/globalStyles';
import colors from '../constants/colors';
import MainButton from '../components/MainButton';

const GameOver = ({ roundsNumber, userNumber, resetGame}) => {
    
    return (
        <ScrollView>
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
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical:10
    },
    imageContainer: {
        width: Dimensions.get("window").width * 0.75,
        height: Dimensions.get("window").width * 0.75,
        borderRadius: Dimensions.get("window").width * 0.75 / 2,
        borderWidth: 3,
        borderColor: "black",
        overflow: "hidden",
        marginVertical:Dimensions.get("window").height / 20
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
        marginVertical:Dimensions.get("window").height / 40
    },
    resultText: {
        textAlign:'center'
    }
})

export default GameOver