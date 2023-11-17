import {Text, TouchableWithoutFeedback} from 'react-native';

export const AlreadyUser = ({navigation}) => {
  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate('Login')}>
      <Text style={{color: '#2196F3'}}>이미 계정이 있으신가요?</Text>
    </TouchableWithoutFeedback>
  );
};
