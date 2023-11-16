import axios from 'axios';
import {BACKEND_URL} from '../global';

class MainPageService {
  getAllDefaultData = async () => {
    return await axios
      .get(`${BACKEND_URL}/welfare/all`, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        return response.data;
      });
  };

  getAllDataByUserInfo = () => {
    retrun(axios.get);
  };
  getDataBySearch = () => {};
}

getToken = () => {};

const mainPageService = new MainPageService();
export default mainPageService;
