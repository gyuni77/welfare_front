import React from 'react';
import {
  FlatList,
  Linking,
  Alert,
  TouchableOpacity,
  View,
  Text,
  Button,
} from 'react-native';
import {styles} from '../../styles/MainPageStyle';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faBookmark as fullFaBookmark} from '@fortawesome/free-solid-svg-icons';
import {faBookmark as emptyFaBookmark} from '@fortawesome/free-regular-svg-icons';

const WelfareContents = ({data, token, navigation}) => {
  const handlePress = async item => {
    const url = item.servDtlLink;
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  };

  const bookmarkPress = () => {
    if (token) {
      navigation.navigate('Login');
    } else {
      // bookmarkService.registerBookmark()
    }
  };

  const renderItem = item => {
    return (
      <View style={styles.welFare}>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.TextTitle} numberOfLines={2}>
            {item.servNm}
          </Text>
          <FontAwesomeIcon icon={fullFaBookmark} />
          <FontAwesomeIcon icon={emptyFaBookmark} />
          {/*<Button title="북마크" onPress={bookmarkPress} />*/}
        </View>
        <Text style={styles.TextContents} numberOfLines={3}>
          {item.servDgst}
        </Text>
        <Button title="자세히" onPress={handlePress} />
      </View>
    );
  };

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

export default WelfareContents;
