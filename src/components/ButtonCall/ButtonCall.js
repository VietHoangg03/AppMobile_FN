import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export function ButtonCall({style, onPress, backgroundColor, iconName}) {
  return (
    <View>
      <TouchableOpacity
        onPress={() => onPress(true)}
        style={[{backgroundColor: backgroundColor}, style, styles.button]}>
        <MaterialIcons name={iconName} size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    padding: 10,
    margin: 10,
    borderRadius: 100,
    width: 50,
    height: 50,
  },
});
