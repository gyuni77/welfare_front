import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

const Login = ({navigation}) => {
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
          />
          <TextInput
            placeholder={'비밀번호'}
            secureTextEntry
            style={styles.TextInput}
          />
        </View>
        <View style={styles.button}>
          <Button
            onPress={() => navigation.navigate('LocalWelfare')}
            title="로그인 하기"></Button>
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
    backgroundColor: '#F2F2F2',
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 5,
  },
});

export default Login;
