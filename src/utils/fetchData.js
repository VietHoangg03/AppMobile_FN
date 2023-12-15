import axios from 'axios';
import {SERVER_URL} from './ip';

const instance = axios.create({
  baseURL: SERVER_URL + '/api/',
});

export const getDataAPI = async (url, token) => {
  const res = await instance.get(url, {
    headers: {Authorization: token},
  });
  return res;
};

export const postDataAPI = async (url, data, token) => {
  const res = await instance.post(url, data, {
    headers: {Authorization: token},
  });

  return res;
};

export const putDataAPI = async (url, data, token) => {
  const res = await instance.put(url, data, {
    headers: {Authorization: token},
  });
  return res;
};

export const patchDataAPI = async (url, data, token) => {
  const res = await instance.patch(url, data, {
    headers: {Authorization: token},
  });
  return res;
};

export const deleteDataAPI = async (url, token) => {
  const res = await instance.delete(url, {
    headers: {Authorization: token},
  });
  return res;
};
