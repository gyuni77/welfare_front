import axios from 'axios';
import {BACKEND_URL} from '../global';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

class MainPageService {
  getAllDefaultData = async () => {
    return await axios
      .get(`${BACKEND_URL}/welfare/all`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        return response.data;
      });
  };

  getAllDataByUserInfo = async () => {
    try {
      const token = await this.getToken();
      if (!token) {
        console.log('Token is null or undefined.');
        return;
      }
      return await axios
        .get(`${BACKEND_URL}/welfare/user`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
        })
        .then(response => {
          return response.data;
        });
    } catch (e) {
      console.log(e);
    }
  };
  getDataBySearch = async () => {
    try {
      const token = await this.getToken();

      if (!token) {
        console.log('Token is null or undefined.');
        return;
      }
      return await axios
        .get(`${BACKEND_URL}/welfare/search/${search}`, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(response => {
          return response.data;
        });
    } catch (e) {
      console.log(e);
    }
  };

  getUserInfo = async () => {
    try {
      const token = await this.getToken();
      if (!token) {
        console.log('Token is null or undefined.');
        return;
      }
      return await axios
        .get(`${BACKEND_URL}/auth/getUser`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
        })
        .then(response => {
          return response.data;
        });
    } catch (e) {
      console.log(e);
    }
  };
  getToken = async () => {
    try {
      return await AsyncStorage.getItem('TOKEN');
    } catch (e) {
      console.log('Error getting token.');
      return null;
    }
  };
  removeToken = async () => {
    try {
      await AsyncStorage.removeItem('TOKEN');
      Alert.alert('로그아웃 되었습니다');
    } catch (e) {
      console.log(e);
    }
  };
}

const mainPageService = new MainPageService();

export default mainPageService;
