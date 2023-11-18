import axios from 'axios';
import {BACKEND_URL} from '../global';

class BookmarkService {
  registerBookmark = (token, welfareServId) => {
    axios.post(`${BACKEND_URL}/bookmark/register`, welfareServId, {
      headers: {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
      },
    });
  };
}

const bookmarkService = new BookmarkService();

export default bookmarkService;
