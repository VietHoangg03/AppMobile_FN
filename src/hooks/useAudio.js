import {uploadFile} from '@redux/uploadSlice';
import axios from 'axios';
import {useState} from 'react';
import {Platform} from 'react-native';
import AudioRecorderPlayer, {
  AVEncoderAudioQualityIOSType,
  AVEncodingOption,
  AudioEncoderAndroidType,
  AudioSourceAndroidType,
} from 'react-native-audio-recorder-player';
import RNFetchBlob from 'rn-fetch-blob';

const audioRecorderPlayer = new AudioRecorderPlayer();
audioRecorderPlayer.setSubscriptionDuration(0.09);

const useAudio = () => {
  const [state, setState] = useState({
    isLoggingIn: false,
    recordSecs: 0,
    recordTime: '00:00:00',
    currentPositionSec: 0,
    currentDurationSec: 0,
    playTime: '00:00:00',
    duration: '00:00:00',
  });
  const dirs = RNFetchBlob.fs.dirs;

  const generateFileName = () => {
    return 'hello';
  };

  const onStartRecord = async () => {
    const path = Platform.select({
      android: `${dirs.CacheDir}/${generateFileName()}.mp3`,
    });
    const audioSet = {
      AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
      AudioSourceAndroid: AudioSourceAndroidType.MIC,
      AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
      AVNumberOfChannelsKeyIOS: 2,
      AVFormatIDKeyIOS: AVEncodingOption.aac,
    };
    const uri = await audioRecorderPlayer.startRecorder(path, audioSet, false);

    audioRecorderPlayer.addRecordBackListener(e => {
      setState(currentState => ({
        ...currentState,
        recordSecs: e.currentPosition,
        recordTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
      }));
    });
    const apiUrl = 'https://api.cloudinary.com/v1_1/ddxermrbe/upload';
    const uploadPreset = 'r3gh4fir'; // Replace with your Cloudinary upload preset

    const data = new FormData();
    data.append('file', {
      uri: uri,
      name: 'audio.mp3',
      type: 'audio/mp3',
    });
    data.append('upload_preset', uploadPreset);

    try {
      const response = await RNFetchBlob.fetch(
        'POST',
        apiUrl,
        {
          'Content-Type': 'multipart/form-data',
        },
        JSON.stringify(data),
      );
      console.log(response);

      if (response.respInfo.status === 200) {
        const cloudinaryData = response.json();
        console.log('Upload successful:', cloudinaryData);
        // Handle Cloudinary response here
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('Error uploading to Cloudinary:', error);
      // Handle upload error
    }
  };
  const onStopRecord = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    audioRecorderPlayer.removeRecordBackListener();
    setState(currentState => ({
      ...currentState,
      recordSecs: 0,
    }));
    console.log(result);
  };

  const onStartPlay = async e => {
    const path = Platform.select({
      android: `${dirs.CacheDir}/${generateFileName()}.mp3`,
    });
    const msg = await audioRecorderPlayer.startPlayer(path);
    audioRecorderPlayer.setVolume(1.0);
    console.log(msg);
    audioRecorderPlayer.addPlayBackListener(e => {
      if (e.currentPosition === e.duration) {
        console.log('finished');
        audioRecorderPlayer.stopPlayer();
      }
      setState(currentState => ({
        ...currentState,
        currentPositionSec: e.currentPosition,
        currentDurationSec: e.duration,
        playTime: audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)),
        duration: audioRecorderPlayer.mmssss(Math.floor(e.duration)),
      }));
    });
  };

  const onPausePlay = async e => {
    await audioRecorderPlayer.pausePlayer();
  };

  return [state, onStartRecord, onStopRecord, onStartPlay, onPausePlay];
};

export default useAudio;
