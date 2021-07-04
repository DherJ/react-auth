import axios from "axios";
import authHeader from './auth-header';

import * as CONSTANTES from '../config/backEntryPoint';

class MessageService {
  send(obj) {
    return axios.post(CONSTANTES.ENDPOINT_SEND_MESSAGE, obj, { headers : authHeader() } );
  }
}

export default new MessageService();