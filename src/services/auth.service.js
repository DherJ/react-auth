import axios from "axios";
import * as CONSTANTES from '../config/backEntryPoint';

class AuthService {
  login(username, password) {
    return axios
      .post(CONSTANTES.ENDPOINT_SIGNIN, {
        username,
        password
      })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
    window.location.reload(true);
  }

  register(username, email, password) {
    return axios.post(CONSTANTES.ENDPOINT_SIGNUP, {
      username,
      email,
      password
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
  }
}

export default new AuthService();