import axios from 'axios';
import * as CONSTANTES from '../config/backEntryPoint';
import authHeader from './auth-header';

class RolesService {
  
  getAllRoles() {
    return axios.get(CONSTANTES.ENDPOINT_ROLES, { headers: authHeader() });
  }

  update(role) {
    return axios.patch(CONSTANTES.ENDPOINT_ROLES, role, { headers: authHeader() });
  }

  deleteAll() {
    return axios.delete(CONSTANTES.ENDPOINT_ROLES, { headers: authHeader() });
  }

  delete(id) {
    return axios.delete(CONSTANTES.ENDPOINT_ROLES + '/' + id, { headers: authHeader() });
  }

  findByName(name) {
    return axios.get(CONSTANTES.ENDPOINT_ROLES + `?name=${name}`, { headers: authHeader() });
  }
}

export default new RolesService();