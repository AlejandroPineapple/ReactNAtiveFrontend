import React from 'react'
import { StatusBar, View, Text, Image } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Home from './screens/Home'

const Stack = createStackNavigator()

export default function App() {
  return(
    <>
      <StatusBar 
        barStyle = {'light-content'}
        backgroundColor={"#121212"}
      />

      <NavigationContainer>
        <Stack.Navigator initialRouteName = "Home">
          <Stack.Screen
            name = "Home"
            component = { Home }
            options= {{
              headerLeft: () => (
                <View style = {{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    style = {{width: 40, height: 40, marginRight: 10, marginLeft: 10}}
                    source = {{uri: 'https://www.clipartmax.com/png/middle/236-2361875_pusheen-aka-the-cute-of-cuteness-by-favouritefi-cute-cat-drawing-png.png'}}
                  />
                  <Text style = {{color: 'white', fontSize: 18}}> Pito </Text>
                </View>
              ),
              headerTitleAlign: 'center',
              headerStyle: {
                backgroundColor: "#121212"
              },
              headerTintColor: '#fff'
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )
}