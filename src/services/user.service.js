import axios from 'axios';
import * as CONSTANTES from '../config/backEntryPoint';
import authHeader from './auth-header';

class UserService {
  


  getPublicContent() {
    return axios.get(CONSTANTES.ENDPOINT_PUBLIC_CONTENT);
  }

  getUserBoard() {
    return axios.get(CONSTANTES.ENDPOINT_USER_CONTENT, { headers: authHeader() });
  }

  getModeratorBoard() {
    return axios.get(CONSTANTES.ENDPOINT_MODERATOR_CONTENT, { headers: authHeader() });
  }

  getAdminBoard() {
    return axios.get(CONSTANTES.ENDPOINT_ADMIN_CONTENT, { headers: authHeader() });
  }

  getAllUsers() {
    return axios.get(CONSTANTES.ENDPOINT_USERS, { headers: authHeader() });
  }

  update(user) {
    return axios.patch(CONSTANTES.ENDPOINT_USERS, user, { headers: authHeader() });
  }

  deleteAll() {
    return axios.delete(CONSTANTES.ENDPOINT_USERS, { headers: authHeader() });
  }

  delete(id) {
    return axios.delete(CONSTANTES.ENDPOINT_USERS + '/' + id, { headers: authHeader() });
  }

  findByName(name) {
    return axios.get(CONSTANTES.ENDPOINT_USERS + `?name=${name}`, { headers: authHeader() });
  }
}

export default new UserService();