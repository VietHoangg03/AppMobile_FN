import {View, Text, TextInput} from 'react-native';
import React from 'react';
import {styles} from './CustomInput.styles';

const CustomInput = ({
  value,
  setValue,
  placeholder,
  secureTextEntry,
  handleBlur,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        onEndEditing={handleBlur}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

export default CustomInput;
