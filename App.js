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
  const [isLogin, setIsLogin] = useState(false);

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Home"
          component={MainPage}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Recommend"
          component={RecommendPage}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Bookmark"
          component={BookmarkPage}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
          options={{
            headerShown: false,
          }}
        />
        {isLogin ? (
          <Tab.Screen
            name="Profile"
            component={EditUserPage}
            isLogin={isLogin}
            setIsLogin={setIsLogin}
            options={{
              headerShown: false,
            }}
          />
        ) : (
          <Tab.Screen
            name="Login"
            component={LoginPage}
            isLogin={isLogin}
            setIsLogin={setIsLogin}
            options={{
              headerShown: false,
            }}
          />
        )}
        <Tab.Screen
          name="Signup"
          component={SignupPage}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
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
