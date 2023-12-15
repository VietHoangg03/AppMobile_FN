import React, {useEffect, useState} from 'react';
import {View, Image, FlatList, Text, TouchableOpacity} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {images} from '@images';
import {styles} from './StorySlider.styles';
import Feather from 'react-native-vector-icons/Feather';
import {launchImageLibrary} from 'react-native-image-picker';
import {getStoriesExist} from '@redux/storySlice';
import {createStory} from '@redux/storySlice';

// For getting list of conversations of the user
import {fetchConversations} from '@redux/conversationSlice';

const StorySlider = ({navigation, loggedUser}) => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const users = useSelector(state => state.user.users);
  const [story, setStory] = useState({content: '', type: '', finish: 0});
  const storiesExist = useSelector(state => state.story.storiesExist);

  // For getting list of conversations of the user

  useEffect(() => {
    const filterStories = users.filter(user => {
      return user?.stories.length > 0;
    });
    dispatch(getStoriesExist(filterStories));
    // Login successfully => Load conversations of the user
    dispatch(fetchConversations(auth.id, auth.token));
  }, [users, users.stories]);

  const handlePickerAvatar = async () => {
    const result = await launchImageLibrary({});
    const uri = result.assets[0];
    if (!result.didCancel) {
      dispatch(
        createStory({
          userId: auth.id,
          content: uri,
          type: 'image',
          token: auth.token,
        }),
      );
    }
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.userIconContainer}
      onPress={() =>
        item?.stories.length > 0 &&
        navigation.navigate('Story', {
          user: item,
          storiesExist: storiesExist,
          isMyStory: false,
        })
      }>
      <Image source={{uri: item.avatar}} style={styles.storyAvatar} />
      <Text style={styles.userName}>{item.fullName}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.userIconContainer}
        onPress={handlePickerAvatar}>
        <Image style={styles.addImageIcon} source={images.your_story00} />
        <Text style={styles.userName}>Add Story</Text>
      </TouchableOpacity>

      <FlatList
        style={{}}
        showsHorizontalScrollIndicator={false}
        horizontal={true}
        data={storiesExist}
        renderItem={renderItem}
        keyExtractor={item => item._id}
      />
    </View>
  );
};

export default StorySlider;
