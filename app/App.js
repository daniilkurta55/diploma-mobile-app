import React, {Component} from 'react';
import store from './redux/store';
import {Provider} from 'react-redux';
import axios from 'axios';
import {HttpInterceptor} from './axios/httpInterceptor';
import Router from './router';
import {Root} from 'native-base';

HttpInterceptor.configure(axios);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Root>
          <Router/>
        </Root>
      </Provider>
    );
  }
}
