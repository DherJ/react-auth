import axios from "axios";
import authHeader from './auth-header';

import * as CONSTANTES from '../config/backEntryPoint';

class PetsService {
  getAllPets() {
    return axios.get(CONSTANTES.ENDPOINT_PETS, { headers: authHeader() });
  }
}

export default new PetsService();