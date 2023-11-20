import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  Button,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import {styles} from '../styles/MainPageStyle';
import {SearchBar} from '../components/MainPageComponents/SearchBar';
import mainPageService from '../service/WelfareService';
import {useFocusEffect} from '@react-navigation/native';
import userService from '../service/UserService';
import RenderItem from '../components/Common/RenderItem';
import welfareService from '../service/WelfareService';

const MainPage = ({token, setToken, navigation}) => {
  const [welfares, setWelfares] = useState([]);
  const [pageNum, setPageNum] = useState(0);
  const [hasNextPage, setHasNextPage] = useState(true);

  const [bookmarks, setBookmarks] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [loding, setLoding] = useState(true);

  //main init
  useFocusEffect(
    React.useCallback(() => {
      //paging
      setLoding(true);
      mainPageService
        .getAllWelfareByPageNum(pageNum)
        .then(data => {
          if (data.last) {
            setHasNextPage(false);
          }
          setWelfares([...welfares, ...data.content]);
        })
        .then(() => {
          console.log(welfares.length);
        });
      setLoding(false);
    }, [pageNum]),
  );

  //keyword effect
  useFocusEffect(
    React.useCallback(() => {
      if (keyword) {
        setLoding(true);
        mainPageService.getDataBySearch(keyword).then(data => {
          setWelfares(data);
        });
        setLoding(false);
      }
    }, [keyword]),
  );

  //bookmark init
  useFocusEffect(
    React.useCallback(() => {
      if (token) {
        userService.getUserInfo(token).then(user => {
          setBookmarks(user.bookmarks);
        });
      } else {
        setBookmarks([]);
      }
    }, [token]),
  );

  const onEndReached = () => {
    if (hasNextPage) {
      const nextPageNum = pageNum + 1;
      setPageNum(nextPageNum);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <SearchBar setKeyword={setKeyword} />
      </View>
      {loding ? (
        <ActivityIndicator size="large" />
      ) : (
        <FlatList
          data={welfares}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.5}
          renderItem={({item}) => (
            <RenderItem
              welfare={item}
              bookmarkList={bookmarks}
              setBookmarkList={setBookmarks}
              token={token}
              navigation={navigation}
            />
          )}
          numColumns={2}
          columnWrapperStyle={{justifyContent: 'space-between'}}
        />
      )}
    </SafeAreaView>
  );
};

export default MainPage;
