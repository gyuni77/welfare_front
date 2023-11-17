import {useState} from 'react';
import {TouchableOpacity, View, TextInput, Button, Text} from 'react-native';
import {
  styles,
  pickerSelectCity,
  pickerSelecFamily,
} from '../../styles/SignupStyle';
import {Cityname, family, cityRegion} from '../Common/CityRegionFamily';
import RNPickerSelect from 'react-native-picker-select';

export const SignupInput = () => {
  const [city, setCity] = useState('서울특별시');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUserName] = useState('');
  const [region, setRegion] = useState('');
  const [familySituation, setFamilySituation] = useState('');

  const handleCityChange = value => {
    setCity(value); // 선택된 도시 업데이트
    setRegion(''); // 선택된 지방 초기화
  };
  return (
    <View style={styles.container}>
      <Text style={styles.login}>회원가입</Text>
      <View style={{flexDirection: 'row'}}>
        <TextInput
          spellCheck
          placeholder={'이메일'}
          keyboardType="email-address"
          style={styles.IdInput}
          onChangeText={text => setEmail(text)}
        />
        <TouchableOpacity style={styles.doubleCheck}>
          <Button title="중복확인"></Button>
        </TouchableOpacity>
      </View>
      <View>
        <TextInput
          placeholder={'비밀번호'}
          secureTextEntry
          style={styles.TextInput}
          onChangeText={text => setPassword(text)}
        />
      </View>
      <View>
        <TextInput
          placeholder={'이름'}
          style={styles.TextInput}
          onChangeText={text => setUserName(text)}
        />
      </View>
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
            onValueChange={value => setRegion(value)}
            placeholder={{
              label: '시군명',
            }}
            items={cityRegion[city]}
          />
        </View>
      </View>
      <View>
        <RNPickerSelect
          style={pickerSelecFamily}
          textInputProps={{underlineColorAndroid: 'transparent'}}
          fixAndroidTouchableBug={true} // 안드로이드 오류 해결
          useNativeAndroidPickerStyle={false} // 기본 안드로이드 스타일 제거
          onValueChange={value => setFamilySituation(value)}
          placeholder={{
            label: '가구상황',
          }}
          items={family}
        />
      </View>
    </View>
  );
};
