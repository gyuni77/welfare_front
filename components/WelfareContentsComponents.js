import axios from 'axios';
import React, {useEffect, useState, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Linking,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  const renderItem = ({item}) => {
    return (
      <View style={styles.welFare}>
        <Text style={styles.TextTitle} numberOfLines={2}>
          {item.servNm}
        </Text>
        <Text style={styles.TextContents} numberOfLines={3}>
          {item.servDgst}
        </Text>
        <OpenURLButton url={item.servDtlLink}>자세히</OpenURLButton>
      </View>
    );
  };

  const OpenURLButton = ({url, children}) => {
    const handlePress = useCallback(async () => {
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    }, [url]);

    return (
      <TouchableOpacity style={styles.btn} onPress={handlePress}>
        <Text style={styles.btnText}>{children}</Text>
      </TouchableOpacity>
    );
  };

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
      renderItem={renderItem}
      numColumns={2}
      columnWrapperStyle={{justifyContent: 'space-between'}}
      contentContainerStyle={{padding: 10}}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  welFare: {
    flex: 1,
    justifyContent: 'space-between',
    borderWidth: 1,
    height: 140,
    marginLeft: 5,
    marginBottom: 10,
    borderRadius: 5,
  },
  TextTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    padding: 3,
  },
  TextContents: {
    marginTop: 5,
    marginBottom: 5,
    fontSize: 10,
    paddingLeft: 5,
  },
  btn: {
    backgroundColor: '#2196F3',
    borderRadius: 5,
  },
  btnText: {
    color: 'white',
    textAlign: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WelfareContents;
