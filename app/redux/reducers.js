import {SET_AUTH, SET_LOADING, SET_REFRESHING} from './actions';

const initialState = {
  loadingObj: {
    loading: false,
    loaderText: null
  },
  loaderText: null,
  refreshing: false,
  user: {
    login: null,
    token: null,
    id: null
  }
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_LOADING:
      return Object.assign({}, state, {
        loadingObj: {
          loading: action.loadingObj.loading,
          loaderText: action.loadingObj.loaderText
        }
      });
    case SET_AUTH:
      return Object.assign({}, state, {
        user: {...state.user, ...action.auth}
      });
    case SET_REFRESHING:
      return Object.assign({}, state, {
        refreshing: action.refreshing
      });
    default:
      return Object.assign({}, state);
  }
}
