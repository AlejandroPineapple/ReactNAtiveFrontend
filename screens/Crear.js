import { React, useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';
import colors from '../config/colors';
import { crearPregunta } from '../axios/AuthenticationService';

function Crear(props) {
    const [pregunta, setPregunta] = useState("");
    const [opcion1, setOpcion1] = useState("");
    const [opcion2, setOpcion2] = useState("");
    const [errorModalVisible, setErrorModalVisible] = useState(false);
    const [successModalVisible, setSuccessModalVisible] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const hacerPregunta = async () => {
        try {
            console.log('Intentando hacer pregunta con', pregunta, opcion1, opcion2);
            const response = await crearPregunta(pregunta, opcion1, opcion2);
            setSuccessMessage(`Pregunta creada exitosamente:\n${pregunta}\nOpción 1: ${opcion1}\nOpción 2: ${opcion2}`);
            setSuccessModalVisible(true);
        } catch (error) {
            const errorMessage = error.response?.data?.message || 'Credenciales incorrectas';
            setErrorMessage(errorMessage);
            setErrorModalVisible(true);
        }
    };

    return (
        <View style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.titulo}> Crea tu Dilema </Text>
                <View style={styles.formContainer}>
                    <Text style={styles.texto}> Pregunta </Text>
                    <TextInput
                        placeholder="¿Qué prefieres?"
                        value={pregunta}
                        onChangeText={(text) => setPregunta(text)}
                        style={styles.input}
                        placeholderTextColor={colors.placeholder}
                    />
                    <Text style={styles.texto}> Opción 1 </Text>
                    <TextInput
                        placeholder="Perder un brazo"
                        value={opcion1}
                        onChangeText={(text1) => setOpcion1(text1)}
                        style={styles.input}
                        placeholderTextColor={colors.placeholder}
                    />
                    <Text style={styles.texto}> Opción 2 </Text>
                    <TextInput
                        placeholder="Comerte unas Emperador de limón"
                        value={opcion2}
                        onChangeText={(text2) => setOpcion2(text2)}
                        style={styles.input}
                        placeholderTextColor={colors.placeholder}
                    />
                    <TouchableOpacity onPress={hacerPregunta} style={styles.add}>
                        <Text style={styles.addText}>Crear Dilema</Text>
                    </TouchableOpacity>
                </View>
                <Image source={require('../assets/DilemaLogo.png')} style={styles.logo} />
            </View>

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

            {/* Modal de Éxito */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={successModalVisible}
                onRequestClose={() => setSuccessModalVisible(false)}
            >
                <TouchableWithoutFeedback onPress={() => setSuccessModalVisible(false)}>
                    <View style={styles.modalOverlay} />
                </TouchableWithoutFeedback>
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>¡Yupiiii!</Text>
                    <Text style={styles.modalMessage}>{successMessage}</Text>
                    <TouchableOpacity onPress={() => setSuccessModalVisible(false)} style={styles.modalButton}>
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
        color: colors.white
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

export default Crear;