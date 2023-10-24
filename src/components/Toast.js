import React from 'react';
import {Snackbar} from 'react-native-paper';
import {StyleSheet, View, Text, StatusBar} from 'react-native';
import {colors} from '@constants/index';

export default function Toast({type = 'error', message, onDismiss}) {
  return (
    <View style={styles.container}>
      <Snackbar
        visible={!!message}
        duration={3000}
        onDismiss={onDismiss}
        style={{
          backgroundColor: type === 'error' ? colors.error : colors.success,
        }}>
        <Text style={styles.content}>{message}</Text>
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50 + StatusBar.currentHeight,
    width: '100%',
  },
  content: {
    fontWeight: '500',
    color: colors.secondary,
  },
});
