import axios from 'axios';
import { apiUrl } from '../common/constants';
import { User } from '../common/interfaces';

class AuthService {
  login(username: string, password: string) {
    return axios
      .post(`${apiUrl}login`, {
        username,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem('user', JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem('user');
  }

  register(user: User) {
    return axios.post(`${apiUrl}signup`, user).then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }

      return response.data;
    });
  }

  getCurrentUser(): User | undefined {
    const user = localStorage.getItem('user');
    if (!user) return;
    return JSON.parse(user);
  }
}

export default new AuthService();
