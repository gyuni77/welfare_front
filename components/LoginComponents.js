import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const [Id, setId] = useState('');
  const [password, setPassword] = useState('');

  const LoginHandler = async () => {
    try {
      const user = {
        email: Id,
        password: password,
      };

      const response = await axios.post(
        'http://ykh8746.iptime.org:8080/auth/signin',
        user,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const TOKEN = response.data;
      console.log(response.data);

      if (TOKEN) {
        await AsyncStorage.setItem('TOKEN', TOKEN);
        navigation.navigate('LocalWelfare');
      } else {
        Alert.alert('로그인 실패', '유효한 토큰이 없습니다.');
      }
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

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.login}>로그인</Text>
        </View>
        <View>
          <TextInput
            spellCheck
            placeholder={'아이디'}
            keyboardType="email-address"
            style={styles.TextInput}
            onChangeText={text => setId(text)}
          />
          <TextInput
            placeholder={'비밀번호'}
            secureTextEntry
            style={styles.TextInput}
            onChangeText={text => setPassword(text)}
          />
        </View>
        <View style={styles.button}>
          <Button onPress={LoginHandler} title="로그인 하기"></Button>
        </View>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Signin')}>
          <Text style={{fontSize: 12, color: '#007AFF'}}>
            계정이 없으신가요? 여기서 가입하세요!
          </Text>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  login: {
    fontSize: 30,
  },
  TextInput: {
    width: 300,
    height: 60,
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 20,
    fontSize: 15,
    paddingHorizontal: 20,
  },
  button: {
    width: 300,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 5,
  },
});

export default Login;
