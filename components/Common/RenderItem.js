import {Text, View} from 'react-native';
import {styles} from '../../styles/MainPageStyle';
import {OpenURLButton} from './OpenURLButton';

const RenderItem = ({item}) => {
  return (
    <View style={styles.welFare}>
      <Text style={styles.TextTitle} numberOfLines={2}>
        {item.servNm}
      </Text>
      <Text style={styles.TextContents} numberOfLines={3}>
        {item.servDgst}
      </Text>
      {/*<OpenURLButton url={item.servDtlLink}>자세히</OpenURLButton>*/}
    </View>
  );
};

export default RenderItem;
