import {useState, Alert} from 'react';
import {styles, pickerSelectFamily} from '../../styles/EditUserStyle';
import {Text, TouchableOpacity, View} from 'react-native';
import {family} from '../Common/CityRegionFamily';
import {BACKEND_URL} from '../../global';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
import editUserService from '../../service/EditUserService';

export const FamilyEdit = () => {
  const [NewFamilySituation, setNewFamilySituation] = useState('');

  const getToken = async () => {
    return await editUserService.getToken();
  };

  const getUserInfo = async () => {
    return await editUserService.getUserInfo();
  };

  const situationChange = async () => {
    try {
      const token = await getToken();

      if (!token) {
        console.log('Token is null or undefined.');
        return;
      }

      const newUserFamily = {
        familySituation: NewFamilySituation,
        ctpvNm: user.ctpvNm,
        sggNm: user.sggNm,
      };

      const response = await axios.put(
        `${BACKEND_URL}/auth/updateUser`,
        newUserFamily,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
        },
      );

      console.log(response);
      Alert.alert('변경 완료 되었습니다!');
    } catch (error) {
      console.log(error);
      Alert.alert('가구 상황 변경에 실패했습니다.');
    }
  };

  return (
    <View style={{flexDirection: 'row'}}>
      <RNPickerSelect
        style={pickerSelectFamily}
        textInputProps={{underlineColorAndroid: 'transparent'}}
        fixAndroidTouchableBug={true}
        useNativeAndroidPickerStyle={false}
        onValueChange={value => setNewFamilySituation(value)}
        placeholder={{
          label: '가구상황',
        }}
        items={family}
      />
      <TouchableOpacity onPress={situationChange} style={styles.EditButton}>
        <Text style={{color: 'white'}}>수정</Text>
      </TouchableOpacity>
    </View>
  );
};
