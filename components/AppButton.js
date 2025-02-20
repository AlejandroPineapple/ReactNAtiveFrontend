import React from 'react';
import {StyleSheet, TouchableOpacity, Text } from 'react-native';
import colors from '../config/colors';

function AppButton({text, color, onPress}) {
    return (
        <TouchableOpacity style = {styles.button} onPress={onPress}>
            <Text style={styles.text}>  {text} </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({

    button:
    {
        backgroundColor: colors.primary,
        borderRadius: 25,
        alignItems: 'center',
        padding: 15,
        width: '90%'
    },
    text:
    {
        color: colors.white,
        fontSize: 20,
        textTransform: 'uppercase',
        fontWeight: 'bold'
    }

})

export default AppButton;