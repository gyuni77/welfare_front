import React, {useEffect, useState} from 'react';
import {SafeAreaView, TouchableWithoutFeedback, Keyboard} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {styles} from '../styles/EditUserStyle';
import {PasswordEdit} from '../components/EditUserComponents/PasswordEdit';
import {FamilyEdit} from '../components/EditUserComponents/FamilyEdit';
import {CityEdit} from '../components/EditUserComponents/CityEdit';
import {Logout} from '../components/EditUserComponents/Logout';

const EditUserPage = ({navigation, token, setToken}) => {
  const [user, setUser] = useState('');
  const [NewPassword, setNewPassword] = useState('');
  const [NewFamilySituation, setNewFamilySituation] = useState('');
  const [NewCity, setNewCity] = useState('서울특별시');
  const [NewRegion, setNewRegion] = useState('');

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <PasswordEdit
          token={token}
          NewPassword={NewPassword}
          setNewPassword={setNewPassword}
        />
        <FamilyEdit
          user={user}
          setUser={setUser}
          NewFamilySituation={NewFamilySituation}
          setNewFamilySituation={setNewFamilySituation}
          token={token}
        />
        <CityEdit
          user={user}
          NewCity={NewCity}
          NewRegion={NewRegion}
          setUser={setUser}
          setNewCity={setNewCity}
          setNewRegion={setNewRegion}
          token={token}
        />
        <Logout navigation={navigation} setToken={setToken} />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default EditUserPage;
