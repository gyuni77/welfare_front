import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LoginPage from './pages/LoginPage.js';
import MainPage from './pages/MainPage.js';
import EditUserPage from './pages/EditUserPage.js';
import RecommendPage from './pages/RecommendPage';
import BookmarkPage from './pages/BookmarkPage';
import SignupPage from './pages/SignupPage.js';

const Tab = createBottomTabNavigator();

const App = () => {
  const [token, setToken] = useState(null);

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={MainPage}
          token={token}
          setToken={setToken}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Recommend"
          component={RecommendPage}
          token={token}
          setToken={setToken}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Bookmark"
          component={BookmarkPage}
          token={token}
          setToken={setToken}
          options={{
            headerShown: false,
          }}
        />
        {token ? (
          <Tab.Screen
            name="Profile"
            component={EditUserPage}
            token={token}
            setToken={setToken}
            options={{
              headerShown: false,
            }}
          />
        ) : (
          <Tab.Screen
            name="Login"
            component={LoginPage}
            token={token}
            setToken={setToken}
            options={{
              headerShown: false,
            }}
          />
        )}
        <Tab.Screen
          name="Signup"
          component={SignupPage}
          token={token}
          setToken={setToken}
          options={{
            headerShown: false,
            tabBarButton: () => null,
            tabBarVisible: false,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
