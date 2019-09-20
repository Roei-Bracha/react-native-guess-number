import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity , TouchableNativeFeedback, Platform} from 'react-native'
import colors from '../constants/colors';

const MainButton = (props) => {
    let ButtonComponent = TouchableOpacity
    if (Platform.Version > 22) {
        ButtonComponent=TouchableNativeFeedback
    }
    return (
        <View style={styles.buttonContainer}>
        <ButtonComponent onPress={props.onPress} activeOpacity={0.8} >
            <View style={styles.button}>
                <Text style={styles.textButton}>{props.children}</Text>
            </View>
            </ButtonComponent>
        </View>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.primary,
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius:25
    },
    textButton: {
        color: 'white',
        fontFamily: 'open-sans',
        fontSize:18
    },
    buttonContainer: {
        borderRadius: 25,
        overflow:'hidden'
    }
})

export default MainButton