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
          children={props => (
            <MainPage {...props} token={token} setToken={setToken} />
          )}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Recommend"
          children={props => (
            <RecommendPage {...props} token={token} setToken={setToken} />
          )}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Bookmark"
          children={props => (
            <BookmarkPage {...props} token={token} setToken={setToken} />
          )}
          options={{
            headerShown: false,
          }}
        />
        {token ? (
          <Tab.Screen
            name="Profile"
            children={props => (
              <EditUserPage {...props} token={token} setToken={setToken} />
            )}
            options={{
              headerShown: false,
            }}
          />
        ) : (
          <Tab.Screen
            name="Login"
            children={props => (
              <LoginPage {...props} token={token} setToken={setToken} />
            )}
            options={{
              headerShown: false,
            }}
          />
        )}
        <Tab.Screen
          name="Signup"
          children={props => (
            <SignupPage {...props} token={token} setToken={setToken} />
          )}
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
