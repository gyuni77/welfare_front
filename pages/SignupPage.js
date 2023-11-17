import React from 'react';
import {SafeAreaView, TouchableWithoutFeedback, Keyboard} from 'react-native';
import {styles} from '../styles/SignupStyle';
import {SignupInput} from '../components/SignupComponents/SignupInput';
import {BirthInput} from '../components/SignupComponents/BirthInput';
import {UserInfoSubmit} from '../components/SignupComponents/UserInfoSubmit';
import {AlreadyUser} from '../components/SignupComponents/AlreadyUser';

const Signup = () => {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <SignupInput />
        <BirthInput />
        <UserInfoSubmit />
        <AlreadyUser />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Signup;
