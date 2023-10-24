import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

const alertSlice = createSlice({
  name: 'alert',

  initialState: {
    loading: false,
    loginError: '',
    registerError: '',
    uploadError: '',
    forgotError: '',
    otpError: '',
  },

  reducers: {
    setAlert: (state, action) => {
      const {type, msg} = action.payload;
      switch (type) {
        case 'register':
          state.registerError = msg;
          break;
        case 'login':
          state.loginError = msg;
          break;
        case 'upload':
          state.uploadError = msg;
          break;
        case 'forgotPassword':
          state.forgotError = msg;
        case 'otp':
          state.otpError = msg;
        default:
          break;
      }
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },

  extraReducers: {},
});

const {actions, reducer} = alertSlice;
export const {setAlert, setLoading} = actions;
export default reducer;
