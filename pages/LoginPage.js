import React, {useState} from 'react';
import {LoginInput} from '../components/LoginPageComponents/LoginInput';

const LoginPage = ({navigation}) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  return (
    <LoginInput
      id={id}
      password={password}
      setId={setId}
      setPassword={setPassword}
      navigation={navigation}
    />
  );
};

export default LoginPage;
