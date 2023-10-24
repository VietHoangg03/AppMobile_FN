import {
  RTCPeerConnection,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStream,
  MediaStreamTrack,
  mediaDevices,
  registerGlobals,
} from 'react-native-webrtc';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import React, {useEffect, useRef, useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {ButtonCall} from '@components/ButtonCall/ButtonCall';
import ReceiveCall from './ReceiveCall';
// import {axiosAuth, getAvatarUrl, socket} from '@libs';
import {useDispatch, useSelector} from 'react-redux';
// import {Avatar, Spinner} from 'native-base';
import {socket} from '@utils/socket';

const configuration = {
  iceServers: [
    // {url: 'stun:stun.stunprotocol.org:3478'},
    {url: 'stun:stun.l.google.com:19302'},
    {
      url: 'turn:numb.viagenie.ca',
      credential: 'muazkh',
      username: 'webrtc@live.com',
    },
  ],
};

const getStream = async () => {
  try {
    let isFront = true;
    const sourceInfos = await mediaDevices.enumerateDevices();
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

    const stream = await mediaDevices.getUserMedia({
      audio: true,
      video: {
        width: 640,
        height: 480,
        frameRate: 30,
        facingMode: isFront ? 'user' : 'environment',
        deviceId: videoSourceId,
      },
    });

    return stream;
  } catch (error) {
    console.log(error);
  }
};

export function WebRTCCall({route, navigation}) {
  const sender = route.params.sender;
  const receiver = route.params.receiver;
  const sdp = route.params.sdp;
  const isCaller = !sdp;
  const conversationId = route.params.conversationId;
  const isVideoCall = route.params.isVideoCall;

  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [receivingCall, setReceivingCall] = useState(!isCaller);
  const [isMic, setIsMic] = useState(true);
  const [isCamera, setIsCamera] = useState(isVideoCall);
  const [isRemoteMic, setIsRemoteMic] = useState(true);
  const [isRemoteCamera, setIsRemoteCamera] = useState(isVideoCall);
  const [remoteInfo, setRemoteInfo] = useState(receiver);
  const pc = useRef();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const getRemoteInfo = async () => {
  //     try {
  //       const res = await axiosAuth.get(`/user/${receiver}/info`);
  //       setRemoteInfo(res.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getRemoteInfo();
  // }, [isCaller]);

  useEffect(() => {
    if (isCaller) {
      create();
    }

    socket.on('video-call-stop', ({sender, receiver, conversationId}) => {
      navigation.navigate('Chat');
    });

    socket.on('video-call-answer', async ({sender, receiver, answer}) => {
      try {
        if (pc.current && answer && !pc.current.remoteDescription) {
          const test = pc.current.setRemoteDescription(
            new RTCSessionDescription(answer),
          );
        }
      } catch (error) {
        console.log('remote error', error);
      }
    });

    socket.on('video-call-candidate', ({sender, receiver, candidate}) => {
      if (pc.current) {
        pc.current.addIceCandidate(new RTCIceCandidate(candidate));
      }
    });

    socket.on('video-call-media-active', ({mic, camera}) => {
      setIsRemoteCamera(camera);
      setIsRemoteMic(mic);
    });

    return () => {
      cleanUp();
    };
  }, [socket]);

  const sendToPeer = (messageType, payload) => {
    socket.emit(messageType, {
      sender: sender,
      receiver: receiver,
      payload,
      isCaller,
    });
  };

  const setupWebrtc = async () => {
    pc.current = new RTCPeerConnection(configuration);
    const stream = await getStream();
    setLocalStream(stream);

    console.log('LOCAL received the stream call', stream);

    pc.current.addStream(stream);

    pc.current.onaddstream = e => {
      if (e.stream && remoteStream !== e.stream) {
        console.log('RemotePC received the stream call', e.stream);
        setRemoteStream(e.stream);
      }
    };
  };

  const collectIceCandidates = () => {
    if (pc.current) {
      pc.current.onicecandidate = event => {
        if (event.candidate) {
          sendToPeer('video-call-candidate', event.candidate);
          // send event.candidate to peer
          //......
        }
      };
      pc.current.onicecandidateerror = error => {
        console.log('candidate error:', error);
      };
    }
  };

  const create = async () => {
    try {
      await setupWebrtc();

      collectIceCandidates();

      if (pc.current) {
        const offer = await pc.current.createOffer();
        await pc.current.setLocalDescription(offer);

        socket.emit('video-call-start', {
          sender: sender,
          receiver: receiver,
          conversationId: conversationId,
          offer,
          isVideoCall,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const join = async () => {
    console.log('Joining the call');
    setReceivingCall(false);
    const offer = sdp;
    if (offer) {
      try {
        await setupWebrtc();

        collectIceCandidates();

        if (pc.current && !pc.current.localDescription && offer) {
          const test = pc.current.setRemoteDescription(
            new RTCSessionDescription(offer),
          );
          const answer = await pc.current.createAnswer();
          await pc.current.setLocalDescription(answer);
          sendToPeer('video-call-answer', answer);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const hangup = () => {
    cleanUp();

    socket.emit('video-call-stop', {
      sender: sender,
      receiver: receiver,
      conversationId: conversationId,
      isCaller: isCaller,
    });
    navigation.navigate('Chat');
  };

  const mute = () => {
    setIsMic(!isMic);
    socket.emit('video-call-media-active', {
      receiver: receiver,
      mic: !isMic,
      camera: isCamera,
    });
  };

  const hideCamera = () => {
    setIsCamera(!isCamera);
    socket.emit('video-call-media-active', {
      receiver: receiver,
      camera: !isCamera,
      mic: isMic,
    });
  };

  const cleanUp = () => {
    if (localStream) {
      localStream.getTracks().forEach(t => t.stop());
      localStream.release();
    }
    if (pc.current) {
      pc.current.close();
    }

    socket.off('video-call-stop');
    socket.off('video-call-offer');
    socket.off('video-call-answer');
    socket.off('video-call-candidate');
    socket.off('video-call-media-active');

    setReceivingCall(false);
    setLocalStream(null);
    setRemoteStream(null);
  };

  if (receivingCall) {
    return <ReceiveCall remoteInfo={remoteInfo} hangup={hangup} join={join} />;
  }

  return (
    <View style={styles.container}>
      <View style={[styles.localVideo, styles.video]}>
        {!localStream || !isCamera ? (
          <View
            style={{
              marginTop: 70,
              alignSelf: 'center',
              justifyContent: 'center',
            }}>
            {/* <Avatar
              size="50px"
              source={{
                uri: sender.avatar,
              }}
              style={{marginBottom: 15}}
            /> */}
            <Text style={{color: '#fff'}}>You</Text>
          </View>
        ) : (
          <RTCView
            objectFit="cover"
            style={{
              width: '100%',
              height: '100%',
            }}
            streamURL={localStream && localStream.toURL()}
          />
        )}
      </View>
      <View style={[styles.video, styles.remoteVideo]}>
        {!remoteStream || !isRemoteCamera ? (
          <View style={styles.center}>
            {remoteInfo && (
              <View
                style={{
                  flexDirection: 'column',
                  alignContent: 'center',
                  justifyContent: 'center',
                }}>
                <Image
                  source={{
                    uri: remoteInfo.avatar,
                  }}
                  style={{
                    alignSelf: 'center',
                    width: 80,
                    height: 80,
                    borderRadius: 100,
                    marginBottom: 10,
                  }}
                />
                <Text
                  style={{color: '#fff', fontSize: 18, alignSelf: 'center'}}>
                  {remoteInfo.fullName}
                </Text>
                {!remoteStream && (
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: 15,
                      justifyContent: 'center',
                    }}>
                    {/* <Spinner size="sm" color="#fff" mr="2" /> */}
                    <Text style={{color: '#fff', alignSelf: 'center'}}>
                      Waiting to join ...
                    </Text>
                  </View>
                )}
              </View>
            )}
          </View>
        ) : (
          <RTCView
            objectFit="cover"
            style={{
              width: '100%',
              height: '100%',
            }}
            streamURL={localStream && localStream.toURL()}
          />
        )}
        <View style={styles.mediaStyle}>
          <MaterialIcons
            name={isRemoteMic ? 'mic' : 'mic-off'}
            size={20}
            color="#fff"
            style={{margin: 5}}
          />
          <MaterialIcons
            name={isRemoteCamera ? 'videocam' : 'videocam-off'}
            size={20}
            color="#fff"
            style={{margin: 5}}
          />
        </View>
      </View>
      <View style={styles.btnContainer}>
        <ButtonCall
          iconName={isCamera ? 'videocam' : 'videocam-off'}
          backgroundColor="grey"
          onPress={hideCamera}
        />
        <ButtonCall
          iconName={isMic ? 'mic' : 'mic-off'}
          backgroundColor="grey"
          onPress={mute}
        />
        <ButtonCall
          iconName="call-end"
          backgroundColor="red"
          onPress={hangup}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#747474',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  video: {
    position: 'absolute',
    backgroundColor: '#000',
    borderRadius: 10,
  },
  localVideo: {
    position: 'absolute',
    top: 10,
    left: 10,
    width: 150,
    height: 150,
  },
  remoteVideo: {
    top: 180,
    width: '95%',
    height: '55%',
  },
  center: {
    marginTop: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mediaStyle: {
    flexDirection: 'row',
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  btnContainer: {
    flexDirection: 'row',
    bottom: 30,
    zIndex: 10,
  },
});
