import React from 'react'
import { StatusBar, View, Text, Image, TouchableOpacity } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './screens/Home'

const Stack = createStackNavigator()

function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View style={{ flexDirection: 'row' , alignItems: 'center', backgroundColor: '#121212', height: 40, paddingBottom: 10}}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
          >
            <Text style={{marginLeft: 10, color: isFocused ? '#ffffff' : '#ff0000' }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return(
    <>
      <StatusBar 
        barStyle = {'light-content'}
        backgroundColor={"#121212"}
      />

      <NavigationContainer>
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
        <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
          <Tab.Screen name="Home" component={Home} />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  )
}