import {Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {styles} from './UserCard.styles';

const UserCard = ({user, navigation, setSearch}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.navigate('Profile', {
          otherUser: user,
        });
        setSearch('');
      }}>
      <Image source={{uri: user.avatar}} style={styles.userAvatar} />

      <Text style={styles.userName}>{user.fullName}</Text>
    </TouchableOpacity>
  );
};

export default UserCard;
