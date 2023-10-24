import React, {useState} from 'react';
import {View} from 'react-native';
import RadioGroup from 'react-native-radio-buttons-group';
import {styles} from './CustomRadio.styles';

const CustomRadio = ({radioButtonsData, layout, setValue}) => {
  const [radioButtons, setRadioButtons] = useState(radioButtonsData);

  const onPressRadioButton = radioButtonsArray => {
    setRadioButtons(radioButtonsArray);
    const filterRadio = radioButtons.filter(e => e.selected === true);

    setValue(filterRadio[0].label);
  };

  return (
    <View style={styles.container}>
      <RadioGroup
        radioButtons={radioButtons}
        onPress={onPressRadioButton}
        layout={layout}
      />
    </View>
  );
};

export default CustomRadio;
