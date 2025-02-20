import { React, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput, Modal, TouchableWithoutFeedback } from 'react-native';
import colors from '../config/colors';
import { loginUser } from '../axios/AuthenticationService';
import { useAuth } from '../axios/AuthenticationService';

function Login({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [successModalVisible, setSuccessModalVisible] = useState(false);
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const { setIsLoggedIn } = useAuth();

    const handleLogin = async () => {
        try {
            console.log('Intentando iniciar sesión con:', email, password);
            const response = await loginUser(email, password);
            setIsLoggedIn(true);
            setSuccessMessage("Inicio de sesión exitoso.");
            setSuccessModalVisible(true);
        } catch (error) {
            console.error('Error en loginUser:', error);
            const errorMessage = error.response?.data?.message || "Credenciales incorrectas.";
            setErrorMessage(errorMessage);
            setErrorModalVisible(true);
        }
    };

    return (
        <View style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.titulo}> Loggeate Aquí </Text>
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

            {/* Modal de Éxito */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={successModalVisible}
                onRequestClose={() => {
                    setSuccessModalVisible(false);
                    navigation.navigate('Profile');
                }}
            >
                <TouchableWithoutFeedback onPress={() => setSuccessModalVisible(false)}>
                    <View style={styles.modalOverlay} />
                </TouchableWithoutFeedback>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>¡Éxito!</Text>
                    <Text style={styles.modalMessage}>{successMessage}</Text>
                    <TouchableOpacity
                        onPress={() => {
                            setSuccessModalVisible(false);
                            navigation.navigate('Profile');
                        }}
                        style={styles.modalButton}
                    >
                        <Text style={styles.modalButtonText}>Continuar</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            {/* Modal de Error */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={errorModalVisible}
                onRequestClose={() => setErrorModalVisible(false)}
            >
                <TouchableWithoutFeedback onPress={() => setErrorModalVisible(false)}>
                    <View style={styles.modalOverlay} />
                </TouchableWithoutFeedback>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>Error</Text>
                    <Text style={styles.modalMessage}>{errorMessage}</Text>
                    <TouchableOpacity onPress={() => setErrorModalVisible(false)} style={styles.modalButton}>
                        <Text style={styles.modalButtonText}>Cerrar</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
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
        marginTop: 50,
    },
    addText: {
        color: colors.white,
        fontSize: 18,
        fontFamily: 'Spartan',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: colors.background,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: colors.white,
    },
    modalMessage: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
        color: colors.white,
    },
    modalButton: {
        backgroundColor: colors.terciary,
        padding: 10,
        borderRadius: 8,
        width: '80%',
        alignItems: 'center',
    },
    modalButtonText: {
        color: colors.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Login;