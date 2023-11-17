class EditUserService {
  getToken = async () => {
    try {
      return await AsyncStorage.getItem('TOKEN');
    } catch (e) {
      console.log('Error getting token.');
      return null;
    }
  };

  getUserInfo = async () => {
    try {
      const token = await this.getToken();
      if (!token) {
        console.log('Token is null or undefined.');
        return;
      }
      return await axios
        .get(`${BACKEND_URL}/auth/getUser`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `${token}`,
          },
        })
        .then(response => {
          return response.data;
        });
    } catch (e) {
      console.log(e);
    }
  };
}

const editUserService = new EditUserService();

export default editUserService;
