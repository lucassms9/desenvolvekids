import axios from 'axios';
import { store } from '~/store';
import { Creators } from '~/store/ducks/auth';
import { SERVER_URL } from '~/config/constantes';

const api = axios.create({
  baseURL: SERVER_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async (config) => {
  const state = await store.getState();

  const headers = { ...config.headers };
  console.log(state.auth.user);
  if (state.auth.user) {
    headers.Client = `${state.auth.user.id}`;
  }

  return {
    ...config,
    headers,
  };
});

const errorHandler = ({ response }) => {
  console.tron.log(response);
  if (!response || response.status >= 500) {
    // timeout, internal server error...
    return Promise.reject(Error('Verifique sua conexão com a internet'));
  }
  if (response.status === 401) {
    return store.dispatch(Creators.signOutRequest());
  }
  const { data } = response;
  if (data && 'message' in data) {
    return data;
  }
  return Promise.reject(Error('Erro inesperado'));
};

const successHandler = (response) => {
  const { data, status } = response;
  return data;
};

api.interceptors.response.use(successHandler, errorHandler);

export default api;
