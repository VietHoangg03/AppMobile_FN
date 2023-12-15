import React, {useEffect} from 'react';
import {RootNavigator} from '@navigation/index';
import {LogBox} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import store from './src/redux/store';

const App = () => {
  useEffect(() => {
    LogBox.ignoreAllLogs(true);
  }, []);
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
