import React, {useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import RecommendWelfareContents from '../components/RecommendComponents/RecommendWelfareContents';
import {styles} from '../styles/MainPageStyle';
import mainPageService from '../service/WelfareService';
import {Header} from '../components/Common/Header';

const RecommendPage = ({navigation, token}) => {
  const [RecommendWelfareList, setRecommendWelfareList] = useState([]);
  const [bookmarkedWelfareList, setBookmarkedWelfareList] = useState([]);
  useFocusEffect(
    React.useCallback(() => {
      if (!token) {
        navigation.navigate('Login');
      } else {
        mainPageService.getAllDataByUserInfo(token).then(data => {
          setRecommendWelfareList(data);
        });
      }
    }, [navigation, token]),
  );

  return (
    <SafeAreaView style={styles.container}>
      <RecommendWelfareContents
        welfareList={RecommendWelfareList}
        bookmarkList={bookmarkedWelfareList}
        setBookmarkList={setBookmarkedWelfareList}
        token={token}
        navigation={navigation}
      />
    </SafeAreaView>
  );
};

export default RecommendPage;
