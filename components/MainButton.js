import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import colors from '../constants/colors';

const MainButton = (props) => {
    
    return (
        <TouchableOpacity onPress={props.onPress} activeOpacity={0.8} >
            <View style={styles.button}>
                <Text style={styles.textButton}>{props.children}</Text>
            </View>
        </TouchableOpacity>
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
    }
})

export default MainButton