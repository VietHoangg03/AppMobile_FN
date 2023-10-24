import React, {useEffect} from 'react';
import {View, Dimensions, ScrollView} from 'react-native';

import {RTCView, mediaDevices} from 'react-native-webrtc';
import {useDispatch, useSelector} from 'react-redux';
import {joinRoom} from '../redux/videoSlice';

const {width, height} = Dimensions.get('window');

const VideoScreen = () => {
  const dispatch = useDispatch();
  const myStream = useSelector(state => state.video.myStream);

  useEffect(() => {
    let isFront = true;
    mediaDevices.enumerateDevices().then(sourceInfos => {
      let videoSourceId;
      for (let i = 0; i < sourceInfos.length; i++) {
        const sourceInfo = sourceInfos[i];
        if (
          sourceInfo.kind == 'videoinput' &&
          sourceInfo.facing == (isFront ? 'front' : 'environment')
        ) {
          videoSourceId = sourceInfo.deviceId;
        }
      }
      mediaDevices
        .getUserMedia({
          audio: false,
          video: {
            mandatory: {
              minWidth: 500,
              minHeight: 300,
              minFrameRate: 30,
            },
            facingMode: isFront ? 'user' : 'environment',
            optional: videoSourceId ? [{sourceId: videoSourceId}] : [],
          },
        })
        .then(stream => {
          dispatch(joinRoom(stream));
        })
        .catch(error => {
          console.log(error);
        });
    });
  }, [mediaDevices]);

  return (
    <View>
      {myStream ? (
        <RTCView
          streamURL={myStream.toURL()}
          style={{width, height: height * 0.4}}
        />
      ) : null}
    </View>
  );
};

export default VideoScreen;
