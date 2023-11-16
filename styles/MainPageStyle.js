import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  welFare: {
    borderWidth: 1,
    width: 100,
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
  login: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    width: 100,
    height: 30,
    elevation: 2,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  buttonOpen: {
    backgroundColor: '#2196F3',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  btn: {
    backgroundColor: '#2196F3',
  },
  btnText: {
    color: 'white',
    textAlign: 'center',
  },
});
