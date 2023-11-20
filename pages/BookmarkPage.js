import React, {useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import userService from '../service/UserService';
import {Button, FlatList, SafeAreaView, View} from 'react-native';
import {styles} from '../styles/MainPageStyle';
import RenderItem from '../components/Common/RenderItem';

const BookmarkPage = ({navigation, token}) => {
  const [welfareList, setWelfareList] = useState([]);
  const [bookmarkList, setBookmarkList] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      if (token) {
        userService.getUserInfo(token).then(user => {
          setBookmarkList(user.bookmarks);
          setWelfareList(user.bookmarks.map(bookmark => bookmark.welfare));
        });
      } else {
        navigation.navigate('Login');
      }
    }, [navigation, token]),
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={welfareList}
        renderItem={({item}) => (
          <RenderItem
            welfare={item}
            bookmarkList={bookmarkList}
            setBookmarkList={setBookmarkList}
            token={token}
            navigation={navigation}
          />
        )}
        numColumns={2}
        columnWrapperStyle={{justifyContent: 'space-between'}}
      />
    </SafeAreaView>
  );
};

export default BookmarkPage;
