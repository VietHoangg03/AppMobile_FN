import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {getDataAPI, patchDataAPI} from '../utils/fetchData';

export const getUsers = createAsyncThunk(
  'user/getUsers',
  async (token, {rejectWithValue}) => {
    try {
      const response = await getDataAPI(`user`, token);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        error: 'Could not send this request!',
      });
    }
  },
);

export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  async ({userId, profile, token}, {rejectWithValue, dispatch}) => {
    try {
      const response = await patchDataAPI(`user`, profile, token);
      return {
        newProfile: response.data.newUser,
        userId,
      };
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        error: 'Could not send this request!',
      });
    }
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    users: [],
  },
  reducers: {
    updateStoryUser: (state, action) => {
      state.users = state.users.map(e => {
        if (e._id === action.payload.userId) {
          return {
            ...e,
            stories: e.stories.filter(
              story => story._id !== action.payload.storyId,
            ),
          };
        } else {
          return e;
        }
      });
    },
  },
  extraReducers: {
    [getUsers.fulfilled]: (state, action) => {
      const mapStories = action.payload.map(e => ({
        ...e,
        stories: e.stories.map(el => ({
          ...el,
          finish: 0,
        })),
      }));

      state.users = mapStories;
    },
    [updateProfile.fulfilled]: (state, action) => {
      state.users = state.users.map(e => {
        if (e._id === action.payload.userId) {
          return action.payload.newProfile;
        } else {
          return e;
        }
      });
    },
  },
});

const {actions, reducer} = userSlice;
export const {updateStoryUser} = actions;

export default reducer;
