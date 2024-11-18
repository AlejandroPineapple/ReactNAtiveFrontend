import { React, useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import colors from '../config/colors';

function Comentarios(props) {

    return (
        <View style={styles.background}>
            <View style = {{marginBottom: 100}}></View>
            <View style={styles.container}>
                <Text style={styles.titulo}> Comentarios </Text>
                <View style = {{marginBottom: 20}}></View>
                <Text style={styles.texto}> Aqui pondria comentarios... </Text>
                <Text style={styles.texto}> SI TUVIERAS ALGUNO </Text>
            </View>
            <View style={styles.container}>
            <View style = {{marginBottom: 50}}></View>
                <TouchableOpacity onPress={() => {alert(`adios pues`)}}  style={styles.add}>
                    <Text style={styles.addText}>Log out</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: colors.background,
        padding: 20,
    },
    titulo: {
        color: colors.white,
        fontSize: 45,
        fontFamily: 'Spartan',
        marginBottom: 20,
        textAlign: 'center',
    },
    texto: {
        color: colors.white,
        fontSize: 25,
        fontFamily: 'SpartanLight',
        marginBottom: 10,
        marginTop: 2
    },
    container: {
        alignItems: 'center',
    },
    formContainer: {
        width: '100%',
        marginTop: 10,
    },
    logo: {
        marginTop: 20,
        width: 150,
        height: 150,
    },
    cat:
    {
        marginTop: 20,
        width: 155,
        height: 155,
        borderRadius: 100
    },
    add:
    {
        backgroundColor: colors.terciary,
        padding: 15,
        borderRadius: 8,
        marginBottom: 20,
        width: '100%', 
        alignItems: 'center',
        marginTop: 50
    },
    addText: {
        color: colors.white,
        fontSize: 18,
        fontFamily: 'Spartan',
    },
});

export default Comentarios;