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
} from 'react-native';
import {Image} from 'react-native-elements';
import USER from './assert/user.png';

const LocalWelfare = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState([
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

    return <Button title={children} onPress={handlePress} />;
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
                <Text style={styles.modalText}>내 정보 수정</Text>
                <Text style={styles.modalText}>북마크 모아보기</Text>
                <Text
                  onPress={() => navigation.navigate('Login')}
                  style={styles.modalText}>
                  로그인 하기
                </Text>
                <Text
                  onPress={() => navigation.navigate('Login')}
                  style={styles.modalText}>
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
    elevation: 2,
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
});

export default LocalWelfare;
