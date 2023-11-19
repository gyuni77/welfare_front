import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  login: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 10,
    fontFamily: 'The_Jamsil_3',
  },
  IdInput: {
    width: 200,
    height: 50,
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 10,
    fontSize: 15,
    paddingHorizontal: 10,
  },
  TextInput: {
    width: 300,
    height: 50,
    borderWidth: 1,
    borderColor: 'gray',
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 10,
    fontSize: 15,
    paddingHorizontal: 20,
  },
  EditButton: {
    width: 100,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2196F3',
    marginTop: 10,
    marginLeft: 5,
    borderRadius: 5,
  },
  button: {
    width: 100,
    height: 40,
    borderWidth: 1,
    borderColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 5,
  },
  select: {
    borderWidth: 1,
    width: 150,
    height: 40,
    marginTop: 10,
    borderColor: 'gray',
    backgroundColor: 'white',
    marginLeft: 2.5,
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});

export const pickerSelectFamily = StyleSheet.create({
  inputIOS: {
    marginTop: 10,
    fontSize: 16,
    height: 50,
    width: 200,
    borderColor: 'gray',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    marginLeft: 3,
    color: 'black',
  },
  inputAndroid: {
    marginTop: 10,
    fontSize: 16,
    height: 50,
    width: 200,
    borderColor: 'gray',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    color: 'black',
  },
});

export const pickerSelectCity = StyleSheet.create({
  inputIOS: {
    marginTop: 10,
    fontSize: 16,
    height: 50,
    width: 150,
    borderColor: 'gray',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    marginLeft: 3,
    color: 'black',
  },
  inputAndroid: {
    marginTop: 10,
    fontSize: 16,
    height: 50,
    width: 150,
    borderColor: 'gray',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 12,
    padding: 10,
    color: 'black',
  },
});
