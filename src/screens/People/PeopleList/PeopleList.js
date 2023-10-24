import React from 'react';
import {View, Text, FlatList, Image} from 'react-native';
import {images} from '@images';
import {styles} from './PeopleList.styles';

const PeopleList = ({data}) => {
  const renderPeople = ({item}) => (
    <View style={styles.rowContainer} key={item.id}>
      <View style={styles.rowLeft}>
        <Image style={styles.peopleIcon} source={item.image} />
        <Text style={styles.label1}>{item.name}</Text>
        <Text style={styles.timeTag}>8 min</Text>
      </View>
      <Image style={styles.waveIcon} source={images.wave} />
    </View>
  );

  return <View>{data.map(item => renderPeople({item}))}</View>;
};

export default PeopleList;
