import axios from 'axios';
import React, {useEffect, useState, useCallback} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  FlatList,
  Linking,
  Button,
  Alert,
  TextInput,
  Modal,
  ActivityIndicator,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BACKEND_URL} from '../global';
import styles from '../styles/MainPageStyle';

const MainPage = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [test, setTest] = useState('');

  useEffect(() => {
    const getdata = async () => {
      try {
        const token = await getToken();

        if (!token) {
          console.log('Token is null or undefined.');
          return;
        }

        const response = await axios.get(`${BACKEND_URL}/welfare/user`, {
          headers: {
            Authorization: `${token}`,
          },
        });
        const jsonData = JSON.stringify(response.data);
        const parsedData = JSON.parse(jsonData);
        setTest(parsedData);
        console.log(test);
      } catch (err) {
        console.error(err);
      }
    };
    getdata();
  }, [test]);

  const renderItem = ({item}) => {
    return (
      <ScrollView style={styles.welFare}>
        <Text style={styles.TextTitle} numberOfLines={2}>
          {item.servNm}
        </Text>
        <Text style={styles.TextContents} numberOfLines={3}>
          {item.servDgst}
        </Text>
        <OpenURLButton url={item.servDtlLink}>자세히</OpenURLButton>
      </ScrollView>
    );
  };

  const OpenURLButton = ({url, children}) => {
    const handlePress = useCallback(async () => {
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    }, [url]);

    return (
      <TouchableOpacity style={styles.btn} onPress={handlePress}>
        <Text style={styles.btnText}>{children}</Text>
      </TouchableOpacity>
    );
  };

  const getToken = async () => {
    try {
      return await AsyncStorage.getItem('TOKEN');
    } catch (e) {
      console.log(e);
      console.log('Error getting token.');
      return null;
    }
  };

  const removeToken = async () => {
    try {
      await AsyncStorage.removeItem('TOKEN');
    } catch (e) {
      console.log(e);
    }
    console.log('로그아웃 되었습니다');
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
        <Text style={styles.login}>인천광역시의 복지 정보</Text>
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
          onChangeText={text => setSearch(text)}
        />
      </View>
      <FlatList
        data={test}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        contentContainerStyle={{padding: 10}}
      />
    </SafeAreaView>
  );
};

export default MainPage;