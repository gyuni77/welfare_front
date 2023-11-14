import axios from 'axios';
import React, {useEffect, useState, useCallback} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  ScrollView,
  FlatList,
  Linking,
  Button,
  Alert,
  TextInput,
  Modal,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LocalWelfare = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState([
    {
      servId: 'WLF00000001',
      bizChrDeptNm: '경기도 부천시 교육사업단 평생교육과',
      ctpvNm: '경기도',
      sggNm: '부천시',
      servDgst: '부천시 미인가 대안교육기관 등 교복비 지원',
      servDtlLink:
        'https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000001&wlfareInfoReldBztpCd=02',
      lifeNmArray: '청소년',
      intrsThemaNmArray: '교육, 서민금융',
      sprtCycNm: '1회성',
      srvPvsnNm: '현금지급',
      aplyMtdNm: '인터넷',
      inqNum: '279',
      lastModYmd: '20230526',
      servNm: '부천시 미인가 대안교육기관 등 교복비 지원',
      trgterIndvdlNmArray: null,
    },
    {
      servId: 'WLF00000002',
      bizChrDeptNm: '경상남도 창원시 복지여성보건국 여성가족과',
      ctpvNm: '경상남도',
      sggNm: '창원시',
      servDgst: '성매매집결지 내 성매매피해자 자활지원사업',
      servDtlLink:
        'https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000002&wlfareInfoReldBztpCd=02',
      lifeNmArray: null,
      intrsThemaNmArray: '서민금융',
      sprtCycNm: '월',
      srvPvsnNm: '현금지급',
      aplyMtdNm: '방문',
      inqNum: '149',
      lastModYmd: '20231005',
      servNm: '성매매피해자 자활지원사업',
      trgterIndvdlNmArray: null,
    },
    {
      servId: 'WLF00000003',
      bizChrDeptNm: '경상남도 밀양시 행정국 사회복지과',
      ctpvNm: '경상남도',
      sggNm: '밀양시',
      servDgst:
        '국비 장애인활동지원사업을 시행하고 있으나 이용시간부족으로 불편을 겪고 있는 중증장애인을 대상으로 서비스 시간을 추가 지원함으로써 장애인의 자립 및 사회참여 기회를 확대하고자 함.\n',
      servDtlLink:
        'https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000003&wlfareInfoReldBztpCd=02',
      lifeNmArray: '청소년, 청년, 중장년, 영유아, 아동',
      intrsThemaNmArray: null,
      sprtCycNm: '월',
      srvPvsnNm: '전자바우처(바우처)',
      aplyMtdNm: '방문',
      inqNum: '191',
      lastModYmd: '20230623',
      servNm: '장애인활동지원 시추가지원사업',
      trgterIndvdlNmArray: '장애인',
    },
    {
      servId: 'WLF00000004',
      bizChrDeptNm: '경상남도 산청군 복지민원국 주민복지과',
      ctpvNm: '경상남도',
      sggNm: '산청군',
      servDgst: '자활기업 등 저리의 융자금을 지원하여 자활사업 안정화에 기여.',
      servDtlLink:
        'https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000004&wlfareInfoReldBztpCd=02',
      lifeNmArray: '중장년, 청년',
      intrsThemaNmArray: '일자리',
      sprtCycNm: '1회성',
      srvPvsnNm: '현금대여(융자)',
      aplyMtdNm: '방문',
      inqNum: '284',
      lastModYmd: '20230614',
      servNm: '자활 및 생활안정기금사업',
      trgterIndvdlNmArray: '저소득',
    },
    {
      servId: 'WLF00000005',
      bizChrDeptNm: '경상남도 양산시 문화복지국 노인장애인과',
      ctpvNm: '경상남도',
      sggNm: '양산시',
      servDgst:
        '장애인의 일상생활지원을 위한 활동보조인 파견으로 장애인복지 증진 도모',
      servDtlLink:
        'https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000005&wlfareInfoReldBztpCd=02',
      lifeNmArray: null,
      intrsThemaNmArray: '입양·위탁',
      sprtCycNm: '수시',
      srvPvsnNm: '전자바우처(바우처)',
      aplyMtdNm: '방문',
      inqNum: '381',
      lastModYmd: '20230819',
      servNm: '장애인활동지원 시추가사업',
      trgterIndvdlNmArray: '장애인',
    },
    {
      servId: 'WLF00000006',
      bizChrDeptNm: '부산광역시 여성가족국 여성가족과',
      ctpvNm: '부산광역시',
      sggNm: null,
      servDgst:
        '저소득 한부모가족 자녀에 대한 적정한 교육 기회 제공으로  자립능력 배양',
      servDtlLink:
        'https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000006&wlfareInfoReldBztpCd=02',
      lifeNmArray: '청소년, 아동',
      intrsThemaNmArray: '서민금융, 교육',
      sprtCycNm: '반기',
      srvPvsnNm: '현금지급',
      aplyMtdNm: null,
      inqNum: '585',
      lastModYmd: '20230614',
      servNm: '한부모가족자녀 교통비 및 학용품비 지원',
      trgterIndvdlNmArray: '한부모·조손',
    },
    {
      servId: 'WLF00000007',
      bizChrDeptNm: '부산광역시 해운대구 생활복지국 가족복지과',
      ctpvNm: '부산광역시',
      sggNm: '해운대구',
      servDgst: '출산률 제고를 위해 관내 셋째이상 자녀출산시 출산축하금 지급\n',
      servDtlLink:
        'https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000007&wlfareInfoReldBztpCd=02',
      lifeNmArray: '영유아, 임신 · 출산',
      intrsThemaNmArray: '임신·출산, 입양·위탁, 서민금융',
      sprtCycNm: '수시',
      srvPvsnNm: '현금지급',
      aplyMtdNm: '방문, 우편',
      inqNum: '151',
      lastModYmd: '20230819',
      servNm: '셋째이상 자녀 출산지원금 지원',
      trgterIndvdlNmArray: null,
    },
    {
      servId: 'WLF00000010',
      bizChrDeptNm: '인천광역시 연수구 복지환경국 사회보장과',
      ctpvNm: '인천광역시',
      sggNm: '연수구',
      servDgst:
        ' 저소득층 노인들에게 틀니·임플란트 본인부담금을 지원함으로써 구강기능 회복  및 삶의 질 개선 기여 ',
      servDtlLink:
        'https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000010&wlfareInfoReldBztpCd=02',
      lifeNmArray: '노년',
      intrsThemaNmArray: '서민금융',
      sprtCycNm: '월',
      srvPvsnNm: '현금지급',
      aplyMtdNm: '방문',
      inqNum: '577',
      lastModYmd: '20230704',
      servNm: '저소득 노인 틀니·임플란트 본인부담금 지원사업',
      trgterIndvdlNmArray: '저소득',
    },
    {
      servId: 'WLF00000010',
      bizChrDeptNm: '인천광역시 연수구 복지환경국 사회보장과',
      ctpvNm: '인천광역시',
      sggNm: '연수구',
      servDgst:
        ' 저소득층 노인들에게 틀니·임플란트 본인부담금을 지원함으로써 구강기능 회복  및 삶의 질 개선 기여 ',
      servDtlLink:
        'https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000010&wlfareInfoReldBztpCd=02',
      lifeNmArray: '노년',
      intrsThemaNmArray: '서민금융',
      sprtCycNm: '월',
      srvPvsnNm: '현금지급',
      aplyMtdNm: '방문',
      inqNum: '577',
      lastModYmd: '20230704',
      servNm: '저소득 노인 틀니·임플란트 본인부담금 지원사업',
      trgterIndvdlNmArray: '저소득',
    },
    {
      servId: 'WLF00000010',
      bizChrDeptNm: '인천광역시 연수구 복지환경국 사회보장과',
      ctpvNm: '인천광역시',
      sggNm: '연수구',
      servDgst:
        ' 저소득층 노인들에게 틀니·임플란트 본인부담금을 지원함으로써 구강기능 회복  및 삶의 질 개선 기여 ',
      servDtlLink:
        'https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000010&wlfareInfoReldBztpCd=02',
      lifeNmArray: '노년',
      intrsThemaNmArray: '서민금융',
      sprtCycNm: '월',
      srvPvsnNm: '현금지급',
      aplyMtdNm: '방문',
      inqNum: '577',
      lastModYmd: '20230704',
      servNm: '저소득 노인 틀니·임플란트 본인부담금 지원사업',
      trgterIndvdlNmArray: '저소득',
    },
  ]);
  //   const [test, setTest] = useState('test');

  //   useEffect(() => {
  //     const getdata = async () => {
  //       try {
  //         const response = await axios.get(
  //           'http://ec2-43-201-70-125.ap-northeast-2.compute.amazonaws.com:8080/welfare/all',
  //         );
  //         const jsonData = JSON.stringify(response.data);
  //         const parsedData = JSON.parse(jsonData);
  //         setData(parsedData);
  //         console.log(daat);
  //       } catch (err) {
  //         console.error(err);
  //       }
  //     };
  //     getdata();
  //   }, []);

  const renderItem = ({item}) => {
    return (
      <ScrollView style={styles.welFare}>
        <Text style={styles.TextTitle} numberOfLines={2}>
          {item.servNm}
        </Text>
        <Text style={styles.TextContents} numberOfLines={3}>
          {item.servDgst}
        </Text>
        <OpenURLButton url={item.servDtlLink}>자세히</OpenURLButton>
      </ScrollView>
    );
  };

  const OpenURLButton = ({url, children}) => {
    const handlePress = useCallback(async () => {
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    }, [url]);

    return (
      <TouchableOpacity style={styles.btn} onPress={handlePress}>
        <Text style={styles.btnText}>{children}</Text>
      </TouchableOpacity>
    );
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('TOKEN');
      if (value !== null) {
        console.log(`"TOKEN" = ${value}`);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const removeToken = async () => {
    try {
      await AsyncStorage.removeItem('TOKEN');
    } catch (e) {
      console.log(e);
    }
    console.log('로그아웃 되었습니다');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          marginTop: 10,
          marginLeft: 10,
          marginRight: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <Text style={styles.login}>지자체별 복지정보</Text>
        <View style={styles.centeredView}>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text
                  style={styles.modalText}
                  onPress={() => navigation.navigate('Profile')}>
                  내 정보 수정
                </Text>
                <Text style={styles.modalText}>북마크 모아보기</Text>
                <Text
                  onPress={() => navigation.navigate('Login')}
                  style={styles.modalText}>
                  로그인 하기
                </Text>
                <Text onPress={removeToken} style={styles.modalText}>
                  로그아웃
                </Text>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyle}>닫기</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
          <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => setModalVisible(true)}>
            <Text style={styles.textStyle}>메뉴</Text>
          </Pressable>
        </View>
      </View>
      <View style={{marginTop: 10, marginLeft: 10}}>
        <Text style={styles.login}>인천광역시의 복지 정보</Text>
      </View>
      <View style={{alignItems: 'center'}}>
        <TextInput
          style={{
            borderWidth: 1,
            backgroundColor: 'white',
            width: 300,
            borderRadius: 10,
            margin: 10,
          }}
          placeholder="제목으로 검색하세요"
          onChangeText={text => setSearch(text)}
        />
      </View>
      <Button onPress={getData} title="?"></Button>
      <FlatList
        data={data}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        contentContainerStyle={{padding: 10}}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  welFare: {
    borderWidth: 1,
    width: 100,
    height: 140,
    marginLeft: 5,
    marginBottom: 10,
    borderRadius: 5,
  },
  TextTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    padding: 3,
  },
  TextContents: {
    marginTop: 5,
    marginBottom: 5,
    fontSize: 10,
    paddingLeft: 5,
  },
  login: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    width: 100,
    height: 30,
    elevation: 2,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  buttonOpen: {
    backgroundColor: '#2196F3',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  btn: {
    backgroundColor: '#2196F3',
  },
  btnText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default LocalWelfare;
