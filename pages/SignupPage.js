import React, {useState} from 'react';
import {SafeAreaView, TouchableWithoutFeedback, Keyboard} from 'react-native';
import {styles} from '../styles/SignupStyle';
import {SignupInput} from '../components/SignupComponents/SignupInput';
import {BirthInput} from '../components/SignupComponents/BirthInput';
import {UserInfoSubmit} from '../components/SignupComponents/UserInfoSubmit';
import {AlreadyUser} from '../components/SignupComponents/AlreadyUser';

const SignupPage = ({navigation}) => {
  const [birth, setBirth] = useState('');
  const [city, setCity] = useState('서울특별시');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUserName] = useState('');
  const [region, setRegion] = useState('');
  const [familySituation, setFamilySituation] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <SignupInput
          city={city}
          setEmail={setEmail}
          setCity={setCity}
          setPassword={setPassword}
          setUserName={setUserName}
          setRegion={setRegion}
          setFamilySituation={setFamilySituation}
        />
        <BirthInput
          birth={birth}
          setBirth={setBirth}
          isDatePickerVisible={isDatePickerVisible}
          setDatePickerVisibility={setDatePickerVisibility}
        />
        <UserInfoSubmit />
        <AlreadyUser navigation={navigation} />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SignupPage;
