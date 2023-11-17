import React, { useState } from "react";
import {LoginInput} from '../components/LoginPageComponents/LoginInput';

const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  return <LoginInput id={id}
                     password={password}
                     setId={setId}
                     setPassword={setPassword}/>;
};

export default Login;
