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
} from 'react-native';

const LocalWelfare = ({navigation}) => {
  const [data, setData] = useState([
    {
      ctpvNm: '인천광역시',
      servDgst:
        '저소득층 노인들에게 틀니·임플란트 본인부담금을 지원함으로써 구강기능 회복  및 삶의 질 개선 기여',
      trgterIndvdlNmArray: '저소득',
      lifeNmArray: '노년',
      servDtlLink:
        'https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000010&wlfareInfoReldBztpCd=02',
    },
    {
      ctpvNm: '인천광역시',
      servDgst:
        '저소득층 노인들에게 틀니·임플란트 본인부담금을 지원함으로써 구강기능 회복  및 삶의 질 개선 기여',
      trgterIndvdlNmArray: '저소득',
      lifeNmArray: '노년',
      servDtlLink:
        'https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000010&wlfareInfoReldBztpCd=02',
    },
    {
      ctpvNm: '인천광역시',
      servDgst:
        '저소득층 노인들에게 틀니·임플란트 본인부담금을 지원함으로써 구강기능 회복  및 삶의 질 개선 기여',
      trgterIndvdlNmArray: '저소득',
      lifeNmArray: '노년',
      servDtlLink:
        'https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000010&wlfareInfoReldBztpCd=02',
    },
    {
      ctpvNm: '인천광역시',
      servDgst:
        '저소득층 노인들에게 틀니·임플란트 본인부담금을 지원함으로써 구강기능 회복  및 삶의 질 개선 기여',
      trgterIndvdlNmArray: '저소득',
      lifeNmArray: '노년',
      servDtlLink:
        'https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000010&wlfareInfoReldBztpCd=02',
    },
    {
      ctpvNm: '인천광역시',
      servDgst:
        '저소득층 노인들에게 틀니·임플란트 본인부담금을 지원함으로써 구강기능 회복  및 삶의 질 개선 기여',
      trgterIndvdlNmArray: '저소득',
      lifeNmArray: '노년',
      servDtlLink:
        'https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000010&wlfareInfoReldBztpCd=02',
    },
    {
      ctpvNm: '인천광역시',
      servDgst:
        '저소득층 노인들에게 틀니·임플란트 본인부담금을 지원함으로써 구강기능 회복  및 삶의 질 개선 기여',
      trgterIndvdlNmArray: '저소득',
      lifeNmArray: '노년',
      servDtlLink:
        'https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000010&wlfareInfoReldBztpCd=02',
    },
    {
      ctpvNm: '인천광역시',
      servDgst:
        '저소득층 노인들에게 틀니·임플란트 본인부담금을 지원함으로써 구강기능 회복  및 삶의 질 개선 기여',
      trgterIndvdlNmArray: '저소득',
      lifeNmArray: '노년',
      servDtlLink:
        'https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000010&wlfareInfoReldBztpCd=02',
    },
    {
      ctpvNm: '인천광역시',
      servDgst:
        '저소득층 노인들에게 틀니·임플란트 본인부담금을 지원함으로써 구강기능 회복  및 삶의 질 개선 기여',
      trgterIndvdlNmArray: '저소득',
      lifeNmArray: '노년',
      servDtlLink:
        'https://www.bokjiro.go.kr/ssis-tbu/twataa/wlfareInfo/moveTWAT52011M.do?wlfareInfoId=WLF00000010&wlfareInfoReldBztpCd=02',
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
        <Text>대상구역 : {item.ctpvNm}</Text>
        <Text numberOfLines={2}>제목 : {item.servDgst}</Text>
        <Text>대상자 : {item.lifeNmArray}</Text>
        <OpenURLButton url={item.servDtlLink}>자세히 보기</OpenURLButton>
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
      <View>
        <Text style={styles.login}>인천광역시의 복지정보</Text>
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
          placeholder="검색어를 입력해세요"
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
  },
  welFare: {
    borderWidth: 1,
    width: 100,
    height: 200,
    marginLeft: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  Text: {
    textAlign: 'center',
  },
  login: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default LocalWelfare;
