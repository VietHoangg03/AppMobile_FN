import React, {useState, useEffect, useRef} from 'react';
import {View, Text, TouchableOpacity, Dimensions} from 'react-native';
// import {RNCamera} from 'react-native-camera';
// import { Audio } from "expo-av";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {colors} from '@theme/colors';
import {styles} from './Camera.styles';

export default function Camera({navigation, route}) {
  const {setImage, setVideoUri} = route.params;

  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(RNCamera.Constants.Type.back);
  const [isRatioSet, setIsRatioSet] = useState(false);
  const [camera, setCamera] = useState(null);
  const [recording, setRecording] = useState(false);

  // useEffect(() => {
  //   (async () => {
  //     const {status} = await RNCamera.requestCameraPermissionsAsync();
  //     setHasPermission(status === 'granted');
  //   })();
  // }, []);

  // if (hasPermission === null) {
  //   return <View />;
  // }
  // if (hasPermission === false) {
  //   return <Text>No access to camera</Text>;
  // }

  const takePicture = async () => {
    if (camera) {
      const options = {quality: 0.5, base64: true};
      const data = await camera.takePictureAsync(options);
      onPictureSaved(data);
    }
  };

  const onPictureSaved = photo => {
    setImage(photo.uri);
    navigation.navigate('Chat');
  };

  const onVideoRecordPress = async () => {
    // await Audio.requestPermissionsAsync();
    if (!recording) {
      setRecording(true);
      let video = await camera.recordAsync();
      setVideoUri(video.uri);
      console.log(video.uri);
      navigation.navigate('Chat');
    } else {
      setRecording(false);
      camera.stopRecording();
    }
    console.log('Is recording: ', recording);
  };

  return (
    <View style={styles.container}>
      <RNCamera
        captureAudio={false}
        style={styles.camera}
        type={'Back'}
        ref={ref => setCamera(ref)}
        ratio={'18:9'}>
        <View style={styles.headerButton}>
          <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
            <AntDesign name="close" style={{fontSize: 40}} />
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <TouchableOpacity
              onPress={() => {
                setType(
                  type === RNCamera.Constants.Type.back
                    ? RNCamera.Constants.Type.front
                    : RNCamera.Constants.Type.back,
                );
              }}>
              <MaterialIcons
                name="flip-camera-android"
                style={styles.buttonIcon}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.button}>
            <TouchableOpacity onPress={takePicture}>
              <Ionicons name="radio-button-on" style={styles.buttonIcon} />
            </TouchableOpacity>
          </View>
          <View style={styles.button}>
            <TouchableOpacity onPress={onVideoRecordPress}>
              <AntDesign
                name="videocamera"
                style={{
                  fontSize: 50,
                  color: recording ? colors.redColor : colors.white,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </RNCamera>
    </View>
  );
}
