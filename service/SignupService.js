class SignupService {
  getToken = async () => {
    try {
      return await AsyncStorage.getItem('TOKEN');
    } catch (e) {
      console.log('Error getting token.');
      return null;
    }
  };
}

const signupService = new SignupService();

export default welfareContentsService;
