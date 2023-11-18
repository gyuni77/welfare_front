import {Alert} from 'react-native';
import axios from 'axios';
import {BACKEND_URL} from '../global';

class LoginPageService {
  login = async (id, password, navigation, token, setToken) => {
    try {
      const user = {
        email: id,
        password: password,
      };

      const response = await axios.post(`${BACKEND_URL}/auth/signin`, user, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setToken(response.data);
      navigation.navigate('Home');
    } catch (error) {
      console.log(error);

      if (error.response) {
        Alert.alert('로그인 실패', '아이디 또는 비밀번호를 확인해주세요');
      } else if (error.request) {
        Alert.alert('로그인 실패', '네트워크 연결을 확인해주세요');
      } else {
        Alert.alert('로그인 실패', '알 수 없는 오류가 발생했습니다');
      }
    }
  };
}

const loginPageService = new LoginPageService();

export default loginPageService;
