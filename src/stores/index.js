import {configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
const composedEnhancers = composeWithDevTools();

const appReducer = combineReducers({
  // user: userSlice,
  //   theme: themeSlice,
  //   alert: alertSlice,
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
