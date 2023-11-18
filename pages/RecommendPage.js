import React from 'react';
import {useFocusEffect} from '@react-navigation/native';

const RecommendPage = ({navigation, token}) => {
  useFocusEffect(
    React.useCallback(() => {
      if (!token) {
        navigation.navigate('Login');
      }
    }, [navigation, token]),
  );

  return <></>;
};

export default RecommendPage;
