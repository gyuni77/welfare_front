import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {View, Text, SafeAreaView, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import WelfareContents from '../components/MainPageComponents/WelfareContents';
import {styles} from '../styles/MainPageStyle';
import {ModalList} from '../components/MainPageComponents/ModalList';
import {SearchBar} from '../components/MainPageComponents/SearchBar';

const LocalWelfare = ({navigation}) => {
  const [search, setSearch] = useState('');
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

  return (
    <SafeAreaView style={styles.container}>
      <ModalList />
      <View style={{marginTop: 10, marginLeft: 10}}>
        <Text style={styles.login}>{user.sggNm} 복지 정보</Text>
      </View>
      <SearchBar />
      <WelfareContents search={search} searchData={searchData} />
    </SafeAreaView>
  );
};

export default LocalWelfare;
