import React, {useState} from 'react';
import {View, SafeAreaView, Button} from 'react-native';
import WelfareContents from '../components/Common/WelfareContents';
import {styles} from '../styles/MainPageStyle';
import {SearchBar} from '../components/MainPageComponents/SearchBar';
import mainPageService from '../service/WelfareService';
import {useFocusEffect} from '@react-navigation/native';
import userService from '../service/UserService';

const MainPage = ({token, setToken, navigation}) => {
  const [welfareList, setWelfareList] = useState([]);
  const [bookmarkedWelfareList, setBookmarkedWelfareList] = useState([]);
  useFocusEffect(
    React.useCallback(() => {
      //welfare content init
      mainPageService.getAllDefaultData().then(data => {
        setWelfareList(data);
      });

      //bookmark init
      if (token) {
        userService.getUserInfo(token).then(user => {
          setBookmarkedWelfareList(
            user.bookmarks.map(welfare => welfare.servId),
          );
        });
      }
    }, [token]),
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={{flexDirection: 'row'}}>
        <SearchBar />
        <Button title="검색" />
      </View>
      <WelfareContents
        welfareList={welfareList}
        bookmarkList={bookmarkedWelfareList}
        setBookmarkList={setBookmarkedWelfareList}
        token={token}
        navigation={navigation}
      />
    </SafeAreaView>
  );
};

export default MainPage;
