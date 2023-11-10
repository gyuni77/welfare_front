import axios from 'axios';
import React, {useEffect, useState} from 'react';
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

const LocalWelfare = ({navigation}) => {
  const [test, setTest] = useState([]);

  useEffect(() => {
    const getdata = async () => {
      try {
        const response = await axios.get(
          'http://ec2-43-201-70-125.ap-northeast-2.compute.amazonaws.com:8080/welfare/search/거제',
        );
        setTest(response.data[0].aplyMtdNm);
        console.log(test);
      } catch (err) {
        console.error(err);
      }
    };
    getdata();
  }, []);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.login}>메인페이지</Text>
        </View>
        <View>
          <Text>{test}</Text>
        </View>
        <View style={styles.button}>
          <Button title="로그인 하기"></Button>
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

export default LocalWelfare;
