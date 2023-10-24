import React from 'react';
import {
  ImageBackground,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {images} from '@images';
import {defaultAvatarGroupChat} from '@redux/conversationSlice';
import {styles} from './styles';

const OutgoingCall = () => {
  return (
    <ImageBackground
      source={{uri: 'https://i.redd.it/yspucsz7d4a61.jpg'}}
      style={styles.container}>
      {/* Header */}
      <View style={styles.header}></View>

      {/* Body */}
      <View style={styles.body}>
        <View style={styles.bodyContainer}>
          <Image source={{uri: defaultAvatarGroupChat}} style={styles.avatar} />

          <Text style={styles.nameOfUser}>Whom you are calling</Text>

          <Text style={styles.stateCalling}>Calling...</Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.otherButtons}>
          <Ionicons name="md-person-add" style={styles.otherButtonIcons} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.otherButtons}>
          <Ionicons name="md-volume-low" style={styles.otherButtonIcons} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.otherButtons}>
          <Ionicons name="md-mic" style={styles.otherButtonIcons} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.endCallButton}>
          <Image
            source={images.phone_hangup}
            style={styles.endCallButtonIcon}
          />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default OutgoingCall;
