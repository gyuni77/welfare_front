import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  View,
  Text,
  SafeAreaView,
  TextInput,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const 시도명 = [
  {label: '서울특별시', value: '서울특별시'},
  {label: '광주광역시', value: '광주광역시'},
  {label: '대구광역시', value: '대구광역시'},
  {label: '대전광역시', value: '대전광역시'},
  {label: '부산광역시', value: '부산광역시'},
  {label: '울산광역시', value: '울산광역시'},
  {label: '인천광역시', value: '인천광역시'},
  {label: '경기도', value: '경기도'},
  {label: '경상남도', value: '경상남도'},
  {label: '경상북도', value: '경상북도'},
  {label: '전라남도', value: '전라남도'},
  {label: '전라북도', value: '전라북도'},
  {label: '충청남도', value: '충청남도'},
  {label: '충청북도', value: '충청북도'},
  {label: '강원특별자치도', value: '강원특별자치도'},
  {label: '제주특별자치도', value: '제주특별자치도'},
  {label: '세종특별자치시', value: '세종특별자치시'},
];

const cityRegionMapping = {
  서울특별시: [
    {label: '강남구', value: '강남구'},
    {label: '강동구', value: '강동구'},
    {label: '강서구', value: '강서구'},
    {label: '강북구', value: '강북구'},
    {label: '관악구', value: '관악구'},
    {label: '광진구', value: '광진구'},
    {label: '구로구', value: '구로구'},
    {label: '금천구', value: '금천구'},
    {label: '노원구', value: '노원구'},
    {label: '도봉구', value: '도봉구'},
    {label: '동대문구', value: '동대문구'},
    {label: '동작구', value: '동작구'},
    {label: '마포구', value: '마포구'},
    {label: '서대문구', value: '서대문구'},
    {label: '서초구', value: '서초구'},
    {label: '성동구', value: '성동구'},
    {label: '성북구', value: '성북구'},
    {label: '송파구', value: '송파구'},
    {label: '양천구', value: '양천구'},
    {label: '영등포구', value: '영등포구'},
    {label: '용산구', value: '용산구'},
    {label: '은평구', value: '은평구'},
    {label: '종로구', value: '종로구'},
    {label: '중구', value: '중구'},
    {label: '중랑구', value: '중랑구'},
  ],

  부산광역시: [
    {label: '강서구', value: '강서구'},
    {label: '금정구', value: '금정구'},
    {label: '기장군', value: '기장군'},
    {label: '남구', value: '남구'},
    {label: '동구', value: '동구'},
    {label: '동래구', value: '동래구'},
    {label: '부산진구', value: '부산진구'},
    {label: '북구', value: '북구'},
    {label: '사상구', value: '사상구'},
    {label: '사하구', value: '사하구'},
    {label: '서구', value: '서구'},
    {label: '수영구', value: '수영구'},
    {label: '연제구', value: '연제구'},
    {label: '영도구', value: '영도구'},
    {label: '중구', value: '중구'},
    {label: '해운대구', value: '해운대구'},
  ],

  대구광역시: [
    {label: '군위군', value: '군위군'},
    {label: '남구', value: '남구'},
    {label: '달서구', value: '달서구'},
    {label: '달성군', value: '달성군'},
    {label: '동구', value: '동구'},
    {label: '북구', value: '북구'},
    {label: '서구', value: '서구'},
    {label: '수성구', value: '수성구'},
    {label: '중구', value: '중구'},
  ],

  인천광역시: [
    {label: '강화군', value: '강화군'},
    {label: '계양구', value: '계양구'},
    {label: '남동구', value: '남동구'},
    {label: '동구', value: '동구'},
    {label: '미추홀구', value: '미추홀구'},
    {label: '부평구', value: '부평구'},
    {label: '서구', value: '서구'},
    {label: '연수구', value: '연수구'},
    {label: '옹진군', value: '옹진군'},
    {label: '중구', value: '중구'},
  ],

  광주광역시: [
    {label: '광산구', value: '광산구'},
    {label: '남구', value: '남구'},
    {label: '동구', value: '동구'},
    {label: '북구', value: '북구'},
    {label: '서구', value: '서구'},
  ],

  대전광역시: [
    {label: '대덕구', value: '대덕구'},
    {label: '동구', value: '동구'},
    {label: '서구', value: '서구'},
    {label: '유성구', value: '유성구'},
    {label: '중구', value: '중구'},
  ],

  울산광역시: [
    {label: '남구', value: '남구'},
    {label: '동구', value: '동구'},
    {label: '북구', value: '북구'},
    {label: '울주군', value: '울주군'},
    {label: '중구', value: '중구'},
  ],

  세종특별자치시: [{label: '세종특별자치시', value: '세종특별자치시'}],

  경기도: [
    {label: '가평군', value: '가평군'},
    {label: '고양시', value: '고양시'},
    {label: '과천시', value: '과천시'},
    {label: '광명시', value: '광명시'},
    {label: '광주시', value: '광주시'},
    {label: '구리시', value: '구리시'},
    {label: '군포시', value: '군포시'},
    {label: '김포시', value: '김포시'},
    {label: '남양주시', value: '남양주시'},
    {label: '동부천시', value: '동부천시'},
    {label: '부천시', value: '부천시'},
    {label: '성남시', value: '성남시'},
    {label: '수원시', value: '수원시'},
    {label: '시흥시', value: '시흥시'},
    {label: '안산시', value: '안산시'},
    {label: '안성시', value: '안성시'},
    {label: '안양시', value: '안양시'},
    {label: '양주시', value: '양주시'},
    {label: '양평군', value: '양평군'},
    {label: '여주시', value: '여주시'},
    {label: '연천군', value: '연천군'},
    {label: '오산시', value: '오산시'},
    {label: '용인시', value: '용인시'},
    {label: '의왕시', value: '의왕시'},
    {label: '의정부시', value: '의정부시'},
    {label: '이천시', value: '이천시'},
    {label: '파주시', value: '파주시'},
    {label: '평택시', value: '평택시'},
    {label: '포천시', value: '포천시'},
    {label: '하남시', value: '하남시'},
    {label: '화성시', value: '화성시'},
  ],

  강원특별자치도: [
    {label: '강릉시', value: '강릉시'},
    {label: '고성군', value: '고성군'},
    {label: '동해시', value: '동해시'},
    {label: '삼척시', value: '삼척시'},
    {label: '속초시', value: '속초시'},
    {label: '양구군', value: '양구군'},
    {label: '양양군', value: '양양군'},
    {label: '영월군', value: '영월군'},
    {label: '원주시', value: '원주시'},
    {label: '인제군', value: '인제군'},
    {label: '정선군', value: '정선군'},
    {label: '철원군', value: '철원군'},
    {label: '춘천시', value: '춘천시'},
    {label: '태백시', value: '태백시'},
    {label: '평창군', value: '평창군'},
    {label: '홍천군', value: '홍천군'},
    {label: '화천군', value: '화천군'},
    {label: '횡성군', value: '횡성군'},
  ],

  충청북도: [
    {label: '괴산군', value: '괴산군'},
    {label: '단양군', value: '단양군'},
    {label: '보은군', value: '보은군'},
    {label: '영동군', value: '영동군'},
    {label: '옥천군', value: '옥천군'},
    {label: '음성군', value: '음성군'},
    {label: '제천시', value: '제천시'},
    {label: '증평군', value: '증평군'},
    {label: '진천군', value: '진천군'},
    {label: '청주시', value: '청주시'},
    {label: '충주시', value: '충주시'},
  ],

  충청남도: [
    {label: '계룡시', value: '계룡시'},
    {label: '고주시', value: '고주시'},
    {label: '금산군', value: '금산군'},
    {label: '논산시', value: '논산시'},
    {label: '당진시', value: '당진시'},
    {label: '보령시', value: '보령시'},
    {label: '부여군', value: '부여군'},
    {label: '서산시', value: '서산시'},
    {label: '서천군', value: '서천군'},
    {label: '아산시', value: '아산시'},
    {label: '예산군', value: '예산군'},
    {label: '천안시', value: '천안시'},
    {label: '천안시 동남구', value: '천안시 동남구'},
    {label: '천안시 서북구', value: '천안시 서북구'},
    {label: '청양군', value: '청양군'},
    {label: '태안군', value: '태안군'},
    {label: '홍성군', value: '홍성군'},
  ],

  전라북도: [
    {label: '고창군', value: '고창군'},
    {label: '군산시', value: '군산시'},
    {label: '김제시', value: '김제시'},
    {label: '남원시', value: '남원시'},
    {label: '무주군', value: '무주군'},
    {label: '부안군', value: '부안군'},
    {label: '순창군', value: '순창군'},
    {label: '완주군', value: '완주군'},
    {label: '익산시', value: '익산시'},
    {label: '임실군', value: '임실군'},
    {label: '장수군', value: '장수군'},
    {label: '전주시', value: '전주시'},
    {label: '정읍시', value: '정읍시'},
    {label: '진안군', value: '진안군'},
  ],

  전라남도: [
    {label: '강진군', value: '강진군'},
    {label: '고흥군', value: '고흥군'},
    {label: '곡성군', value: '곡성군'},
    {label: '광양시', value: '광양시'},
    {label: '구례군', value: '구례군'},
    {label: '나주시', value: '나주시'},
    {label: '담양군', value: '담양군'},
    {label: '목포시', value: '목포시'},
    {label: '무안군', value: '무안군'},
    {label: '보성군', value: '보성군'},
    {label: '순천시', value: '순천시'},
    {label: '신안군', value: '신안군'},
    {label: '여수시', value: '여수시'},
    {label: '영광군', value: '영광군'},
    {label: '영암군', value: '영암군'},
    {label: '완도군', value: '완도군'},
    {label: '장성군', value: '장성군'},
    {label: '장흥군', value: '장흥군'},
    {label: '진도군', value: '진도군'},
    {label: '함평군', value: '함평군'},
    {label: '해남군', value: '해남군'},
    {label: '화순군', value: '화순군'},
  ],

  경상북도: [
    {label: '경산시', value: '경산시'},
    {label: '경주시', value: '경주시'},
    {label: '고령군', value: '고령군'},
    {label: '구미시', value: '구미시'},
    {label: '김천시', value: '김천시'},
    {label: '문경시', value: '문경시'},
    {label: '봉화군', value: '봉화군'},
    {label: '상주시', value: '상주시'},
    {label: '성주군', value: '성주군'},
    {label: '안동시', value: '안동시'},
    {label: '영덕군', value: '영덕군'},
    {label: '영양군', value: '영양군'},
    {label: '영주시', value: '영주시'},
    {label: '영천시', value: '영천시'},
    {label: '예천군', value: '예천군'},
    {label: '울릉군', value: '울릉군'},
    {label: '을진군', value: '을진군'},
    {label: '의성군', value: '의성군'},
    {label: '청도군', value: '청도군'},
    {label: '청송군', value: '청송군'},
    {label: '칠곡군', value: '칠곡군'},
    {label: '포항시', value: '포항시'},
  ],

  경상남도: [
    {label: '거제시', value: '거제시'},
    {label: '거창군', value: '거창군'},
    {label: '고성군', value: '고성군'},
    {label: '김해시', value: '김해시'},
    {label: '남해군', value: '남해군'},
    {label: '밀양시', value: '밀양시'},
    {label: '사천시', value: '사천시'},
    {label: '산청군', value: '산청군'},
    {label: '양산시', value: '양산시'},
    {label: '의령군', value: '의령군'},
    {label: '진주시', value: '진주시'},
    {label: '창녕군', value: '창녕군'},
    {label: '창원시', value: '창원시'},
    {label: '통영시', value: '통영시'},
    {label: '하동군', value: '하동군'},
    {label: '함안군', value: '함안군'},
    {label: '함양군', value: '함양군'},
    {label: '합천군', value: '합천군'},
  ],

  제주특별자치도: [
    {label: '서귀포시', value: '서귀포시'},
    {label: '제주시', value: '제주시'},
  ],
};

const family = [
  {label: '저소득', value: 'LOW_INCOME'},
  {label: '장애인', value: 'DISABLED'},
  {label: '한부모,조손', value: 'SINGLE_PARENT'},
  {label: '다자녀', value: 'MULTI_CHILDREN'},
  {label: '다문화,탈북민', value: 'MULTI_CULTURE'},
  {label: '보훈대상자', value: 'VETARAN'},
];

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    marginTop: 10,
    fontSize: 16,
    height: 50,
    width: 150,
    borderColor: 'gray',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    marginLeft: 3,
  },
  inputAndroid: {
    marginTop: 10,
    fontSize: 16,
    height: 50,
    width: 150,
    borderColor: 'gray',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
  },
});

const pickerSelectStyles_fm = StyleSheet.create({
  inputIOS: {
    marginTop: 10,
    fontSize: 16,
    height: 50,
    width: 200,
    borderColor: 'gray',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    marginLeft: 3,
  },
  inputAndroid: {
    marginTop: 10,
    fontSize: 16,
    height: 50,
    width: 200,
    borderColor: 'gray',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
  },
});

const Profile = ({navigation}) => {
  const [NewCity, setNewCity] = useState('서울특별시');
  const [NewPassword, setNewPassword] = useState('');
  const [NewFamilySituation, setNewFamilySituation] = useState('');
  const [NewRegion, setNewRegion] = useState('');
  const [user, setUser] = useState('');

  const handleCityChange = value => {
    setNewCity(value); // 선택된 도시 업데이트
    setNewRegion(''); // 선택된 지방 초기화
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

  const PasswordChange = async () => {
    try {
      const token = await getToken();

      if (!token) {
        console.log('Token is null or undefined.');
        return;
      }

      const newPassword = {
        password: NewPassword,
      };

      const response = await axios.put(
        'http://ykh8746.iptime.org:8080/auth/updatePassword',
        newPassword,
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
      Alert.alert('비밀번호 변경에 실패했습니다.');
    }
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
        'http://ykh8746.iptime.org:8080/auth/updateUser',
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
      Alert.alert('이름 변경에 실패했습니다.');
    }
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
        'http://ykh8746.iptime.org:8080/auth/updateUser',
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.login}>개인정보 수정</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TextInput
            spellCheck
            placeholder={'비밀번호'}
            style={styles.IdInput}
            onChangeText={text => setNewPassword(text)}
          />
          <TouchableOpacity onPress={PasswordChange} style={styles.doubleCheck}>
            <Text style={{color: 'white'}}>수정</Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row'}}>
          <RNPickerSelect
            style={pickerSelectStyles_fm}
            textInputProps={{underlineColorAndroid: 'transparent'}}
            fixAndroidTouchableBug={true} // 안드로이드 오류 해결
            useNativeAndroidPickerStyle={false} // 기본 안드로이드 스타일 제거
            onValueChange={value => setNewFamilySituation(value)}
            placeholder={{
              label: '가구상황',
            }}
            items={family}
          />
          <TouchableOpacity
            onPress={situationChange}
            style={styles.doubleCheck}>
            <Text style={{color: 'white'}}>수정</Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row'}}>
          <View>
            <RNPickerSelect
              style={pickerSelectStyles}
              textInputProps={{underlineColorAndroid: 'transparent'}}
              fixAndroidTouchableBug={true} // 안드로이드 오류 해결
              useNativeAndroidPickerStyle={false} // 기본 안드로이드 스타일 제거
              onValueChange={handleCityChange}
              placeholder={{
                label: '시도명',
              }}
              items={시도명}
            />
          </View>
          <View>
            <RNPickerSelect
              style={pickerSelectStyles}
              textInputProps={{underlineColorAndroid: 'transparent'}}
              fixAndroidTouchableBug={true} // 안드로이드 오류 해결
              useNativeAndroidPickerStyle={false} // 기본 안드로이드 스타일 제거
              onValueChange={value => setNewRegion(value)}
              placeholder={{
                label: '시군명',
              }}
              items={cityRegionMapping[NewCity]}
            />
          </View>
        </View>
        <TouchableOpacity style={{marginTop: 10, marginBottom: 10}}>
          <Button title="거주지역 수정" onPress={RegionChange}></Button>
        </TouchableOpacity>
        <TouchableOpacity
          style={{marginTop: 10, marginBottom: 10}}
          onPress={() => navigation.navigate('LocalWelfare')}>
          <Text style={{color: '#2196F3'}}>돌아가기</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  login: {
    fontSize: 30,
  },
  IdInput: {
    width: 200,
    height: 50,
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 10,
    fontSize: 15,
    paddingHorizontal: 20,
  },
  TextInput: {
    width: 300,
    height: 50,
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 10,
    fontSize: 15,
    paddingHorizontal: 20,
  },
  doubleCheck: {
    width: 100,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2196F3',
    marginTop: 10,
    marginLeft: 5,
    borderRadius: 5,
  },
  button: {
    width: 100,
    height: 40,
    borderWidth: 1,
    borderColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 5,
  },
  select: {
    borderWidth: 1,
    width: 150,
    height: 40,
    marginTop: 10,
    borderColor: 'gray',
    backgroundColor: 'white',
    marginLeft: 2.5,
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});

export default Profile;