import {Button, TouchableOpacity} from 'react-native';
import {BACKEND_URL} from '../../global';

export const UserInfoSubmit = () => {
  const SignHandler = () => {
    const userData = {
      birth: birth,
      ctpvNm: city,
      email: email,
      username: username,
      password: password,
      sggNm: region,
      familySituation: familySituation,
    };
    axios
      .post(`${BACKEND_URL}/auth/signup`, userData, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(() => {
        navigation.navigate('Login');
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <TouchableOpacity style={{marginTop: 10, marginBottom: 10}}>
      <Button title="회원가입" onPress={SignHandler}></Button>
    </TouchableOpacity>
  );
};
