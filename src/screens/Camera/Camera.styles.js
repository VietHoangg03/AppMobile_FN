import React from 'react';
import {StyleSheet} from 'react-native';
import {colors} from '@theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  headerButton: {
    marginTop: 24,
    marginHorizontal: 16,
  },
  buttonContainer: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    margin: 20,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  buttonIcon: {
    fontSize: 50,
    color: colors.white,
  },
});
