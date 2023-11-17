import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginPage from './pages/LoginPage.js';
import MainPage from './pages/MainPage.js';
import EditUserPage from './pages/EditUserPage.js';
import Signup from './pages/SignupPage.js';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Profile">
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="MainPage" component={MainPage} />
        <Stack.Screen name="Profile" component={EditUserPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
