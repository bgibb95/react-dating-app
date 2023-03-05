import axios, { AxiosResponse } from 'axios';
import { apiUrl } from '../common/constants';
import { User } from '../common/interfaces';
import authHeader from './auth-header';

class UserService {
  getAllUsers(): Promise<AxiosResponse<{ users: User[] | undefined }>> {
    return axios.get(`${apiUrl}all-users`, { headers: authHeader() });
  }

  getUserProfile(username: string) {
    return axios.post(`${apiUrl}user-profile`, { username }, { headers: authHeader() });
  }
}

const userService = new UserService();

export default userService;
