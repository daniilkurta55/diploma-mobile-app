import {config} from './config';
import axios from 'axios';
import store from './redux/store';
import {setAuth} from './redux/actions';
import rs from 'jsrsasign';
import {AsyncStorage} from 'react-native';

export function login(login, password) {
  const apiUrl = `${config.api.baseApiUrl}/login`;
  const body = {
    login: login,
    password: password
  };
  return new Promise((resolve, reject) => {
    axios.post(apiUrl, body, {
      headers: {
        'content-type': 'application/json'
      }
    }).then(async (data) => {
      if (data.data.auth) {
        store.dispatch(setAuth({id: data.data.user.id, login: data.data.user.login, token: data.data.user.token}));
        resolve(true);
      } else {
        reject('Wrong login or password');
      }
    }).catch((error) => {
      console.log(error);
      reject(error);
    });
  })
}

export async function generateKeyPair() {
  const keyPair = rs.KEYUTIL.generateKeypair('RSA', 2048);
  const privatePem = rs.KEYUTIL.getPEM(keyPair.prvKeyObj, 'PKCS1PRV');
  const publicPem = rs.KEYUTIL.getPEM(keyPair.pubKeyObj);
  await AsyncStorage.setItem('privatePem', privatePem);

  return publicPem;
}

export async function sign(base64) {
  try {
    const privateKey = rs.KEYUTIL.getKey(await AsyncStorage.getItem('privatePem'), 'PKCS1PRV');
    const sign = new rs.Signature({alg: 'SHA512withRSA'});
    sign.init(privateKey);
    sign.updateString(base64);
    const signHex = sign.sign();

    return signHex;
  } catch (error) {
    throw (error);
  }
}
