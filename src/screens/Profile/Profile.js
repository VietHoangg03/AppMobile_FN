import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {images} from '@images';
import {styles} from './Profile.styles';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import Story from '@components/Story/Story';
// import {launchImageLibrary} from 'react-native-image-picker';
import {
  setConversations,
  setCurrentConversation,
} from '@redux/conversationSlice';
import {getDataAPI, postDataAPI} from '@utils/fetchData';
import {createStory} from '@redux/storySlice';
import {socket} from '@utils/socket';

const Profile = ({navigation, route}) => {
  const auth = useSelector(state => state.auth);
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const users = useSelector(state => state.user.users);

  useEffect(() => {
    const otherUser = route.params?.otherUser;
    if (otherUser) {
      setUser(otherUser);
    } else {
      const loggedUser = users.filter(user => user._id === auth.id)[0];

      setUser(loggedUser);
    }
  }, [route.params?.otherUser, users]);

  const fetchCreateConversation = async (peerA, peerB, token, user) => {
    try {
      const res = await getDataAPI(
        `conversation/peers?peerA=${peerA}&peerB=${peerB}`,
        token,
      );

      console.log('RESS >>>>', res);

      if (res.status === 200) {
        const peerRes = await getDataAPI(`user/${peerB}`, token);

        if (peerRes.status === 200) {
          res.data[0].title = peerRes.data.fullName;
          res.data[0].avatar = peerRes.data.avatar;
        }

        dispatch(setCurrentConversation(res.data[0]));
        socket.emit('join_room', res.data[0]._id);
      } else if (res.status !== 200) {
        const createNew1vs1 = await postDataAPI(
          'conversation',
          {
            title: '1vs1',
            members: [
              {idUser: peerA, show: false, offset: 0},
              {idUser: peerB, show: false, offset: 0},
            ],
          },
          token,
        );

        const newConversation = {
          ...createNew1vs1.data,
          title: user.fullName,
          avatar: user.avatar,
        };

        dispatch(setConversations(newConversation));

        return newConversation;
      }
    } catch (err) {
      console.log(err);
    }
  };

  async function handleAddStory() {
    // const result = await launchImageLibrary({});
    // const uri = result.assets[0].uri;
    // if (!result.didCancel) {
    //   dispatch(
    //     createStory({
    //       userId: auth.id,
    //       content: uri,
    //       type: 'image',
    //       token: auth.token,
    //     }),
    //   );
    // }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.wallpaperContainer}>
        {/* a.k.a back button */}
        <Ionicons
          name="arrow-back"
          onPress={() => {
            navigation.navigate('Home');
          }}
          style={styles.back}
        />

        <Image
          source={{uri: user?.wallpaper} || images.wallpaper}
          style={styles.coverPhoto}
        />

        <Image source={images.take_photo} style={styles.cameraWallpaper} />
      </View>

      <TouchableOpacity
        style={styles.dpContainer}
        onPress={() =>
          user.stories.length > 0 &&
          navigation.navigate('Story', {
            user: user,
          })
        }>
        <View style={user?.stories?.length > 0 && styles.dpBlueRound}>
          <Image
            source={{uri: user.avatar} || images.avatar}
            style={styles.dp}
          />
          <Image source={images.take_photo} style={styles.cameraAvatar} />
        </View>
      </TouchableOpacity>

      <Text style={styles.name}>{user.fullName}</Text>
      <Text style={styles.shortBio}>{user.bio}</Text>

      <View style={styles.profileTabsContainer}>
        {/* Add Story button */}
        <View style={styles.tabContainer}>
          <View style={styles.tabImageContainer}>
            {user._id === auth.id ? (
              <Ionicons
                name="add"
                style={{fontSize: 40, color: '#000'}}
                onPress={handleAddStory}
              />
            ) : (
              <Entypo name="eye" style={{fontSize: 40, color: '#000'}} />
            )}
          </View>
          {user._id === auth.id ? (
            <Text style={styles.tabText}>Add Story</Text>
          ) : (
            <Text style={styles.tabText}>Watch Story</Text>
          )}
        </View>

        {/* Edit Profile button */}
        <TouchableOpacity
          style={styles.tabContainer}
          onPress={() => {
            if (user._id === auth.id) {
              navigation.navigate('EditProfile', {user});
            }
          }}>
          <View style={styles.tabImageContainer}>
            {user._id === auth.id ? (
              <FontAwesome name="edit" style={{fontSize: 40, color: '#000'}} />
            ) : (
              <Ionicons name="call" style={{fontSize: 40, color: '#000'}} />
            )}
          </View>
          {user._id === auth.id ? (
            <Text style={styles.tabText}>Edit Profile</Text>
          ) : (
            <Text style={styles.tabText}>Voice call</Text>
          )}
        </TouchableOpacity>

        {/* Message button */}
        <TouchableOpacity
          style={styles.tabContainer}
          onPress={() => {
            fetchCreateConversation(auth.id, user._id, auth.token, user).then(
              data => {
                navigation.navigate('Chat', {conversation: data});
              },
            );
          }}>
          <View style={styles.tabContainer}>
            <View style={styles.tabImageContainer}>
              <Image
                source={images.message_button}
                style={styles.icon_profile}
              />
            </View>
            <Text style={styles.tabText}>Message</Text>
          </View>
        </TouchableOpacity>

        {/* More Options button */}
        <View style={styles.tabContainer}>
          <View style={styles.tabImageContainer}>
            {user._id === auth.id ? (
              <Image
                source={images.more_icon}
                style={{
                  width: 26,
                  height: 26,
                }}
              />
            ) : (
              <MaterialIcons
                name="video-call"
                style={{fontSize: 40, color: '#000'}}
              />
            )}
          </View>
          {user._id === auth.id ? (
            <Text style={styles.tabText}>More</Text>
          ) : (
            <Text style={styles.tabText}>Video call</Text>
          )}
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Text
          style={{
            marginLeft: 20,
            marginBottom: 10,
            fontWeight: 'bold',
            fontSize: 24,
            color: 'black',
          }}>
          Information
        </Text>
        {user.gender ? (
          <View style={styles.itemContainer}>
            <FontAwesome name="transgender" style={styles.icon} />
            <Text style={styles.text}>
              <Text style={styles.valueText}>{user.gender}</Text>
            </Text>
          </View>
        ) : null}

        {user.address ? (
          <View style={styles.itemContainer}>
            <FontAwesome name="home" style={styles.icon} />
            <Text style={styles.text}>
              Lives in <Text style={styles.valueText}>{user.address}</Text>
            </Text>
          </View>
        ) : null}

        {user.school ? (
          <View style={styles.itemContainer}>
            <Ionicons name="school" style={styles.icon} />
            <Text style={styles.text}>
              Studies at <Text style={styles.valueText}>{user.school}</Text>
            </Text>
          </View>
        ) : null}

        {user.work ? (
          <View style={styles.itemContainer}>
            <MaterialIcons name="work" style={styles.icon} />
            <Text style={styles.text}>
              Works at <Text style={styles.valueText}>{user.work}</Text>
            </Text>
          </View>
        ) : null}

        {user.dateOfBirth ? (
          <View style={styles.itemContainer}>
            <FontAwesome name="birthday-cake" style={styles.icon} />
            <Text style={styles.text}>
              Born on <Text style={styles.valueText}>{user.dateOfBirth}</Text>
            </Text>
          </View>
        ) : null}
      </View>
    </ScrollView>
  );
};

export default Profile;
