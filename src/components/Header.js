import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {colors} from '@constants/index';

export default function Header(props) {
  return <Text style={styles.header} {...props} />;
}

const styles = StyleSheet.create({
  header: {
    fontSize: 21,
    color: colors.primary,
    fontWeight: 'bold',
    paddingVertical: 12,
  },
});
