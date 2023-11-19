import React, {useEffect, useState} from 'react';
import {LoginInput} from '../components/LoginPageComponents/LoginInput';
import {Header} from '../components/Common/Header';
import {Keyboard, SafeAreaView, TouchableWithoutFeedback} from 'react-native';
import {styles} from '../styles/EditUserStyle';

const Login = ({navigation, token, setToken}) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <Header />
        <LoginInput
          id={id}
          password={password}
          token={token}
          setToken={setToken}
          setId={setId}
          setPassword={setPassword}
          navigation={navigation}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Login;
