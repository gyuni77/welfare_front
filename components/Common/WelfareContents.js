import React, {useEffect} from 'react';
import {StyleSheet, View, FlatList, ActivityIndicator} from 'react-native';
import RenderItem from './RenderItem';

const WelfareContents = ({data}) => {
  return (
    <FlatList
      data={data}
      renderItem={RenderItem}
      numColumns={2}
      columnWrapperStyle={{justifyContent: 'space-between'}}
      contentContainerStyle={{padding: 10}}
    />
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WelfareContents;
