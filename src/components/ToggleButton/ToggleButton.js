import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {colors} from '@theme/colors';

import {styles} from './ToggleButton.styles';

const ToggleButton = ({fields, btnPressed}) => {
  return (
    <View style={styles.container}>
      {fields.map(item => (
        <TouchableOpacity
          style={[
            styles.btn,
            {backgroundColor: item.isActive ? colors.gray01 : colors.white},
          ]}
          key={item.id}
          onPress={() => btnPressed(item)}>
          <Text
            style={
              item.isActive ? styles.btnLabelActicve : styles.btnLabelInacticve
            }>
            {item.name}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ToggleButton;
