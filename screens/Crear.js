import { React, useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import colors from '../config/colors';

function Crear(props) {
    const [message, setMessage] = useState("");
    const [message2, setMessage2] = useState("");
    const [message3, setMessage3] = useState("");

    return (
        <View style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.titulo}> Crea tu Dilema </Text>
                <Image source={require('../assets/DilemaLogo.png')} style={styles.logo} />
                <View style={styles.formContainer}>
                    <Text style={styles.texto}> Pregunta </Text>
                    <TextInput
                        placeholder="¿Qué prefieres?"
                        value={message}
                        onChangeText={(text) => setMessage(text)}
                        style={styles.input}
                        placeholderTextColor={colors.placeholder}
                    />
                    <Text style={styles.texto}> Opción 1 </Text>
                    <TextInput
                        placeholder="Perder un brazo"
                        value={message2}
                        onChangeText={(text1) => setMessage2(text1)}
                        style={styles.input}
                        placeholderTextColor={colors.placeholder}
                    />
                    <Text style={styles.texto}> Opción 2 </Text>
                    <TextInput
                        placeholder="Comerte unas Emperador de limón"
                        value={message3}
                        onChangeText={(text2) => setMessage3(text2)}
                        style={styles.input}
                        placeholderTextColor={colors.placeholder}
                    />
                    <TouchableOpacity onPress={() => alert(`Pregunta: ${message}\nOpcion 1: ${message2}\nOpcion 2: ${message3}`)} style={styles.add}>
                        <Text style={styles.addText}>Crear Dilema</Text>
                    </TouchableOpacity>
                </View>
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
        resizeMode: 'contain',
    },
    input: {
        backgroundColor: colors.background, 
        color: colors.white,
        padding: 15,
        borderRadius: 8,
        marginBottom: 20,
        width: '100%',
        fontSize: 16,
        borderColor: colors.terciary, 
        borderWidth: 2, 
    },
    add: {
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

export default Crear;