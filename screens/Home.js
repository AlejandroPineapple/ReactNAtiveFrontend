import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity, Image, Alert, Modal, Pressable } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import colors from '../config/colors';
import api from '../axios/ApiPreguntas';
import { elegirOpcion } from '../axios/AuthenticationService';
import { useAuth } from '../axios/AuthenticationService';

const Home = () => {
  const [preguntas, setPreguntas] = useState([]); 
  const [selectedPregunta, setSelectedPregunta] = useState(null); 

  useEffect(() => {
    const fetchPreguntas = async () => {
      try {
        const response = await api.get('/preguntas/lista');
        setPreguntas(response.data);
      } catch (error) {
        console.error('Error obteniendo las preguntas:', error.response?.data || error.message);
        Alert.alert('Error', 'No se pudieron cargar las preguntas');
      }
    };

    fetchPreguntas();
  }, []);

  const handleElegirOpcion = async (_id, opcion) => {
    try {
      await elegirOpcion(_id, opcion);
      const preguntaActualizada = preguntas.find(p => p._id === _id);

      if (preguntaActualizada) {
        const nuevaOpcion1 = opcion === "opcion1" ? (preguntaActualizada.opcion1_elegida || 0) + 1 : preguntaActualizada.opcion1_elegida;
        const nuevaOpcion2 = opcion === "opcion2" ? (preguntaActualizada.opcion2_elegida || 0) + 1 : preguntaActualizada.opcion2_elegida;

        const totalVotos = nuevaOpcion1 + nuevaOpcion2;
        const porcentajeOpcion1 = Math.round((nuevaOpcion1 / totalVotos) * 100);
        const porcentajeOpcion2 = Math.round((nuevaOpcion2 / totalVotos) * 100);

        const preguntasActualizadas = preguntas.map(p =>
          p._id === _id
            ? { ...p, opcion1_elegida: nuevaOpcion1, opcion2_elegida: nuevaOpcion2, porcentajeOpcion1, porcentajeOpcion2 }
            : p
        );

        setPreguntas(preguntasActualizadas);
        setSelectedPregunta(_id); // Marca la pregunta seleccionada
      }
    } catch (error) {
      console.error('Error al votar:', error.response?.data || error.message);
      Alert.alert('Error', 'No se pudo registrar tu voto');
    }
  };

  const Item = ({ _id, pregunta, opcion1, opcion2, opcion1_elegida, opcion2_elegida, porcentajeOpcion1, porcentajeOpcion2 }) => {
    const yaVotada = selectedPregunta === _id;

    return (
      <View style={styles.item}>
        <Text style={styles.pregunta}>{pregunta}</Text>
        <TouchableOpacity
          onPress={() => handleElegirOpcion(_id, "opcion1")}
          style={styles.opcion1}
          disabled={yaVotada}
        >
          <Text style={styles.texto}>
            {yaVotada ? `Opción 1: ${porcentajeOpcion1 || 0}%` : opcion1}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleElegirOpcion(_id, "opcion2")}
          style={styles.opcion2}
          disabled={yaVotada}
        >
          <Text style={styles.texto}>
            {yaVotada ? `Opción 2: ${porcentajeOpcion2 || 0}%` : opcion2}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={preguntas}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <Item
              _id={item._id}
              pregunta={item.pregunta}
              opcion1={item.opcion1}
              opcion2={item.opcion2}
              opcion1_elegida={item.opcion1_elegida}
              opcion2_elegida={item.opcion2_elegida}
              porcentajeOpcion1={item.porcentajeOpcion1}
              porcentajeOpcion2={item.porcentajeOpcion2}
            />
          )}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 45,
    backgroundColor: colors.background,
  },
  item: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  opcion1: {
    backgroundColor: colors.primary,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 20,
  },
  opcion2: {
    backgroundColor: colors.secondary,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 20,
  },
  texto: {
    color: colors.white,
    fontFamily: 'Spartan',
    fontSize: 30,
  },
  textoComentario: {
    color: colors.white,
    fontFamily: 'SpartanLight',
    fontSize: 30,
  },
  pregunta: {
    backgroundColor: colors.background,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    color: colors.white,
    fontFamily: 'Spartan',
    fontSize: 40,
  },
  comentarios: {
    backgroundColor: colors.background,
    marginHorizontal: 16,
    width: 60,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  comentariosImagen: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: colors.background,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 22,
    marginBottom: 15,
  },
  textoModal: {
    color: colors.white,
    fontFamily: 'Spartan',
    fontSize: 20,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: colors.terciary,
    marginVertical: 20
  },
});

export default Home;