import { useState,  createContext, useContext} from 'react';
import api from './ApiPreguntas';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

// Registrar Usuario
export const registerUser = async (username, password, email) => {
    try {
        const response = await api.post('/auth/register', {username, email, password});
        return response.data;
    } catch (error) {
        console.error('Error en el registro:', error.response.data);
        throw error;
    }
};

// Login de Usuario
export const loginUser = async (email, password) => {
    try {
        const response = await api.post('/auth/login', { email, password });
        const { access_token } = response.data;

        // Guardamos el token en AsyncStorage
        await AsyncStorage.setItem('token', access_token);

        return response.data;

    } catch (error) {
        console.error('Error desde loginUser:', error.response?.data || error.message);
        throw error;
    }
};

// Obtener datos del usuario
export const getUserData = async () => {
    try {
        const response = await api.get('/users/datos');
        return response.data;
    } catch (error) {
        console.error('Error obteniendo datos de usuario:', error.response.data);
        console.log ('ahora paso esto', error)
        throw error;
    }
};

export const crearPregunta = async (pregunta, opcion1, opcion2) => {
    try {
        const response = await api.post('/preguntas', {pregunta, opcion1, opcion2});
        return response.data;
    } catch (error) {
        console.error('Error obteniendo datos de usuario:', error.response.data);
        console.log ('ahora paso esto', error)
        throw error;
    }
};

export const elegirOpcion = async (preguntaId, opcion) => {
    console.log('ID enviado:', preguntaId);
    console.log('Opción enviada:', opcion);

    try {
        const response = await api.post(`/preguntas/${preguntaId}`, { opcion });
        return response.data;
    } catch (error) {
        console.error('Error eligiendo opción:', error.response?.data || error.message);
        throw error;
    }
};