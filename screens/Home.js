import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Text, TouchableOpacity, Image, Alert, Modal, Pressable } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import colors from '../config/colors';

const DATA = [
  {
    pregunta: 'Que prefieres?',
    opcion1: 'Que el profe te ponga 10',
    opcion2: 'Dormir'
  },
  {
    pregunta: 'Que prefieres?',
    opcion1: 'Morir ahogado',
    opcion2: 'Morir Quemado'
  },
  {
    pregunta: 'Que prefieres?',
    opcion1: 'Aprobar',
    opcion2: 'Tener salud mental'
  },
  {
    pregunta: 'Que prefieres?',
    opcion1: '5000 Monsters',
    opcion2: 'No necesitar el monster para funcionar como miembro de la sociedad'
  },
  {
    pregunta: 'Que prefieres?',
    opcion1: 'Dormir',
    opcion2: 'Dormir ya me quiero dormir porfavor ayuda'
  },
];

const Comentarios = [
    {
        texto: 'Esto es un gran comentario'
    },
    {
        texto: 'Esto tambien'
    },
    {
        texto: 'Esto no lol'
    },
]

const Item = ({ pregunta, opcion1, opcion2 }) => (
  <View style={styles.item}>
    <Text style={styles.pregunta}>{pregunta}</Text>
    <TouchableOpacity onPress={() => Alert.alert(`¡Wuuu! Elegiste ${opcion1}`)} style={styles.opcion1}>
      <Text style={styles.texto}>{opcion1}</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => Alert.alert(`¡Wuuu! Elegiste ${opcion2}`)} style={styles.opcion2}>
      <Text style={styles.texto}>{opcion2}</Text>
    </TouchableOpacity>
  </View>
);

const ItemCom = ({ comentario }) => (
  <View style={styles.item}>
    <Text style={styles.textoComentario}>{comentario}</Text>
  </View>
);

const Home = () => {

  const [modalVisible, setModalVisible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isLoggedIn) {
    return (
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <FlatList
            data={DATA}
            renderItem={({ item }) => (
              <View>
                <Item
                  pregunta={item.pregunta}
                  opcion1={item.opcion1}
                  opcion2={item.opcion2}
                />
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modalVisible}
                  onRequestClose={() => {
                      setModalVisible(!modalVisible);
                  }}>
                  <View style={styles.centeredView}>
                      <View style={styles.modalView}>
                      <Text style={styles.texto}>Comentarios</Text>
                      <FlatList
                          data={Comentarios}
                          renderItem={({ item }) => <ItemCom comentario={item.texto} />}
                          keyExtractor={(item, index) => index.toString()}
                      />
                      <Pressable
                          style={[styles.button, styles.buttonClose]}
                          onPress={() => setModalVisible(!modalVisible)}>
                          <Text style={styles.textoModal}>Cerrar</Text>
                      </Pressable>
                      </View>
                  </View>
                  </Modal>
                <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.comentarios}>
                  <Image source={require('../assets/comentarios.png')} style={styles.comentariosImagen} />
                </TouchableOpacity>
              </View>
            )}
          />
        </SafeAreaView>
      </SafeAreaProvider>
    );} else {
      return (
        <SafeAreaProvider>
          <SafeAreaView style={styles.container}>
            <FlatList
              data={DATA}
              renderItem={({ item }) => (
                <View>
                  <Item
                    pregunta={item.pregunta}
                    opcion1={item.opcion1}
                    opcion2={item.opcion2}
                  />
                  <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                        <Text style={styles.texto}>Comentarios</Text>
                        <FlatList
                            data={Comentarios}
                            renderItem={({ item }) => <ItemCom comentario={item.texto} />}
                            keyExtractor={(item, index) => index.toString()}
                        />
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}>
                            <Text style={styles.textoModal}>Cerrar</Text>
                        </Pressable>
                        </View>
                    </View>
                    </Modal>
                  <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.comentarios}>
                    <Image source={require('../assets/comentarios.png')} style={styles.comentariosImagen} />
                  </TouchableOpacity>
                </View>
              )}
            />
          </SafeAreaView>
        </SafeAreaProvider>
      );}

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={DATA}
          renderItem={({ item }) => (
            <View>
              <Item
                pregunta={item.pregunta}
                opcion1={item.opcion1}
                opcion2={item.opcion2}
              />
              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                    <Text style={styles.texto}>Comentarios</Text>
                    <FlatList
                        data={Comentarios}
                        renderItem={({ item }) => <ItemCom comentario={item.texto} />}
                        keyExtractor={(item, index) => index.toString()}
                    />
                    <Pressable
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => setModalVisible(!modalVisible)}>
                        <Text style={styles.textoModal}>Cerrar</Text>
                    </Pressable>
                    </View>
                </View>
                </Modal>
              <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.comentarios}>
                <Image source={require('../assets/comentarios.png')} style={styles.comentariosImagen} />
              </TouchableOpacity>
            </View>
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