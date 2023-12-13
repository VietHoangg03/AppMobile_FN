import {createSlice} from '@reduxjs/toolkit';
import getTheme from '../utils/getTheme';

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    isDark: getTheme,
  },
  reducers: {
    editTheme(state, action) {
      return { ...state, isDark: action.payload };
    },
  },
});

const { actions, reducer } = themeSlice;
export const { editTheme } = actions;
export default reducer;
