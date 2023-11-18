import React, {useEffect, useState} from 'react';
import {LoginInput} from '../components/LoginPageComponents/LoginInput';

const Login = ({navigation, token, setToken}) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  return (
    <LoginInput
      id={id}
      password={password}
      token={token}
      setToken={setToken}
      setId={setId}
      setPassword={setPassword}
      navigation={navigation}
    />
  );
};

export default Login;
