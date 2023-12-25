import React, {useRef} from 'react';
import {View, Text, Image} from 'react-native';

import Video from 'react-native-video';
import VideoPlayer from 'react-native-video-controls';

import {styles} from './Message.styles';
import {images} from '@images';
import {enumMessenger} from '@utils/enum';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '@theme/colors';

export const LeftMessage = ({type, message, time, userName, avatar}) => {
  const video = useRef(null);

  return (
    <View style={styles.left_container}>
      <View style={styles.avatar}>
        <Image source={{uri: avatar}} style={styles.avatarImg} />
      </View>

      {type === enumMessenger.msgType.text && (
        <View style={styles.textLeft}>
          <Text key={userName} style={styles.textValue}>
            {message}
          </Text>
        </View>
      )}

      {type === enumMessenger.msgType.callOff && (
        <View
          style={{
            backgroundColor: colors.gray01,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            padding: 10,
            borderRadius: 10,
          }}>
          <Ionicons name="call" />
          <Text>{userName} ended the call</Text>
        </View>
      )}

      {type === enumMessenger.msgType.image && (
        <View style={styles.image}>
          <Image source={{uri: message}} style={styles.imageMessage} />
        </View>
      )}

      {type === enumMessenger.msgType.file && (
        <View style={styles.video}>
          <VideoPlayer
            source={{uri: message}}
            toggleResizeModeOnFullscreen={false}
            showOnStart={true}
            controlTimeout={999999}
            disableBack
            disableFullscreen
          />
        </View>
      )}

      {type === enumMessenger.msgType.likeIcon && (
        <View style={styles.video}>
          <Image source={images.like_button} style={{height: 47, width: 47}} />
        </View>
      )}
    </View>
  );
};

export const RightMessage = ({type, message, time, userName, avatar}) => {
  const video = useRef(null);

  return (
    <View style={styles.right_container}>
      <View style={styles.containerRightContainer}>
        <View style={styles.message}>
          {type === enumMessenger.msgType.text && (
            <View style={styles.textRight}>
              <Text key={userName} style={styles.textValue}>
                {message}
              </Text>
              {/* <Text>{userName}</Text> */}
              {/* <Text>{time}</Text> */}
            </View>
          )}

          {type === enumMessenger.msgType.image && (
            <View style={styles.image}>
              <Image source={{uri: message}} style={styles.imageMessage} />
            </View>
          )}

          {type === enumMessenger.msgType.callOff && (
            <View
              style={{
                backgroundColor: colors.gray01,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                padding: 10,
                borderRadius: 10,
              }}>
              <Ionicons name="call" />
              <Text>You ended the call</Text>
            </View>
          )}

          {type === enumMessenger.msgType.file && (
            <View style={styles.video}>
              <VideoPlayer
                source={{uri: message}}
                toggleResizeModeOnFullscreen={false}
                showOnStart={true}
                controlTimeout={999999}
                disableBack
                disableFullscreen
              />
            </View>
          )}

          {type === enumMessenger.msgType.likeIcon && (
            <View style={styles.video}>
              <Image
                source={images.like_button}
                style={{height: 47, width: 47}}
              />
            </View>
          )}
        </View>

        <View style={styles.avatar}>
          {/* <Image source={{ uri: avatar }} style={styles.checkedIcon} /> */}
        </View>
      </View>
    </View>
  );
};
