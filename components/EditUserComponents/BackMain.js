import {TouchableOpacity} from 'react-native';
import {Text} from 'react-native-elements';

export const BackMain = ({navigation}) => {
  return (
    <TouchableOpacity
      style={{marginTop: 10, marginBottom: 10}}
      onPress={() => navigation.navigate('LocalWelfare')}>
      <Text style={{color: '#2196F3'}}>돌아가기</Text>
    </TouchableOpacity>
  );
};
