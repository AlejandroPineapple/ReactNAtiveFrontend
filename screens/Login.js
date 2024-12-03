import {React, useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import colors from '../config/colors';
import { loginUser } from '../axios/AuthenticationService';
import { useAuth } from '../axios/AuthenticationService';

function Login({navigation}) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setIsLoggedIn } = useAuth();

    const handleLogin = async () => {
        try {
            console.log('Intentando iniciar sesión con:', email, password);
            const response = await loginUser(email, password);
            setIsLoggedIn(true); 
            Alert.alert('Login exitoso', response.data);
            navigation.navigate('Profile');
        } catch (error) {
            console.error('Error en loginUser:', error);
            Alert.alert('Error', 'Credenciales incorrectas');
        }
    };

    return (
        <View style={styles.background}>
            <View style={styles.container}>
            <Text style={styles.titulo}> Loggeate Aqui </Text>
                <View style={styles.formContainer}>
                    <Text style={styles.texto}> Email </Text>
                    <TextInput
                        placeholder="alguien.ejemplo@gmail.com"
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        style={styles.input}
                        placeholderTextColor={colors.placeholder}
                    />
                    <Text style={styles.texto}> Contraseña </Text>
                    <TextInput
                        placeholder="Espero no hayas puesto 123"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={(text2) => setPassword(text2)}
                        style={styles.input}
                        placeholderTextColor={colors.placeholder}
                    />
                    <TouchableOpacity onPress={handleLogin} style={styles.add}>
                        <Text style={styles.addText}>Login :)</Text>
                    </TouchableOpacity>
                </View>
                <Image source={require('../assets/DilemaLogo.png')} style={styles.logo} />
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
        marginTop: 30,
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

export default Login;