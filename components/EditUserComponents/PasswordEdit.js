import {useState} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import {styles} from '../../styles/EditUserStyle';
import editUserService from '../../service/EditUserService';
import {BACKEND_URL} from '../../global';
import axios from 'axios';

export const PasswordEdit = () => {
  const [NewPassword, setNewPassword] = useState('');

  const getToken = () => {
    editUserService.getToken();
  };

  const PasswordChange = async () => {
    try {
      const token = await getToken();

      if (!token) {
        console.log('Token is null or undefined.');
        return;
      }

      const newPassword = {
        password: NewPassword,
      };

      const response = await axios.put(
        `${BACKEND_URL}/auth/updatePassword`,
        newPassword,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
        },
      );

      console.log(response);
      Alert.alert('변경 완료 되었습니다!');
    } catch (error) {
      console.log(error);
      Alert.alert('비밀번호 변경에 실패했습니다.');
    }
  };
  return (
    <View>
      <View>
        <Text style={styles.login}>개인정보 수정</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <TextInput
          spellCheck
          placeholder={'비밀번호'}
          style={styles.IdInput}
          onChangeText={text => setNewPassword(text)}
        />
        <TouchableOpacity onPress={PasswordChange} style={styles.EditButton}>
          <Text style={{color: 'white'}}>수정</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
