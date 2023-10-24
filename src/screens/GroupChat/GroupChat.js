import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import SearchBox from '@components/SearchBox/SearchBox';
import {styles} from './GroupChat.style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SwipeListView} from 'react-native-swipe-list-view';
import {images} from '@images';
import {colors} from '@theme/colors';
import {
  defaultAvatarGroupChat,
  fetchCreateConversation,
  setConversations,
} from '@redux/conversationSlice';
import SearchBoxGroupChat from './SearchBoxGroupChat/SearchBoxGroupChat';
import {postDataAPI} from '@utils/fetchData';

const GroupChat = ({navigation}) => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const users = useSelector(state => state.user.users);

  const [preMembers, setPreMembers] = useState([]);
  const [title, setTitle] = useState('');

  // Three main functions
  const addPreMember = member => {
    if (!preMembers.includes(member)) {
      setPreMembers([...preMembers, member]);
    }
  };

  const removePreMember = member => {
    const preMembersTemp = preMembers.filter(item => item._id !== member._id);
    setPreMembers(preMembersTemp);
  };

  const fetchCreateGroupChat = async () => {
    if (preMembers.length >= 2 && title) {
      const preMembersId = preMembers.map(item => ({
        show: true,
        idUser: item._id,
        offset: 0,
      }));

      preMembersId.push({
        show: true,
        idUser: auth.id,
        offset: 0,
      });

      try {
        const res = await postDataAPI(
          'conversation/',
          {
            title,
            members: preMembersId,
          },
          auth.token,
        );

        if (res.status === 201) {
          res.data.avatar = defaultAvatarGroupChat;
          dispatch(setConversations(res.data));
          return res.data;
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  // a.k.a List users of suggestions
  const ListUser = () => {
    // Remove current auth from list users
    const Data = users.filter(item => item._id !== auth.id);

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
          <Image
            style={styles.itemRowIcon}
            source={images.delete_conversation}
          />
        </View>
      </View>
    );

    const renderItem = ({item}) => {
      return (
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => {
            addPreMember(item);
          }}>
          <View style={styles.userItemContainer}>
            <Image source={{uri: item.avatar}} style={styles.userIcon} />
            <View style={styles.userDetailsSectionContainer}>
              <View>
                <Text style={styles.label1}>{item.fullName}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      );
    };

    return (
      <SwipeListView
        data={Data}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItem}
        leftOpenValue={180}
        rightOpenValue={-180}
      />
    );
  };

  // a.k.a User slot for FlatList Pre-Members
  const UserSlot = ({user}) => {
    return (
      <TouchableOpacity
        style={styles.userSlot}
        onPress={() => removePreMember(user)}>
        <Image source={{uri: user.avatar}} style={styles.userSlotAvatar} />

        <Ionicons
          name="close"
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            color: colors.zblack,
            backgroundColor: colors.white,
            borderRadius: 50,
            borderColor: colors.zblack,
            fontSize: 16,
          }}
        />

        <Text
          style={{
            textAlign: 'center',
            color: colors.zblack,
            paddingTop: 7,
            fontSize: 14,
          }}>
          {user.firstName}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* a.k.a Header of Group message */}
      <View style={styles.header}>
        {/* a.k.a Arrow back */}
        <View style={styles.arrow_back}>
          <TouchableOpacity style={{backgroundColor: colors.white}}>
            <Ionicons
              name="arrow-back"
              style={styles.backIcon}
              onPress={() => navigation.navigate('Chats')}
            />
          </TouchableOpacity>
        </View>

        {/* a.k.a Heading */}
        <View style={styles.heading}>
          <Text style={styles.headingText}>New group chat</Text>
        </View>

        {/* a.k.a Next button */}
        <View style={styles.containNextBtn}>
          {/* {preMembers.length < 2 && <Text style={{ color: 'yellow' }}>Next</Text>}

                    {preMembers.length >= 2 &&
                        <TouchableOpacity onPress={() => console.log('next')}>
                            <Text style={{ color: 'red' }}>Next</Text>
                        </TouchableOpacity>} */}

          <TouchableOpacity
            onPress={() => {
              preMembers.length >= 2 &&
                title &&
                fetchCreateGroupChat().then(data => {
                  navigation.navigate('Chat', {conversation: data});
                });
            }}
            style={styles.nextBtn}>
            <Text
              style={{
                ...styles.nextBtnText,
                color:
                  preMembers.length >= 2 && title
                    ? colors.mainColor
                    : colors.grayMain,
              }}>
              Create
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* a.k.a Search box */}
      <View style={styles.searchBox}>
        <SearchBoxGroupChat userStore={users} addPreMember={addPreMember} />
      </View>

      {/* a.k.a Pre-Member */}
      <View style={styles.preMemberView}>
        {preMembers.length > 0 && (
          <View style={styles.preMemberContainer}>
            {preMembers.map(item => {
              return <UserSlot user={item} key={item} />;
            })}
          </View>
        )}
      </View>

      {/* a.k.a Title of conversation */}
      <View style={styles.titleInputView}>
        <View style={styles.titleInputContainer}>
          <TextInput
            placeholder="Title of group (Required)"
            placeholderTextColor={colors.gray02}
            style={styles.inputTitle}
            value={title}
            onChangeText={text => setTitle(text)}
          />
        </View>
      </View>

      {/* a.k.a User Listing */}
      <ScrollView style={styles.listUser}>
        <Text
          style={{
            backgroundColor: colors.white,
            paddingBottom: 15,
            paddingLeft: 20,
            fontWeight: '600',
            fontSize: 15,
          }}>
          Suggest
        </Text>

        <ListUser />
      </ScrollView>
    </SafeAreaView>
  );
};

export default GroupChat;
