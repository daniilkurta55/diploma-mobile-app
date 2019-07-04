import axios from 'axios';
import {config} from './../../../config';

export class SignUpServices {

  signUp(body) {
    return axios.post(`${config.api.baseApiUrl}/users`, body);
  }
}