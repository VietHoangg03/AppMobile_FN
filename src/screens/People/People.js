import React from 'react';
import {View, Text, SafeAreaView, ScrollView} from 'react-native';

import {styles} from './People.styles';
import SearchBox from '@components/SearchBox/SearchBox';
import Header from '@components/Header/Header';
import {images} from '@images';
import AddYourStory from './AddYourStory/AddYourStory';
import PeopleList from './PeopleList/PeopleList';

const DATA1 = [
  {id: 1, image: images.people1, name: 'Martha Craig'},
  {id: 2, image: images.people2, name: 'Kieron Dotson'},
  {id: 3, image: images.people3, name: 'Zack John'},
  {id: 4, image: images.people4, name: 'Jamie Franco'},
  {id: 5, image: images.people5, name: 'Tabitha Potter'},
  {id: 6, image: images.people2, name: 'Kieron Dotson'},
  {id: 7, image: images.people3, name: 'Zack John'},
  {id: 8, image: images.people4, name: 'Jamie Franco'},
  {id: 9, image: images.people5, name: 'Tabitha Potter'},
];
const DATA2 = [
  {id: 1, image: images.people1, name: 'Martha Craig'},
  {id: 2, image: images.people2, name: 'Kieron Dotson'},
  {id: 3, image: images.people3, name: 'Zack John'},
  {id: 4, image: images.people4, name: 'Jamie Franco'},
  {id: 5, image: images.people5, name: 'Tabitha Potter'},
  {id: 6, image: images.people2, name: 'Kieron Dotson'},
  {id: 7, image: images.people3, name: 'Zack John'},
  {id: 8, image: images.people4, name: 'Jamie Franco'},
  {id: 9, image: images.people5, name: 'Tabitha Potter'},
];

const People = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header
        heading="People"
        icon1={images.add_contact}
        icon2={images.requests}
      />
      <SearchBox />
      <AddYourStory />
      <ScrollView>
        <PeopleList data={DATA1} />
        <Text style={styles.label1}>Recently active</Text>
        <PeopleList data={DATA2} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default People;
