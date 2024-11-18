import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';
import colors from '../config/colors';
import AppTexto from '../components/AppTexto'
import AppButton from '../components/AppButton';

function Welcome({texto}) {
    return (
        <View 
            style={{
                backgroundColor: "#121212",
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>

                <View 
                style={{
                    backgroundColor: colors.primary,
                    justifyContent: 'center',
                    width: "90%",
                    height: "35%",
                    borderRadius: 20,
                    marginTop: 10
                }}>
                    <View style={styles.opcion}><AppTexto texto = "Pitooooo"/></View>
                </View>
                <View 
                style={{
                    backgroundColor: colors.background,
                    width: "90%",
                    height: "15%",
                    borderRadius: 20,
                    justifyContent: 'center'
                }}>
                    <View style={styles.opcion}><AppTexto texto = "Pitooooo"/></View>
                </View>
                <View 
                style={{
                    backgroundColor: colors.secondary,
                    width: "90%",
                    height: "35%",
                    borderRadius: 20,
                    justifyContent: 'center',
                    marginBottom: 10,
                }}>
                    <View style={styles.opcion}><AppTexto texto = "Pitooooo"/></View>
                </View>

        </View>
    );
}

const styles = StyleSheet.create({

    background: {
        flex: 1,
        justifyContent: 'flex-end',
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.background,
        marginBottom: 40
    },
    loginButton: {
        width: '90%',
        height: 70,
        backgroundColor: colors.primary,
        borderRadius: 20
    },
    registerButton: {
        width: '90%',
        height: 70,
        backgroundColor: colors.secondary,
        borderRadius: 20
    },
    logo: {
        width: 100,
        height: 100
    },
    logoContainer: {
        alignItems: 'center',
        position: 'absolute',
        top: 75,
    }
})

export default Welcome;