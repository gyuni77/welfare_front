import {useCallback} from 'react';
import {Alert, Linking, Text, TouchableOpacity} from 'react-native';
import {styles} from '../../styles/MainPageStyle';

export const OpenURLButton = ({url, children}) => {
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
