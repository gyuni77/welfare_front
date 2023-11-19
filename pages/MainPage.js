import React, {useState} from 'react';
import {View, SafeAreaView, Button, ActivityIndicator} from 'react-native';
import WelfareContents from '../components/Common/WelfareContents';
import {styles} from '../styles/MainPageStyle';
import {SearchBar} from '../components/MainPageComponents/SearchBar';
import mainPageService from '../service/WelfareService';
import {useFocusEffect} from '@react-navigation/native';
import userService from '../service/UserService';
import {Header} from '../components/Common/Header';

const MainPage = ({token, setToken, navigation}) => {
  const [welfareList, setWelfareList] = useState([]);
  const [bookmarkedWelfareList, setBookmarkedWelfareList] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [loding, setLoding] = useState(true);
  useFocusEffect(
    React.useCallback(() => {
      setLoding(true);
      if (!keyword) {
        mainPageService.getAllDefaultData().then(data => {
          setWelfareList(data);
          setLoding(false);
        });
      } else {
        mainPageService.getDataBySearch(keyword).then(data => {
          setWelfareList(data);
          setLoding(false);
        });
      }

      //bookmark init
      if (token) {
        userService.getUserInfo(token).then(user => {
          setBookmarkedWelfareList(user.bookmarks);
        });
      } else {
        setBookmarkedWelfareList([]);
      }
    }, [token, keyword]),
  );

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <SearchBar setKeyword={setKeyword} />
      </View>
      {loding ? (
        <ActivityIndicator size="large" />
      ) : (
        <WelfareContents
          welfareList={welfareList}
          bookmarkList={bookmarkedWelfareList}
          setBookmarkList={setBookmarkedWelfareList}
          token={token}
          navigation={navigation}
        />
      )}
    </SafeAreaView>
  );
};

export default MainPage;
