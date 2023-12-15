import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {postDataAPI} from '../utils/fetchData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {addUser} from './userSlice';
import {setAlert, setLoading} from './alertSlice';

export const register = createAsyncThunk(
  'auth/register',
  async (info, {rejectWithValue, dispatch}) => {
    try {
      const res = await postDataAPI('auth/register', info);

      await AsyncStorage.setItem('@user_token', res.data.access_token);

      await AsyncStorage.setItem('@id', res.data.user._id);

      return res.data;
    } catch (err) {
      const {data} = err.response;
      console.log(err);
      if (data && data.msg) {
        dispatch(setAlert({type: 'register', msg: data.msg}));
      }
    }
  },
);

export const login = createAsyncThunk(
  'auth/login',
  async (info, {dispatch}) => {
    try {
      dispatch(setLoading(true));

      const res = await postDataAPI('auth/login', info);

      await AsyncStorage.setItem('@user_token', res.data.access_token);

      await AsyncStorage.setItem('@id', res.data.user._id);

      dispatch(setLoading(false));

      return res.data;
    } catch (err) {
      dispatch(setLoading(false));
      const {data} = err.response;
      if (data && data.msg) {
        dispatch(setAlert({type: 'login', msg: data.msg}));
      }
    }
  },
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (info, {rejectWithValue}) => {
    try {
      await postDataAPI('auth/logout');

      await AsyncStorage.removeItem('@user_token');
    } catch (err) {
      console.log(err);
    }
  },
);

const authSlice = createSlice({
  name: 'auth',

  initialState: {
    email: '',
    id: '',
    token: '',
  },

  reducers: {
    isAuthenticated: (state, action) => {
      const {access_token, id} = action.payload;

      state.token = access_token;
      state.id = id;
    },
  },

  extraReducers: {
    [login.fulfilled]: (state, action) => {
      const {email, _id} = action.payload.user;
      const {access_token} = action.payload;

      state.token = access_token;
      state.email = email;
      state.id = _id;
    },
    [login.rejected]: (state, action) => {},
    [logout.fulfilled]: (state, action) => {
      state.token = '';
      state.email = '';
      state.id = '';
    },
    [register.fulfilled]: (state, action) => {
      const {email, _id} = action.payload.user;
      const {access_token} = action.payload;

      state.token = access_token;
      state.email = email;
      state.id = _id;
    },
    [register.rejected]: (state, action) => {
      if (action.payload.error) {
        state.error = action.payload.error;
      }
    },
  },
});

const {actions, reducer} = authSlice;
export const {isAuthenticated} = actions;
export default reducer;
