import React from 'react';
import { View, Text, StyleSheet } from 'react-native'

const Card = ({children , style}) => {
    
    return (
        <View style={{ ...styles.card,  ...style}}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation:5,
        backgroundColor: "white",
        padding: 20,
        borderRadius: 20,
        shadowColor: "black",
    }
})

export default Card