import axios from "axios";
import { BACKEND_URL } from "../global.js";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

class LoginPageService {
  postLogin = async () => {};

  login =  (email, password) => {
    const user = {
      email: email,
      password: password,
    };

    axios.post(`${BACKEND_URL}/auth/signin`, user, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((response) => {
      const token = response.data;
      console.log(token);
      AsyncStorage.setItem('TOKEN', token)
        .then((value)=>{
          console.log(value);
          navigation.navigate('Mainpage');
        })
        .catch(()=>{
          Alert.alert('로그인 실패', '유효한 토큰이 없습니다.');
        });
    }).catch((error)=>{
      console.log(error);

      if (error.response) {
        Alert.alert('로그인 실패', '아이디 또는 비밀번호를 확인해주세요');
      } else if (error.request) {
        Alert.alert('로그인 실패', '네트워크 연결을 확인해주세요');
      } else {
        Alert.alert('로그인 실패', '알 수 없는 오류가 발생했습니다');
      }
    });
  };
}

const loginPageService = new LoginPageService();


export default loginPageService;
