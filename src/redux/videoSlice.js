import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {postDataAPI, getDataAPI, patchDataAPI} from '../utils/fetchData';
import Peer from 'react-native-peerjs';
import {getUsers} from '@redux/userSlice';

const videoSlice = createSlice({
  name: 'video',
  initialState: {
    myStream: null,
  },

  reducers: {},

  extraReducers: {
    [getUsers.fulfilled]: (state, action) => {
      state.myStream = action.payload;
    },
  },
});

export const getProfile = createAsyncThunk(
  'user/profile',
  async ({userId, token}, {rejectWithValue}) => {
    try {
      const response = await getDataAPI(`user/${userId}`, token);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        error: 'Could not send this request!',
      });
    }
  },
);
const peerServer = new Peer(undefined, {
  host: '172.30.32.1',
  secure: false,
  port: 5000,
  path: '/mypeer',
});

export const joinRoom = createAsyncThunk(
  'video/join',
  async ({stream}, {rejectWithValue}) => {
    try {
      return stream;
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        error: 'Could not send this request!',
      });
    }
  },
);

export const upload = (uri, type, token) => async dispatch => {
  try {
    const formData = new FormData();

    formData.append('image', {
      uri: uri,
      type: 'image/jpg',
      name: 'new_file',
    });
    const response = await fetch(`${SERVER_URL}upload/${type.toLowerCase()}`, {
      method: 'post',
      body: formData,
      headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json',
        Authorization: token,
      },
    });

    let resJson = await response.json();
    console.log('Url: ', resJson.url);
    return resJson.url;
  } catch (err) {
    console.log(err);
  }
};

const {actions, reducer} = videoSlice;
export const {} = actions;

export default reducer;
