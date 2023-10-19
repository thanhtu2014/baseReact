/* eslint-disable */
import axios from 'axios';
import { ENV, ROUTES, StorageKey } from '@/constants';
import { getAuthUser, getLocalRefreshToken, updateLocalAccessToken } from '@/utils/localStorageUtil';
import { parse } from '@/utils';
import { API } from './constants/api';

const http = axios.create({
  baseURL: ENV.API_BASE_URL,
  headers: {
    // Accept: 'application/json',
    // 'Content-Type': 'application/json',
    // 'X-Requested-With': 'XMLHttpRequest',
  },
});

http.interceptors.request.use(
  (config) => {
    const authUser = getAuthUser();
    if (authUser) {
      config.headers.Authorization = `Bearer ${authUser.access}`;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

http.interceptors.response.use(
  (res) => res,
  async (error) => {
    // console.clear();
    // if (error.response?.status === 500) {
    //   window.location.href = ROUTES.SERVER_ERROR;
    //   return null;
    // }
    const originalConfig = error.config;
    if (originalConfig.url === API.AUTH.REFRESH_TOKEN) {
      localStorage.removeItem(StorageKey.authUser);
      window.location.href = ROUTES.LOGIN_PATH;
    }
    if (originalConfig.url !== API.AUTH.LOGIN && error.response) {
      // Access Token was expired
      if (
        !originalConfig.retry &&
        (error.response.status === 401)
      ) {
        originalConfig.retry = true;
        try {
          const payload = parse.snakelize({ refresh: getLocalRefreshToken() });
          const rs = await http.post(API.AUTH.REFRESH_TOKEN, payload);

          const { access } = parse.camelize(rs.data);

          updateLocalAccessToken(access);

          return http(originalConfig);
        } catch (_error) {
          return Promise.reject(_error);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default http;
