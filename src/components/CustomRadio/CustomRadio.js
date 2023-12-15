import React, {useState} from 'react';
import {View} from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import {styles} from './CustomRadio.styles';

const CustomRadio = ({radioButtonsData, layout, setValue}) => {
  const [selectedId, setSelectedId] = useState();
  const onPressRadioButton = e => {
    setSelectedId(e);
    setValue(radioButtonsData.find(d => d.id === e).label);
  };

  return (
    <View style={styles.container}>
      <RadioGroup
        radioButtons={radioButtonsData}
        onPress={onPressRadioButton}
        selectedId={selectedId}
        layout={layout}
      />
    </View>
  );
};

export default CustomRadio;
