import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EmojiSelector from 'react-native-emoji-selector';

// import * as ImagePicker from "expo-image-picker";
import {launchImageLibrary} from 'react-native-image-picker';
import Video from 'react-native-video';

import {useDispatch, useSelector} from 'react-redux';

import {styles} from './Chat.styles';
import {colors} from '@theme/colors';
import {images} from '@images';

import {LeftMessage, RightMessage} from '../Message/Message';

import {uploadFile} from '@redux/uploadSlice';
import {enumMessenger} from '@utils/enum';
import {fetchConversations, setLastMessages} from '@redux/conversationSlice';
import {socket} from '@utils/socket';

const Chat = ({navigation, route}) => {
  const [messageList, setMessageList] = useState([]);
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [videoUri, setVideoUri] = useState(null);
  const [showEmoji, setShowEmoji] = useState(false);
  const video = useRef(null);
  const scrollViewRef = useRef();
  const propsConversation = route.params?.conversation;

  const auth = useSelector(state => state.auth);
  const users = useSelector(state => state.user.users);
  const {lastMessages} = useSelector(state => state.conversation);
  const current_conversation =
    propsConversation ||
    useSelector(state => state.conversation.current_conversation);

  // const currentMessages = useSelector(
  //   (state) => state.message.currentMessages.messages
  // );

  // console.log("Message list: ", messageList);

  const {token} = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const sendUser = useMemo(() => {
    const user = users.find(user => user._id === auth.id);
    return user;
  }, [users, auth]);

  const receiveUser = useMemo(() => {
    const idReceiver = current_conversation.members?.findIndex(
      e => e.idUser !== auth.id,
    );

    const user = users.find(
      user => user._id === current_conversation?.members?.[idReceiver].idUser,
    );

    return user;
  }, [users, current_conversation]);

  const startVideoCall = () => {
    navigation.push('WebRTCCall', {
      sender: sendUser,
      receiver: receiveUser,
      conversationId: current_conversation?._id,
      isVideoCall: true,
    });
  };

  const startVoiceCall = () => {
    navigation.push('WebRTCCall', {
      sender: sendUser,
      receiver: receiveUser,
      conversationId: current_conversation?._id,
      isVideoCall: false,
    });
  };

  const sendMessage = (sendLikeIcon = false) => {
    if (showEmoji) {
      setShowEmoji(false);
    }

    const messageData = {
      room: current_conversation._id,
      userName: sendUser?.firstName,
      idUser: auth.id,
      avatar: sendUser.avatar,
      type: enumMessenger.msgType.text,
      message: 'like_icon',
      time:
        new Date(Date.now()).getHours() +
        ':' +
        new Date(Date.now()).getMinutes(),
    };

    if (text !== '') {
      messageData.message = text;
    }

    if (sendLikeIcon) {
      messageData.type = enumMessenger.msgType.likeIcon;
    }

    const newLastMess = lastMessages.map(e => {
      if (e._id === current_conversation._id) {
        return {
          ...e,
          content: messageData.message,
        };
      } else {
        return e;
      }
    });
    dispatch(setLastMessages(newLastMess));
    socket.emit('send_message', {
      messageData,
      currentCon: current_conversation,
    });
    setMessageList([...messageList, messageData]);
    setText('');
  };

  useEffect(() => {
    const handler = data => {
      const checkUser = current_conversation?.members.find(
        e => e.idUser === auth.id,
      );

      if (Array.isArray(data)) {
        if (checkUser.offset !== 0) {
          let dataSplice = [];
          for (let i = checkUser.offset; i < data.length; i++) {
            dataSplice.push(data[i]);
          }
          setMessageList([...messageList, ...dataSplice]);
        } else setMessageList([...messageList, ...data]);
      } else {
        setMessageList([...messageList, data]);
      }
    };
    socket.on('receive_message', handler);

    return () => {
      socket.off('receive_message', handler);
    };
  }, [socket, messageList]);

  const handleText = emoji => {
    const appendEmoji = text + emoji;
    setText(appendEmoji);
  };

  const pickImage = async () => {
    const result = await launchImageLibrary({});

    const uri = result.assets[0].uri;

    if (!result.didCancel) {
      setImage(uri);
      console.log(uri);
    }
  };

  const onSendImage = async () => {
    const tempImage = image;
    setImage(null);

    const imageUrl = await uploadFile(tempImage, 'image', token);

    const messageData = {
      room: current_conversation._id,
      userName: current_conversation.title,
      idUser: auth.id,
      avatar: current_conversation.avatar,
      type: enumMessenger.msgType.image,
      message: imageUrl,
      time:
        new Date(Date.now()).getHours() +
        ':' +
        new Date(Date.now()).getMinutes(),
    };

    socket.emit('send_message', {messageData});
    setMessageList([...messageList, messageData]);
  };

  const onSendVideo = async () => {
    const tempVideoUri = videoUri;
    setVideoUri(null);

    const videoUrl = await uploadFile(tempVideoUri, 'video', token);

    const messageData = {
      room: current_conversation._id,
      userName: current_conversation.title,
      idUser: auth.id,
      avatar: current_conversation.avatar,
      type: enumMessenger.msgType.file,
      message: videoUrl,
      time:
        new Date(Date.now()).getHours() +
        ':' +
        new Date(Date.now()).getMinutes(),
    };

    socket.emit('send_message', {messageData});
    setMessageList([...messageList, messageData]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {/* <Story /> */}

        {/* Back to Chats list button */}
        <TouchableOpacity
          onPress={() => {
            dispatch(fetchConversations(auth.id, auth.token));
            navigation.navigate('Chats');
          }}>
          <Image source={images.backButton} style={styles.backIcon} />
        </TouchableOpacity>

        {/* Header of Conversation */}
        <View style={styles.headerInfo}>
          <TouchableOpacity
            activeOpacity={0.6}
            style={{flexDirection: 'row'}}
            onPress={() => {
              navigation.navigate('ConversationSettings', {
                avatar: current_conversation.avatar,
                userInfo: {
                  username: current_conversation.title,
                  receiveUser: receiveUser,
                  status: 'Active',
                  members: current_conversation.members,
                },
                users: users,
              });
            }}>
            <Image
              source={{uri: current_conversation.avatar}}
              style={styles.header_avatarIcon}
            />
            <View>
              <Text style={{fontSize: 16, fontWeight: 'bold', color: 'black'}}>
                {current_conversation.title}
              </Text>
              <Text style={{fontSize: 12}}>Status</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Some action buttons (voice call, video call) */}
        <View style={styles.header_actions}>
          <TouchableOpacity onPress={startVoiceCall}>
            <Image source={images.phone} style={styles.iconPhone} />
          </TouchableOpacity>

          <TouchableOpacity onPress={startVideoCall}>
            <Image
              source={images.video_call_chat}
              style={styles.iconVideoCall}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* style={[styles.message, username === messageContent.userName ? "you" : "other"]} */}
      {/* Body a.k.a List of messages */}
      <View style={styles.body}>
        <ScrollView
          style={styles.messageContainer}
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({animated: true})
          }>
          {messageList.map((messageContent, index) =>
            messageContent.idUser === auth.id ? (
              <RightMessage
                key={index}
                type={messageContent.type}
                message={messageContent.message}
                time={messageContent.time}
                userName={messageContent.userName}
                avatar={messageContent.avatar}
              />
            ) : (
              <LeftMessage
                key={index}
                type={messageContent.type}
                message={messageContent.message}
                time={messageContent.time}
                userName={messageContent.userName}
                avatar={messageContent.avatar}
              />
            ),
          )}
        </ScrollView>
      </View>

      <View style={styles.footer}>
        {/* Grid a.k.a four points */}
        <TouchableOpacity style={styles.iconFooter}>
          <Image source={images.four_points} style={styles.four_points} />
        </TouchableOpacity>

        {/* Camera button */}
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Camera', {
              setImage,
              setVideoUri,
            })
          }
          style={styles.iconFooter}>
          <Image source={images.camera_button} style={styles.camera_button} />
        </TouchableOpacity>

        {/* Picture/Photo button */}
        <TouchableOpacity onPress={pickImage} style={styles.iconFooter}>
          <Image source={images.image_button} style={styles.image_button} />
        </TouchableOpacity>

        {/* Microphone button */}
        <TouchableOpacity style={styles.iconFooter}>
          <Image source={images.mic_button} style={styles.mic_button} />
        </TouchableOpacity>

        {/* Message Text input */}
        <View style={styles.input}>
          <TextInput
            style={styles.inputText}
            onChangeText={setText}
            value={text}
            placeholder="Aa"
            placeholderTextColor={'#8E8E93'}
          />

          <TouchableOpacity
            style={styles.inputEmoji}
            onPress={() => setShowEmoji(!showEmoji)}>
            <Image source={images.emoji_button} style={styles.emoji_button} />
          </TouchableOpacity>
        </View>

        {showEmoji && (
          <EmojiSelector
            onEmojiSelected={emoji => handleText(emoji)}
            showSearchBar={true}
            showTabs={true}
            showHistory={true}
            showSectionTitles={true}
            style={styles.emojiMart}
          />
        )}

        {/* a.k.a Like button */}
        {text === '' && (
          <TouchableOpacity
            onPress={() => {
              sendMessage(true);
            }}
            style={styles.iconFooter}>
            <Image source={images.like_button} style={styles.like_button} />
          </TouchableOpacity>
        )}

        {/* a.k.a Send button */}
        {text !== '' && (
          <TouchableOpacity
            onPress={() => sendMessage(false)}
            style={styles.iconFooter}>
            <Image source={images.send_button} style={styles.send_button} />
          </TouchableOpacity>
        )}
        {/* ... */}
        {image && (
          <View style={styles.preview}>
            <TouchableOpacity
              style={styles.previewClose}
              onPress={() => setImage(null)}>
              <AntDesign
                name="close"
                style={{color: colors.white, fontSize: 20}}
              />
            </TouchableOpacity>
            <Image
              source={{uri: image} || images.avatar}
              style={styles.previewImg}
            />
            <TouchableOpacity style={styles.previewSend} onPress={onSendImage}>
              <Text style={{color: colors.white}}>Send</Text>
              <Ionicons
                name="send"
                style={{color: colors.white, marginLeft: 4}}
              />
            </TouchableOpacity>
          </View>
        )}

        {/* ... */}
        {videoUri && (
          <View style={styles.preview}>
            <TouchableOpacity
              style={styles.previewClose}
              onPress={() => setVideoUri(null)}>
              <AntDesign
                name="close"
                style={{color: colors.white, fontSize: 20}}
              />
            </TouchableOpacity>
            <Video
              ref={video}
              style={styles.previewVideo}
              source={{
                uri: videoUri,
              }}
              // useNativeControls
              // resizeMode="contain"
              // isLooping
            />
            <TouchableOpacity style={styles.previewSend} onPress={onSendVideo}>
              <Text style={{color: colors.white}}>Send</Text>
              <Ionicons
                name="send"
                style={{color: colors.white, marginLeft: 4}}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default Chat;
