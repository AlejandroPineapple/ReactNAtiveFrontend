import {React, useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import colors from '../config/colors';
import AppTexto from '../components/AppTexto'
import AppButton from '../components/AppButton';
import { useAuth } from '../axios/AuthenticationService';
import { getUserData } from '../axios/AuthenticationService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginUser } from '../axios/AuthenticationService';
import axios from 'axios';

function Profile({navigation}) {

    const [catImage, setCatImage] = useState(null);
    const {setIsLoggedIn, isLoggedIn} = useAuth();
    const [user, setUser] = useState(null);

    const apiKey = "live_DwuKsp5Ytr7m035g1GhLJdXvhLZHcqNVbqslsmJD776sBOlarZv2dMiRZXABmM2W"; 

    
    useEffect(() => {
        axios
          .get('https://api.thecatapi.com/v1/images/search?limit=1', {
            headers: {
              'x-api-key': 'your-api-key',
            },
          })
          .then((response) => {
            setCatImage(response.data[0].url);  
          })
          .catch((error) => {
            console.log('Error fetching image:', error);
          });
      }, []);

    useEffect(() => {
        const fetchData = async () => {

            try {
                const token = await AsyncStorage.getItem('token');
                if (token) {
                    const userData = await getUserData();
                    setUser(userData);
                    setIsLoggedIn(true); 
                } else {
                    setIsLoggedIn(false); 
                }
            } catch (error) {
                console.log('Error al obtener datos de usuario:', error);
                Alert.alert('Error', 'Hubo un problema al verificar el token.');
            }
        };

        fetchData();
      }, [isLoggedIn]);

      // Función para manejar el logout
    const handleLogout = async () => {
        try {
            await AsyncStorage.clear();
            setIsLoggedIn(false);
            alert('Adios pues.');
        } catch (error) {
            console.error('Error limpiando AsyncStorage:', error);
            alert('Hubo un problema cerrando sesión.');
        }
    };

    const handleLogin = async () => {
        try {
            console.log('Intentando iniciar sesión con:', email, password);
            const response = await loginUser(email, password);
            setIsLoggedIn(true); 
        } catch (error) {
            console.error('Error en loginUser:', error);
            Alert.alert('Error', 'Credenciales incorrectass');
        }
    };

    if (!isLoggedIn) {
        return (
        <View style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.titulo}> Registrate o Loggeate o lo que sea a</Text>
                <Image source={require('../assets/DilemaLogo.png')} style={styles.logo} />
                <TouchableOpacity onPress={() => {navigation.navigate('Register')}} style={styles.add}>
                        <Text style={styles.addText}>Registrarse</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {navigation.navigate('Login')}}  style={styles.add}>
                    <Text style={styles.addText}>Log in</Text>
                 </TouchableOpacity>
            </View>
        </View>
    );} else {
        return (
        <View style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.titulo}> Perfil </Text>
                {catImage ? (
                    <Image source={{ uri: catImage }} style={styles.cat} />
                ) : (
                    <Image source={require('../assets/yippe.png')} style={styles.cat}/>
                )}
                <View style = {{marginBottom: 20}}></View>
                <Text style={styles.texto}> {user?.username} </Text>
                <Text style={styles.texto}> {user?.email} </Text>
            </View>
            <View style = {{marginBottom: 50}}></View>
            <View style={styles.container}>
                <Text style={styles.titulo}>  </Text>
                <View style = {{marginBottom: 20}}></View>
                <Text style={styles.texto}></Text>
                <Text style={styles.texto}>  </Text>
            </View>
            <View style={styles.container}>
            <View style = {{marginBottom: 50}}></View>
                <TouchableOpacity onPress={handleLogout}  style={styles.add}>
                    <Text style={styles.addText}>Log out</Text>
                </TouchableOpacity>
            </View>
        </View>
    );}
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
        marginTop: 20,
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

export default Profile;