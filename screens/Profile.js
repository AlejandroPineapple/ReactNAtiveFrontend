import {React, useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import colors from '../config/colors';
import AppTexto from '../components/AppTexto'
import AppButton from '../components/AppButton';
import axios from 'axios';

function Profile(props) {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [catImage, setCatImage] = useState(null); 

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

    if (!isLoggedIn) {
        return (
        <View style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.titulo}> Registrate o Loggeate o lo que sea a</Text>
                <Image source={require('../assets/DilemaLogo.png')} style={styles.logo} />
                <TouchableOpacity onPress={() => alert(`Finje que te registras porfa`)} style={styles.add}>
                        <Text style={styles.addText}>Registrarse</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {alert(`Si te logeaste jaaja`); setIsLoggedIn(true)}}  style={styles.add}>
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
                <Text style={styles.texto}> Gatensio Gaturco </Text>
            </View>
            <View style = {{marginBottom: 100}}></View>
            <View style={styles.container}>
                <Text style={styles.titulo}> Comentarios </Text>
                <View style = {{marginBottom: 20}}></View>
                <Text style={styles.texto}> Aqui pondria comentarios... </Text>
                <Text style={styles.texto}> SI TUVIERAS ALGUNO </Text>
            </View>
            <View style={styles.container}>
            <View style = {{marginBottom: 50}}></View>
                <TouchableOpacity onPress={() => {alert(`adios pues`); setIsLoggedIn(false)}}  style={styles.add}>
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

export default Profile;