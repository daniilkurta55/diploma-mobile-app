import axios from 'axios';
import {config} from './../../../config';

export class TransactionsServices {

  getUsers(id) {
    return axios.get(`${config.api.baseApiUrl}/users/${id}/receivers`);
  }

  createTransaction(body) {
    return axios.post(`${config.api.baseApiUrl}/transactions`, body);
  }

  getTransactions(type, id) {
    return axios.get(`${config.api.baseApiUrl}/transactions/${type}/${id}`);
  }
}