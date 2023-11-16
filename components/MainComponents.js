import axios from 'axios';
import React, {useEffect, useState, useCallback} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  Alert,
  TextInput,
  Modal,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WelfareContents from './WelfareContents';

const LocalWelfare = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState('');
  const [searchData, setSearchData] = useState('');

  const getToken = async () => {
    try {
      return await AsyncStorage.getItem('TOKEN');
    } catch (e) {
      console.log(e);
      console.log('Error getting token.');
      return null;
    }
  };
  const getUser = async () => {
    try {
      const token = await getToken();

      if (!token) {
        console.log('Token is null or undefined.');
        return;
      }

      const response = await axios.get(
        'http://ykh8746.iptime.org:8080/auth/getUser',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
        },
      );

      setUser(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, [user]);

  const clickSearch = () => {
    const getdata = async () => {
      try {
        const token = await getToken();

        if (!token) {
          console.log('Token is null or undefined.');
          return;
        }

        const response = await axios.get(
          `http://ykh8746.iptime.org:8080/welfare/search/${search}`,
          {
            headers: {
              Authorization: `${token}`,
            },
          },
        );
        const jsonData = JSON.stringify(response.data);
        const parsedData = JSON.parse(jsonData);
        setSearchData(parsedData);
      } catch (err) {
        console.error(err);
      }
    };
    getdata();
  };

  const removeToken = async () => {
    try {
      await AsyncStorage.removeItem('TOKEN');
    } catch (e) {
      console.log(e);
    }
    Alert.alert('로그아웃 되었습니다');
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          marginTop: 10,
          marginLeft: 10,
          marginRight: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={styles.login}>지자체별 복지정보</Text>
        <View style={styles.centeredView}>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalName}>{user.username}님</Text>
                <Text
                  style={styles.modalText}
                  onPress={() => navigation.navigate('Profile')}>
                  내 정보 수정
                </Text>
                <Text style={styles.modalText}>북마크 모아보기</Text>
                <Text
                  onPress={() => navigation.navigate('Login')}
                  style={styles.modalText}>
                  로그인 하기
                </Text>
                <Text onPress={removeToken} style={styles.modalText}>
                  로그아웃
                </Text>
                <TouchableOpacity
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyle}>닫기</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <TouchableOpacity
            style={[styles.button, styles.buttonOpen]}
            onPress={() => setModalVisible(true)}>
            <Text style={styles.textStyle}>메뉴</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{marginTop: 10, marginLeft: 10}}>
        <Text style={styles.login}>{user.sggNm} 복지 정보</Text>
      </View>
      <View style={{alignItems: 'center'}}>
        <TextInput
          style={{
            borderWidth: 1,
            backgroundColor: 'white',
            width: 300,
            borderRadius: 10,
            margin: 10,
          }}
          placeholder="제목으로 검색하세요"
          returnKeyType="search"
          onSubmitEditing={clickSearch}
          onChangeText={text => setSearch(text)}
        />
      </View>
      <WelfareContents search={search} searchData={searchData} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  welFare: {
    borderWidth: 1,
    width: 100,
    height: 140,
    marginLeft: 5,
    marginBottom: 10,
    borderRadius: 5,
  },
  TextTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    padding: 3,
  },
  TextContents: {
    marginTop: 5,
    marginBottom: 5,
    fontSize: 10,
    paddingLeft: 5,
  },
  login: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    width: 100,
    height: 30,
    elevation: 2,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  buttonOpen: {
    backgroundColor: '#2196F3',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modalName: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  btn: {
    backgroundColor: '#2196F3',
  },
  btnText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default LocalWelfare;
