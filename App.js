import React from 'react';
import {StyleSheet, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginPage from './pages/LoginPage.js';
import Signin from './pages/SignupPage.js';
import MainPage from './pages/MainPage.js';
import EditUserPage from './pages/EditUserPage.js';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainPage">
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Signin" component={Signin} />
        <Stack.Screen name="LocalWelfare" component={MainPage} />
        <Stack.Screen name="Profile" component={EditUserPage} />
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
