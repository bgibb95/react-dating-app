import axios from 'axios';

const API_URL = 'http://localhost:8000/api/auth/';

class AuthService {
  login(username: string, password: string) {
    return axios
      .post(API_URL + 'signin', {
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

  register(user: unknown) {
    //return axios.post(API_URL + 'signup', user);

    return axios.post(API_URL + 'signup', user).then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }

      return response.data;
    });
  }

  getCurrentUser() {
    const user = localStorage.getItem('user');
    if (!user) return;
    return JSON.parse(user);
  }
}

export default new AuthService();
