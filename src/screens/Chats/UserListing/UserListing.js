import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {View, Text, Image, TouchableOpacity} from 'react-native';

import {SwipeListView} from 'react-native-swipe-list-view';

import {styles} from './UserListing.styles';
import {images} from '@images';
import {
  fetchConversations,
  setCurrentConversation,
} from '@redux/conversationSlice';
import {socket} from '@utils/socket';
import {deleteDataAPI} from '@utils/fetchData';

const UserListing = ({navigation, lastMessages}) => {
  const dispatch = useDispatch();

  const conversations = useSelector(state => state.conversation.conversations);
  const auth = useSelector(state => state.auth);
  const users = useSelector(state => state.user.users);

  // _id:"627784ba80a7cddb35c23955"
  // title:"1vs1"
  // createdAt:"2022-05-08T08:52:10.318Z"
  // updatedAt:"2022-05-08T08:52:10.318Z"
  // __v:0

  // const getRoom = (data) => {
  //   const foundRoom = rooms.find((room) => room === data);

  //   if (foundRoom && !username) {
  //     setErrorName(true);
  //   }

  //   if (foundRoom && username) {
  //     socket.emit("join_room", foundRoom);
  //   }
  // };

  // useEffect(() => {
  //   socket.on("show_rooms", (data) => {
  //     setRooms([...rooms, ...data]);
  //   });
  // }, [rooms]);

  // useEffect(() => {
  //   socket.on("show_new_rooms", (data) => {
  //     setRooms([...rooms, data]);
  //   });
  // }, [rooms]);

  const handleDelete = async data => {
    try {
      await deleteDataAPI(
        `conversation/${data.item._id}?offset=${data.item.cntMessages.length}`,
        auth.token,
      );

      dispatch(fetchConversations(auth.id, auth.token));
    } catch (e) {
      console.log(e);
    }
  };

  const renderHiddenItem = (data, rowMap) => (
    <View style={styles.rowBack}>
      <View style={styles.itemRowWrapper}>
        <Image style={styles.itemRowIcon} source={images.camera} />
        <Image style={styles.itemRowIcon} source={images.call} />
        <Image style={styles.itemRowIcon} source={images.video_call} />
      </View>
      <View style={styles.itemRowWrapper}>
        <Image
          style={styles.itemRowIcon}
          source={images.converation_settings}
        />
        <Image style={styles.itemRowIcon} source={images.notifications} />
        <TouchableOpacity onPress={() => handleDelete(data)}>
          <Image
            style={styles.itemRowIcon}
            source={images.delete_conversation}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  const photoOrContent = (last, item) => {
    if (last.msgType === 1) {
      if (last.senderId === auth.id) {
        return 'You sent a photo';
      } else {
        return item + ' send a photo';
      }
    } else if (last.msgType === 2) {
      if (last.senderId === auth.id) {
        return 'You sent a video';
      } else {
        return item + ' send a video';
      }
    } else if (last.msgType === 3) {
      if (last.senderId === auth.id) {
        return 'You sent a like';
      } else {
        return item + ' send a like';
      }
    } else {
      return last.content;
    }
  };

  const renderItem = ({item}) => {
    const last = lastMessages.find(e => e._id === item._id);

    let sender;

    if (last) {
      sender = users.find(u => u._id === last.senderId);
    }

    const senderName = sender?.lastName;

    return (
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => {
          dispatch(setCurrentConversation(item));
          socket.emit('join_room', item._id);
          navigation.navigate('Chat');
        }}>
        <View style={styles.userItemContainer}>
          <Image source={{uri: item.avatar}} style={styles.userIcon} />
          <View style={styles.userDetailsSectionContainer}>
            <View>
              <Text style={styles.label1}>{item.title}</Text>
              {last && (
                <Text style={styles.label2}>
                  {last.senderId === auth.id ? 'You' : senderName}:{' '}
                  {photoOrContent(last, senderName)} &#183; {last.createdAt}
                </Text>
              )}
            </View>

            <Image source={images.checked} style={styles.checked} />
          </View>
        </View>
      </TouchableOpacity>

      // <TouchableOpacity
      //   activeOpacity={1}
      //   onPress={() => navigation.navigate("Chat")}
      // >
      //   <View style={styles.userItemContainer}>
      //     <Image source={item.image} style={styles.userIcon} />
      //     <View style={styles.userDetailsSectionContainer}>
      //       <View>
      //         <Text style={styles.label1}>{item.name}</Text>
      //         <Text style={styles.label2}>{item.lastMessage}</Text>
      //       </View>
      //       <Image source={images.checked} style={styles.checked} />
      //     </View>
      //   </View>
      // </TouchableOpacity>
    );
  };

  return (
    <SwipeListView
      data={conversations}
      renderItem={renderItem}
      renderHiddenItem={renderHiddenItem}
      leftOpenValue={180}
      rightOpenValue={-180}
    />
  );
};

export default UserListing;
