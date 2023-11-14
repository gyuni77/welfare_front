import React from 'react';
import {StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './Login.js';
import Signin from './Signin.js';
import LocalWelfare from './LocalWelfare.js';
import Profile from './Profile.js';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LocalWelfare">
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signin" component={Signin} />
        <Stack.Screen name="LocalWelfare" component={LocalWelfare} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  ViewStyle: {
    backgroundColor: 'black',
  },
  LoginStyle: {},
});

export default App;
