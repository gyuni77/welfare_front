import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  welFare: {
    justifyContent: 'space-between',
    borderWidth: 1,
    borderRadius: 5,
    height: 200,
    width: 180,
    margin: 10,
  },
  TextTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    padding: 3,
  },
  TextContents: {
    marginTop: 5,
    marginBottom: 5,
    fontSize: 15,
    paddingLeft: 5,
  },
  login: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  btn: {
    width: 100,
    height: 30,
    marginBottom: 5,
    // borderWidth: 1,
    // borderRadius: 20,
    // borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: '#2196F3',
  },
  btnText: {
    color: 'white',
    textAlign: 'center',
  },
});
