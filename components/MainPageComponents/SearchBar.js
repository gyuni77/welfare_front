import React from 'react';
import {TextInput, View} from 'react-native';

export const SearchBar = ({setKeyword}) => {
  return (
    <View style={{alignItems: 'center'}}>
      <TextInput
        style={{
          borderWidth: 1,
          backgroundColor: 'white',
          width: 300,
          borderRadius: 10,
          margin: 10,
        }}
        placeholder="제목으로 검색하세요"
        returnKeyType="search"
        onChangeText={text => setKeyword(text)}
      />
    </View>
  );
};
