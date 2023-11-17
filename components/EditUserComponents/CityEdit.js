import {Cityname, cityRegion} from '../Common/CityRegionFamily';
import {pickerSelectCity} from '../../styles/EditUserStyle';
import {BACKEND_URL} from '../../global';
import editUserService from '../../service/EditUserService';
import {useState, Alert} from 'react';
import {Button, TouchableOpacity, View} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';

export const CityEdit = () => {
  const [NewCity, setNewCity] = useState('서울특별시');
  const [NewRegion, setNewRegion] = useState('');
  const handleCityChange = value => {
    setNewCity(value);
    setNewRegion('');
  };
  const getToken = async () => {
    return await editUserService.getToken();
  };

  const getUserInfo = async () => {
    return await editUserService.getUserInfo();
  };

  const RegionChange = async () => {
    try {
      const token = await getToken();

      if (!token) {
        console.log('Token is null or undefined.');
        return;
      }

      const newRegion = {
        ctpvNm: NewCity,
        sggNm: NewRegion,
        familySituation: user.familySituation,
      };

      const response = await axios.put(
        `${BACKEND_URL}/auth/updateUser`,
        newRegion,
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
      Alert.alert('지역 변경에 실패했습니다.');
    }
  };
  return (
    <View>
      <View style={{flexDirection: 'row'}}>
        <View>
          <RNPickerSelect
            style={pickerSelectCity}
            textInputProps={{underlineColorAndroid: 'transparent'}}
            fixAndroidTouchableBug={true} // 안드로이드 오류 해결
            useNativeAndroidPickerStyle={false} // 기본 안드로이드 스타일 제거
            onValueChange={handleCityChange}
            placeholder={{
              label: '시도명',
            }}
            items={Cityname}
          />
        </View>
        <View>
          <RNPickerSelect
            style={pickerSelectCity}
            textInputProps={{underlineColorAndroid: 'transparent'}}
            fixAndroidTouchableBug={true} // 안드로이드 오류 해결
            useNativeAndroidPickerStyle={false} // 기본 안드로이드 스타일 제거
            onValueChange={value => setNewRegion(value)}
            placeholder={{
              label: '시군명',
            }}
            items={cityRegion[NewCity]}
          />
        </View>
      </View>
      <TouchableOpacity style={{marginTop: 10, marginBottom: 10}}>
        <Button title="거주지역 수정" onPress={RegionChange}></Button>
      </TouchableOpacity>
    </View>
  );
};
