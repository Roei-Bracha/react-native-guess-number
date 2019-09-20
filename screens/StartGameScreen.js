import React, { useState , useEffect } from 'react';
import { View, Text, StyleSheet,Dimensions, Button, TouchableWithoutFeedback,Keyboard,Alert, ScrollView, KeyboardAvoidingView } from 'react-native'
import Card from '../components/Card';
import colors from '../constants/colors'
import Input from '../components/Input'
import NumberContainer from '../components/NumberContainer';
import MainButton from '../components/MainButton';
const StartGameScreen = (props) => {
    const [enteredValue, setEnteredValue] = useState("")
    const [confirmed, setConfirmed] = useState(false)
    const [selectedValue, setSelectedValue] = useState(null)
    const [buttonWidth, setButtonWidth] = useState(Dimensions.get('window').width / 4)

    const updateLayout = () => () => {
        setButtonWidth(Dimensions.get('window').width / 4)
    }
    useEffect(() => {
        Dimensions.addEventListener("change", updateLayout)
        return (() => {
            Dimensions.removeEventListener("change", updateLayout)
        })
    })

    const enterValueHandler = (inputText) => {
        setEnteredValue(inputText.replace(/[^0-9]/g,''))
    }

    const resetEntreatedValueHandler = () => {
        setEnteredValue('')
    }
    const confirmInputHandler = () => {
        const chosenNumber = parseInt(enteredValue)
        Keyboard.dismiss()
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert("Invalid number", "the number need to be between 1 - 99", [{ text: 'OK', onPress: resetEntreatedValueHandler, style: "destructive" }])
            return
        }
        setConfirmed(true)
        setEnteredValue('')
        setSelectedValue(chosenNumber)
    }

    let confirmedOutput

    if (confirmed) {
        confirmedOutput =
            <Card style={styles.summeryContainer}>
            <Text>You selected:</Text>
            <NumberContainer>{selectedValue}</NumberContainer>
            <MainButton onPress={()=>props.startGameHandler(selectedValue)}>START GAME!</MainButton>
            </Card>
    }
    return (
        <ScrollView>
            <KeyboardAvoidingView behavior={"position"} keyboardVerticalOffset={30}>
                <TouchableWithoutFeedback onPress={()=>{Keyboard.dismiss()}}>
                    <View style={styles.screen}>
                        <Text style={styles.title}>Start a New Game!</Text>
                        <Card style={styles.inputContainer}>
                                <Text >select the number</Text>
                            <Input style={styles.input} bluerOnSubmit autoCapitalize={'none'} keyboardType={'number-pad'} maxLength={2} value={enteredValue} onChangeText={enterValueHandler}/>
                                <View style={styles.buttonsContainer}>
                                <View style={{width:buttonWidth}}><Button title={"Reset"} color={colors.primary} onPress={resetEntreatedValueHandler}/></View>
                                <View style={{width:buttonWidth}}><Button title={"Confirm"} color={colors.accent} onPress={confirmInputHandler}/></View>
                                </View>
                        </Card>
                        {confirmedOutput}

                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center"
    },
    buttonsContainer: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        paddingHorizontal:15
    },
    inputContainer: {
        width: '80%',
        minWidth:300,
        maxWidth: "95%",
        alignItems: "center",
    },
    title: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily:"open-sans-bold"
    },
    button: {
        width:Dimensions.get('window').width / 4,
    },
    input: {
        width:50
    },
    summeryContainer: {
        marginTop: 20,
        alignItems:"center"
    }
})
export default StartGameScreen