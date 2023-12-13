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

const IncomingCall = ({join, hangup, remoteInfo}) => {
  return (
    <ImageBackground
      source={{
        uri: 'https://i.pinimg.com/originals/7c/41/54/7c41548692101432c4a23f77d896a24d.jpg',
      }}
      style={styles.container}>
      {/* Header */}
      <View style={styles.header} />

      {/* Body */}
      {remoteInfo && (
        <View style={styles.background}>
          <Image source={{uri: remoteInfo.avatar}} />
          <Text style={{color: '#000'}}>
            {remoteInfo.fullName} is calling...
          </Text>
        </View>
      )}

      {/* Footer */}
      <View style={styles.footerIncoming}>
        <TouchableOpacity style={styles.buttonIncoming}>
          <Image
            source={images.incomingDecline}
            style={styles.incomingButtonImg}
          />
          <Text onPress={hangup} style={styles.incomingButtonText}>
            DECLINE
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonIncoming}>
          <Image
            source={images.incomingAccept}
            style={styles.incomingButtonImg}
          />
          <Text onPress={join} style={styles.incomingButtonText}>
            ACCEPT
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default IncomingCall;
