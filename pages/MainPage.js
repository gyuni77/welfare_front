import React, {useState} from 'react';
import {View, SafeAreaView, Button} from 'react-native';
import WelfareContents from '../components/Common/WelfareContents';
import {styles} from '../styles/MainPageStyle';
import {SearchBar} from '../components/MainPageComponents/SearchBar';
import mainPageService from '../service/MainPageService';
import {useFocusEffect} from '@react-navigation/native';

const MainPage = () => {
  const [searchedWelfare, setSearchedWelfare] = useState([]);
  useFocusEffect(
    React.useCallback(() => {
      mainPageService.getAllDefaultData().then(data => {
        setSearchedWelfare(data);
      });
    }, []),
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <SearchBar />
        <Button title="검색" />
      </View>
      <WelfareContents data={searchedWelfare} />
    </SafeAreaView>
  );
};

export default MainPage;
