import {Alert, View, Modal, TouchableOpacity, Text, Button} from 'react-native';
import {styles} from '../../styles/MainPageStyle';
import {useState} from 'react';
import mainPageService from '../../service/MainPageService';

export const ModalList = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogout = async () => {
    await mainPageService.removeToken();
  };

  return (
    <View style={styles.modalContanier}>
      <Text style={styles.login}>지자체별 복지정보</Text>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View>
          <View style={styles.modalView}>
            <Text
              style={styles.modalText}
              onPress={() => navigation.navigate('Profile')}>
              내 정보 수정
            </Text>
            <Text style={styles.modalText}>북마크 모아보기</Text>
            <Text
              onPress={() => navigation.navigate('Login')}
              style={styles.modalText}>
              로그인 하기
            </Text>
            <Text onPress={handleLogout} style={styles.modalText}>
              로그아웃
            </Text>
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <TouchableOpacity
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>메뉴</Text>
      </TouchableOpacity>
    </View>
  );
};
