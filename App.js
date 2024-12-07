import React, { useState } from 'react'
import { StatusBar, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator,  useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font'; // Import useFonts
import { AppLoading } from 'expo';
import { AuthProvider } from './axios/AuthenticationService';
import Home from './screens/Home'
import Profile from './screens/Profile';
import Crear from './screens/Crear';
import Login from './screens/Login';
import Register from './screens/Register'
import colors from './config/colors';

const Stack = createStackNavigator()

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: colors.terciary,
        tabBarStyle: { position: 'absolute' , backgroundColor: '#121212', borderTopWidth: 0},
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="Dilemas"
        component={Home}
        options={{
          tabBarLabel: 'Dilemas',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Crear"
        component={Crear}
        options={{
          tabBarLabel: 'Crear',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="star-plus" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {

  let [fontsLoaded] = useFonts({
    'Spartan': require('./assets/Fonts/LeagueSpartanRegular.ttf'),
    'SpartanLight': require('./assets/Fonts/LeagueSpartanLight.ttf'),
    'SpartanBold': require('./assets/Fonts/LeagueSpartanBold.ttf')
  });

  if (!fontsLoaded) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading Fonts...</Text>
      </View>
    );
  }

  return (
    <AuthProvider>
      <NavigationContainer>
          <StatusBar barStyle="light-content" />
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="MainTabs" component={MyTabs} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
            </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});