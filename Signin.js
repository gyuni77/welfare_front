import React, {useState} from 'react';
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
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

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
    {label: '종로구', value: '종로구'},
    {label: '중구', value: '중구'},
    {label: '용산구', value: '용산구'},
    {label: '성동구', value: '성동구'},
    {label: '광진구', value: '광진구'},
    {label: '동대문구', value: '동대문구'},
    {label: '중랑구', value: '중랑구'},
    {label: '성북구', value: '성북구'},
    {label: '강북구', value: '강북구'},
    {label: '도봉구', value: '도봉구'},
    {label: '노원구', value: '노원구'},
    {label: '은평구', value: '은평구'},
    {label: '서대문구', value: '서대문구'},
    {label: '마포구', value: '마포구'},
    {label: '양천구', value: '양천구'},
    {label: '강서구', value: '강서구'},
    {label: '구로구', value: '구로구'},
    {label: '금천구', value: '금천구'},
    {label: '영등포구', value: '영등포구'},
    {label: '동작구', value: '동작구'},
    {label: '관악구', value: '관악구'},
    {label: '서초구', value: '서초구'},
    {label: '강남구', value: '강남구'},
    {label: '송파구', value: '송파구'},
    {label: '강동구', value: '강동구'},
  ],
  부산광역시: [
    {label: '중구', value: '중구'},
    {label: '서구', value: '서구'},
    {label: '동구', value: '동구'},
    {label: '영도구', value: '영도구'},
    {label: '부산진구', value: '부산진구'},
    {label: '동래구', value: '동래구'},
    {label: '남구', value: '남구'},
    {label: '북구', value: '북구'},
    {label: '해운대구', value: '해운대구'},
    {label: '사하구', value: '사하구'},
    {label: '금정구', value: '금정구'},
    {label: '강서구', value: '강서구'},
    {label: '연제구', value: '연제구'},
    {label: '수영구', value: '수영구'},
    {label: '사상구', value: '사상구'},
  ],
  대구광역시: [
    {label: '중구', value: '중구'},
    {label: '동구', value: '동구'},
    {label: '서구', value: '서구'},
    {label: '남구', value: '남구'},
    {label: '북구', value: '북구'},
    {label: '수성구', value: '수성구'},
    {label: '달서구', value: '달서구'},
    {label: '달성군', value: '달성군'},
    {label: '군위군', value: '군위군'},
  ],
  인천광역시: [
    {label: '중구', value: '중구'},
    {label: '동구', value: '동구'},
    {label: '미추홀구', value: '미추홀구'},
    {label: '연수구', value: '연수구'},
    {label: '남동구', value: '남동구'},
    {label: '부평구', value: '부평구'},
    {label: '계양구', value: '계양구'},
    {label: '서구', value: '서구'},
    {label: '강화군', value: '강화군'},
    {label: '옹진군', value: '옹진군'},
  ],
  대전광역시: [
    {label: '동구', value: '동구'},
    {label: '중구', value: '중구'},
    {label: '서구', value: '서구'},
    {label: '유성구', value: '유성구'},
    {label: '대덕구', value: '대덕구'},
  ],
  광주광역시: [
    {label: '동구', value: '동구'},
    {label: '남구', value: '남구'},
    {label: '서구', value: '서구'},
    {label: '북구', value: '북구'},
    {label: '광산구', value: '광산구'},
  ],
  울산광역시: [
    {label: '중구', value: '중구'},
    {label: '남구', value: '남구'},
    {label: '동구', value: '동구'},
    {label: '북구', value: '북구'},
    {label: '울주군', value: '울주군'},
  ],
  경기도: [
    {label: '수원시', value: '수원시'},
    {label: '성남시', value: '성남시'},
    {label: '의정부시', value: '의정부시'},
    {label: '안양시', value: '안양시'},
    {label: '부천시', value: '부천시'},
    {label: '광명시', value: '광명시'},
    {label: '평택시', value: '평택시'},
    {label: '동두천시', value: '동두천시'},
    {label: '안산시', value: '안산시'},
    {label: '고양시', value: '고양시'},
    {label: '과천시', value: '과천시'},
    {label: '구리시', value: '구리시'},
    {label: '남양주시', value: '남양주시'},
    {label: '오산시', value: '오산시'},
    {label: '시흥시', value: '시흥시'},
    {label: '군포시', value: '군포시'},
    {label: '의왕시', value: '의왕시'},
    {label: '하남시', value: '하남시'},
    {label: '용인시', value: '용인시'},
    {label: '파주시', value: '파주시'},
    {label: '이천시', value: '이천시'},
    {label: '안성시', value: '안성시'},
    {label: '김포시', value: '김포시'},
    {label: '화성시', value: '화성시'},
    {label: '광주시', value: '광주시'},
    {label: '양주시', value: '양주시'},
    {label: '포천시', value: '포천시'},
    {label: '여주시', value: '여주시'},
  ],
  충청북도: [
    {label: '청주시', value: '청주시'},
    {label: '충주시', value: '충주시'},
    {label: '제천시', value: '제천시'},
  ],
  충청남도: [
    {label: '천안시', value: '천안시'},
    {label: '공주시', value: '공주시'},
    {label: '보령시', value: '보령시'},
    {label: '아산시', value: '아산시'},
    {label: '서산시', value: '서산시'},
    {label: '논산시', value: '논산시'},
    {label: '계룡시', value: '계룡시'},
    {label: '당진시', value: '당진시'},
  ],
  전라북도: [
    {label: '전주시', value: '전주시'},
    {label: '군산시', value: '군산시'},
    {label: '익산시', value: '익산시'},
    {label: '정읍시', value: '정읍시'},
    {label: '남원시', value: '남원시'},
    {label: '김제시', value: '김제시'},
  ],
  전라남도: [
    {label: '목포시', value: '목포시'},
    {label: '여수시', value: '여수시'},
    {label: '순천시', value: '순천시'},
    {label: '나주시', value: '나주시'},
    {label: '광양시', value: '광양시'},
  ],
  경상북도: [
    {label: '포항시', value: '포항시'},
    {label: '경주시', value: '경주시'},
    {label: '김포시', value: '김포시'},
    {label: '안동시', value: '안동시'},
    {label: '구미시', value: '구미시'},
    {label: '영주시', value: '영주시'},
    {label: '영천시', value: '영천시'},
    {label: '상주시', value: '상주시'},
    {label: '문경시', value: '문경시'},
    {label: '경산시', value: '경산시'},
  ],
  경상남도: [
    {label: '창원시', value: '창원시'},
    {label: '진주시', value: '진주시'},
    {label: '통영시', value: '통영시'},
    {label: '사천시', value: '사천시'},
    {label: '김해시', value: '김해시'},
    {label: '밀양시', value: '밀양시'},
    {label: '거제시', value: '거제시'},
    {label: '양산시', value: '양산시'},
  ],
  강원특별자치도: [
    {label: '춘천시', value: '춘천시'},
    {label: '원주시', value: '원주시'},
    {label: '강릉시', value: '강릉시'},
    {label: '동해시', value: '동해시'},
    {label: '태백시', value: '태백시'},
    {label: '속초시', value: '속초시'},
    {label: '삼척시', value: '삼척시'},
  ],
  제주특별자치도: [
    {label: '제주시', value: '제주시'},
    {label: '서귀포시', value: '서귀포시'},
  ],
  세종특별자치도: [{label: '세종특별자치시', value: '세종특별자치시'}],
};

const family = [
  {label: '저소득', value: '저소득'},
  {label: '장애인', value: '장애인'},
  {label: '한부모,조손', value: '한부모,조손'},
  {label: '다자녀', value: '다자녀'},
  {label: '다문화,탈북민', value: '다문화,탈북민'},
  {label: '보훈대상자', value: '보훈대상자'},
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

const pickerSelectStyle = StyleSheet.create({
  inputIOS: {
    marginTop: 10,
    fontSize: 16,
    height: 50,
    width: 300,
    borderColor: 'gray',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
  },
  inputAndroid: {
    marginTop: 10,
    fontSize: 16,
    height: 50,
    width: 300,
    borderColor: 'gray',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
  },
});
Date.prototype.format = function (f) {
  if (!this.valueOf()) return ' ';

  var weekName = [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ];
  var d = this;

  return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function ($1) {
    switch ($1) {
      case 'yyyy':
        return d.getFullYear();
      case 'yy':
        return (d.getFullYear() % 1000).zf(2);
      case 'MM':
        return (d.getMonth() + 1).zf(2);
      case 'dd':
        return d.getDate().zf(2);
      case 'E':
        return weekName[d.getDay()];
      case 'HH':
        return d.getHours().zf(2);
      case 'hh':
        return ((h = d.getHours() % 12) ? h : 12).zf(2);
      case 'mm':
        return d.getMinutes().zf(2);
      case 'ss':
        return d.getSeconds().zf(2);
      case 'a/p':
        return d.getHours() < 12 ? '오전' : '오후';
      default:
        return $1;
    }
  });
};

String.prototype.string = function (len) {
  var s = '',
    i = 0;
  while (i++ < len) {
    s += this;
  }
  return s;
};
String.prototype.zf = function (len) {
  return '0'.string(len - this.length) + this;
};
Number.prototype.zf = function (len) {
  return this.toString().zf(len);
};

const Login = ({navigation}) => {
  const [city, setCity] = useState('서울특별시');
  const [region, setRegion] = useState('');
  const [familySituation, serFamilySituation] = useState('');
  const [birth, setBirth] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const placeholder = '생년월일을 입력해 주세요';
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    hideDatePicker();
    setBirth(date.format('yyyy년 MM월 dd일'));
  };

  const handleCityChange = value => {
    setCity(value); // 선택된 도시 업데이트
    setRegion(''); // 선택된 지방 초기화
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <View>
          <Text style={styles.login}>회원가입</Text>
        </View>
        <View style={{flexDirection: 'row'}}>
          <TextInput
            spellCheck
            placeholder={'이메일'}
            keyboardType="email-address"
            style={styles.IdInput}
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
          />
        </View>
        <View>
          <TextInput placeholder={'이름'} style={styles.TextInput} />
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
              onValueChange={value => setRegion(value)}
              placeholder={{
                label: '시군명',
              }}
              items={cityRegionMapping[city]}
            />
          </View>
        </View>
        <View>
          <RNPickerSelect
            style={pickerSelectStyle}
            textInputProps={{underlineColorAndroid: 'transparent'}}
            fixAndroidTouchableBug={true} // 안드로이드 오류 해결
            useNativeAndroidPickerStyle={false} // 기본 안드로이드 스타일 제거
            onValueChange={value => serFamilySituation(value)}
            placeholder={{
              label: '가구상황',
            }}
            items={family}
          />
        </View>
        <View>
          <TouchableOpacity onPress={showDatePicker}>
            <TextInput
              pointerEvents="none"
              style={styles.TextInput}
              placeholder={placeholder}
              placeholderTextColor="#000000"
              underlineColorAndroid="transparent"
              editable={false}
              value={birth}
            />
            <DateTimePickerModal
              headerTextIOS={placeholder}
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={{marginTop: 10, marginBottom: 10}}>
          <Button
            title="회원가입"
            onPress={() => navigation.navigate('Login')}></Button>
        </TouchableOpacity>
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Login')}>
          <Text style={{color: '#2196F3'}}>이미 계정이 있으신가요?</Text>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    marginTop: 20,
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
    backgroundColor: '#F2F2F2',
    marginTop: 20,
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

export default Login;
