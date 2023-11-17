class WelfareContentsService {
  getToken = async () => {
    try {
      return await AsyncStorage.getItem('TOKEN');
    } catch (e) {
      console.log('Error getting token.');
      return null;
    }
  };
}

const welfareContentsService = new WelfareContentsService();

export default welfareContentsService;
