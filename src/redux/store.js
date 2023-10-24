import {
  configureStore,
  applyMiddleware,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import userSlice from './userSlice';
import themeSlice from './themeSlice';
import authSlice from './authSlice';
import storySlice from './storySlice';
import uploadSlice from './uploadSlice';
import messageSlice from './messageSlice';
import conversationSlice from './conversationSlice';
import videoSlice from './videoSlice';
import alertSlice from './alertSlice';
const composedEnhancers = composeWithDevTools();

const appReducer = combineReducers({
  user: userSlice,
  theme: themeSlice,
  auth: authSlice,
  story: storySlice,
  upload: uploadSlice,
  message: messageSlice,
  conversation: conversationSlice,
  // video: videoSlice,
  alert: alertSlice,
});

const rootReducer = (state, action) => {
  if (action.type === 'auth/logout/fulfilled') {
    return appReducer(undefined, action);
  }

  return appReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
  composedEnhancers,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
