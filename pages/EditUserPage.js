import React, {useEffect, useState} from 'react';
import {SafeAreaView, TouchableWithoutFeedback, Keyboard} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {styles} from '../styles/EditUserStyle';
import {PasswordEdit} from '../components/EditUserComponents/PasswordEdit';
import {FamilyEdit} from '../components/EditUserComponents/FamilyEdit';
import {CityEdit} from '../components/EditUserComponents/CityEdit';
import {BackMain} from '../components/EditUserComponents/BackMain';

const Profile = () => {
  const [user, setUser] = useState('');

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
  }, []);
  useEffect(() => {}, [user]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <PasswordEdit />
        <FamilyEdit />
        <CityEdit />
        <BackMain />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Profile;
