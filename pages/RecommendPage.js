import React from 'react';
import {useFocusEffect} from '@react-navigation/native';

const RecommendPage = ({navigation, isLogin}) => {
  useFocusEffect(
    React.useCallback(() => {
      if (!isLogin) {
        navigation.navigate('Login');
      }
    }, [navigation, isLogin]),
  );

  return <></>;
};

export default RecommendPage;
