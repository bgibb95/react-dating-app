import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8000/api/test/';

class UserService {
  getPublicContent() {
    return axios.get(API_URL + 'all');
  }

  getUserProfile(username: string) {
    return axios.post(API_URL + 'user-profile', { username }, { headers: authHeader() });
  }

  getUserBoard() {
    return axios.get(API_URL + 'user', { headers: authHeader() });
  }
}

export default new UserService();
