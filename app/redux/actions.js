export const SET_LOADING = 'SET_LOADING';
export const SET_AUTH = 'SET_AUTH';
export const SET_REFRESHING = 'SET_REFRESHING';


export function setLoading(loading, loaderText) {
  return {
    type: SET_LOADING,
    loadingObj: {
      loading: loading,
      loaderText: loaderText
    }
  };
}

export function setAuth(auth) {
  return {
    type: SET_AUTH,
    auth: auth
  };
}

export function setRefreshing(refreshing) {
  return {
    type: SET_REFRESHING,
    refreshing: refreshing
  };
}
