import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RenderItem} from './RenderItem';

const WelfareContents = ({search, searchData}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getToken = async () => {
    try {
      return await AsyncStorage.getItem('TOKEN');
    } catch (e) {
      console.log(e);
      console.log('Error getting token.');
      return null;
    }
  };

  useEffect(() => {
    const getdata = async () => {
      try {
        const token = await getToken();

        if (!token) {
          console.log('Token is null or undefined.');
          return;
        }
        let url = 'http://ykh8746.iptime.org:8080/welfare/user';
        if (search) {
          url = `http://ykh8746.iptime.org:8080/welfare/search/${search}`;
        }

        const response = await axios.get(url, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
        });
        setData(search ? searchData : response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    setLoading(true);
    getdata();
  }, [search, searchData]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2196F3" />
      </View>
    );
  }

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
