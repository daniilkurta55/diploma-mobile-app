import store from './../redux/store';

export class HttpInterceptor {
  static configure(httpClient) {
    httpClient.interceptors.request.use(this.requestInterceptor);
    httpClient.interceptors.response.use(this.responseInterceptor, this.responseError);
  }

  static requestInterceptor(config) {
    try {
      config.headers['content-type'] = config.headers['content-type']
        || config.headers['Content-Type']
        || 'application/json';

      const token = store.getState().user.token;
      if (token) {
        config.headers['x-access-token'] = token;
      }
      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  static responseInterceptor(response) {
    return response;
  }

  static responseError(error) {
    return Promise.reject(error);
  }
}

