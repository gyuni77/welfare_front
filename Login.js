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
        'http://ec2-43-201-17-18.ap-northeast-2.compute.amazonaws.com:8080/auth/signin',
        user,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const TOKEN = response.data.token;
      console.log(TOKEN);

      // AsyncStorage에 토큰 저장
      await AsyncStorage.setItem('TOKEN', TOKEN);

      // 로그인 성공 후 화면 전환
      navigation.navigate('LocalWelfare');
    } catch (error) {
      // 에러 처리
      console.error('Login failed:', error);
      Alert.alert('아이디/비밀번호를 확인해주세요');
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
