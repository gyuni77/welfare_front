import {Alert, Linking, Text, TouchableOpacity} from 'react-native';
import {styles} from '../../styles/MainPageStyle';

const RenderItem = ({item}) => {
  const handlePress = async () => {
    const url = item.servDtlLink;
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  };

  return (
    <TouchableOpacity style={styles.welFare} onPress={handlePress}>
      <Text style={styles.TextTitle} numberOfLines={2}>
        {item.servNm}
      </Text>
      <Text style={styles.TextContents} numberOfLines={3}>
        {item.servDgst}
      </Text>
    </TouchableOpacity>
  );
};

export default RenderItem;
