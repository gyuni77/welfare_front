import React, {useEffect, useState} from 'react';
import {View, SafeAreaView, Button} from 'react-native';
import WelfareContents from '../components/Common/WelfareContents';
import {styles} from '../styles/MainPageStyle';
import {SearchBar} from '../components/MainPageComponents/SearchBar';
import mainPageService from '../service/MainPageService';

const MainPage = () => {
  const [searchedWelfare, setSearchedWelfare] = useState([]);
  useEffect(() => {
    mainPageService.getAllDefaultData().then(data => {
      setSearchedWelfare(data);
    });
  }, []);

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
