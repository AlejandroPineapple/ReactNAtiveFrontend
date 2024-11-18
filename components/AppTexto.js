import React from 'react';
import { Text, Platform, StyleSheet } from 'react-native';

function AppTexto({texto}) {
    return (
        <Text style = {styles.text}>
            {texto}
        </Text>
    );
}

const styles = StyleSheet.create({
    text: 
    {
        fontSize: 50,
        fontFamily: Platform.OS === "android" ? 'Roboto' : 'Avenir', 
        fontWeight: 'bold',
        color: 'white'
    }
})

export default AppTexto;