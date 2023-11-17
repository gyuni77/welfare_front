import React, {useEffect} from 'react';
import { useFocusEffect } from "@react-navigation/native";

const BookmarkPage = ({navigation, isLogin}) => {
  useFocusEffect(
    React.useCallback(() => {
      if (!isLogin) {
        navigation.navigate('Login');
      }
    }, [navigation, isLogin]),
  );

  return <></>;
};

export default BookmarkPage;
