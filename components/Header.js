import React from 'react'
import { View, Text, StyleSheet, Platform} from 'react-native'
import colors from '../constants/colors'

const Header = ({ title }) => {
    return (
        <View style={{ ...styles.headerBase , ...Platform.select({ios:styles.headerIos,android:styles.headerAndroid}) }}>
            <Text style={styles.headerTitle}>{title}</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    headerBase: {
        width: "100%",
        height: 70,
        paddingTop: 15,
        alignItems: "center",
        justifyContent: 'center',
    },
    headerAndroid: {
        backgroundColor: colors.primary
    },
    headerIos: {
        backgroundColor: 'white',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1
    },
    headerTitle: {
        color: "black",
        fontSize: 18,
        fontFamily: 'open-sans-bold',
        color:Platform.OS === 'ios' ? colors.primary :'white',
    }
})

export default Header