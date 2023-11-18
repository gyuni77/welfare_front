import React, {useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';

const BookmarkPage = ({navigation, token}) => {
  useFocusEffect(
    React.useCallback(() => {
      if (!token) {
        navigation.navigate('Login');
      }
    }, [navigation, token]),
  );

  return <></>;
};

export default BookmarkPage;
