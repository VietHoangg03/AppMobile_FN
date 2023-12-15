import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {deleteDataAPI, postDataAPI} from '../utils/fetchData';
import {uploadFile} from './uploadSlice';
import {getUsers, updateStoryUser} from './userSlice';

export const createStory = createAsyncThunk(
  'user/createStory',
  async ({userId, content, type, token}, {rejectWithValue, dispatch}) => {
    try {
      const url = await uploadFile(content);

      const response = await postDataAPI(
        'user/story',
        {content: url, type: type},
        token,
      );

      dispatch(getUsers(token));

      return {
        userId,
        story: response.data.story,
      };
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        error: 'Could not send this request!',
      });
    }
  },
);

export const deleteStory = createAsyncThunk(
  'user/deleteStory',
  async ({userId, storyId, token}, {rejectWithValue, dispatch}) => {
    try {
      const response = await deleteDataAPI(`user/story/${storyId}`, token);
      dispatch(updateStoryUser({userId, storyId}));
      return {deleteStoryMsg: response.data, userId, storyId};
    } catch (error) {
      console.log(error);
      return rejectWithValue({
        error: 'Could not send this request!',
      });
    }
  },
);

const storySlice = createSlice({
  name: 'story',
  initialState: {
    storiesExist: [],
  },
  reducers: {
    getStoriesExist(state, action) {
      state.storiesExist = action.payload;
    },
    removeStoriesExist(state, action) {
      state.storiesExist = state.storiesExist.filter(
        e => e._id !== action.payload._id,
      );
    },
  },
  extraReducers: {
    [createStory.fulfilled]: (state, action) => {
      state.storiesExist = state.storiesExist.map(e => {
        if (e._id === action.payload.userId) {
          return {
            ...e,
            stories: [...e.stories, action.payload.story],
          };
        } else {
          return e;
        }
      });
    },
    [deleteStory.fulfilled]: (state, action) => {
      state.storiesExist = state.storiesExist.map(e => {
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
});

const {actions, reducer} = storySlice;
export const {getStoriesExist, removeStoriesExist} = actions;

export default reducer;
