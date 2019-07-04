import axios from 'axios/index';
import {config} from '../config';

export class CommonServices {
  changePassword(body, id) {
    return axios.put(`${config.api.baseApiUrl}/users/${id}/changePassword`, body);
  }
}