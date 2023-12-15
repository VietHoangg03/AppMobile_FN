import React, {useState, useEffect, useRef} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableWithoutFeedback,
  Image,
  Modal,
  Animated,
  StatusBar,
  Button,
  TouchableOpacity,
  BackHandler,
  Alert,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {launchImageLibrary} from 'react-native-image-picker';

import {SafeAreaView} from 'react-native-safe-area-context';
import Video from 'react-native-video';
import {useDispatch, useSelector} from 'react-redux';
import {deleteStory, removeStoriesExist} from '@redux/storySlice';
import {createStory} from '@redux/storySlice';

const {width, height} = Dimensions.get('window');
const screenRatio = height / width;

const Story = ({navigation, route}) => {
  // THE CONTENT
  const {user, storiesExist, isMyStory} = route.params;
  const [content, setContent] = useState(user.stories);
  const dispatch = useDispatch();
  // i use modal for opening the instagram stories
  const [modalVisible, setModalVisible] = useState(true);
  // for get the duration
  const [end, setEnd] = useState(0);
  // current is for get the current content is now playing
  const [current, setCurrent] = useState(0);
  const video = useRef(null);
  // if load true then start the animation of the bars at the top
  const [load, setLoad] = useState(false);
  // progress is the animation value of the bars content playing the current state
  const progress = useRef(new Animated.Value(0)).current;
  // Sau khi xem hết story của chính mình, sẽ hiện modal tạo thêm story
  const [showCreateStory, setShowCreateStory] = useState(false);
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    if (user) setContent(user.stories);
  }, [user]);

  //  I WAS THINKING TO GET THE VIDEO THUMBNAIL BEFORE THE VIDEO LOADS UP

  // const [thumbnail, setThumbnail] = useState('');
  // useEffect(() => {
  // 	generateThumbnail();
  // }, []);
  // generateThumbnail = async () => {
  // 	for (let i = 0; i < content.length; i++) {
  // 		if (content[i].type == 'video') {
  // 			try {
  // 				const { uri } = await VideoThumbnails.getThumbnailAsync(
  // 					content[i].content,
  // 					{
  // 						time: 0,
  // 					}
  // 				);
  // 				console.log(i + ' ' + content[i].content);
  // 				console.log(i + ' ' + uri);
  // 				let story = [...content];
  // 				content[i].thumbnail = uri;
  // 				setContent(story);
  // 			} catch (e) {
  // 				console.log(i + ' ' + e);
  // 			}
  // 		}
  // 	}
  // };

  // start() is for starting the animation bars at the top
  function start(n) {
    // checking if the content type is video or not
    if (content[current]?.type === 'video') {
      // type video
      if (load) {
        Animated.timing(progress, {
          toValue: 1,
          duration: n,
        }).start(({finished}) => {
          if (finished) {
            next();
          }
        });
      }
    } else {
      // type image
      Animated.timing(progress, {
        toValue: 1,
        duration: 5000,
      }).start(({finished}) => {
        if (finished) {
          next();
        }
      });
    }
  }

  // handle playing the animation
  function play() {
    start(500);
  }

  // next() is for changing the content of the current content to +1
  function next() {
    // check if the next content is not empty
    if (current === content.length - 1 && isMyStory && !showCreateStory) {
      setShowCreateStory(true);
    } else if (current === content.length - 1 && !storiesExist) {
      close();
    } else {
      if (current !== content.length - 1) {
        let story = [...content];
        story[current] = {...story[current], finish: 1};

        setContent(story);
        setCurrent(current + 1);
        progress.setValue(0);
        setLoad(false);
      } else {
        // the next content is empty
        const nextStory = storiesExist.findIndex(e => e === user);
        if (nextStory === -1 || nextStory === storiesExist.length - 1) {
          close();

          // if (nextStory !== -1) {
          //   dispatch(removeStoriesExist(storiesExist[nextStory]));
          // }
        } else {
          setCurrent(0);
          progress.setValue(0);
          const nextUser = storiesExist[nextStory + 1];
          // dispatch(removeStoriesExist(storiesExist[nextStory]));
          navigation.navigate('Story', {
            user: nextUser,
            storiesExist,
          });
        }
      }
    }
  }

  // previous() is for changing the content of the current content to -1
  function previous() {
    // checking if the previous content is not empty
    if (current - 1 < 0 && !storiesExist) {
      // for 1 person
      close();
    } else {
      if (current - 1 >= 0) {
        let story = [...content];

        story[current] = {...story[current], finish: 0};
        setContent(story);
        setCurrent(current - 1);
        progress.setValue(0);
        setLoad(false);
      } else {
        // the previous content is empty
        const previousStory = storiesExist.findIndex(e => e === user);
        console.log(previousStory);
        if (previousStory === -1 || previousStory === 0) {
          close();
        } else {
          setCurrent(0);
          progress.setValue(0);
          const previousUser = storiesExist[previousStory - 1];
          console.log(previousUser);
          navigation.navigate('Story', {
            user: previousUser,
            storiesExist,
          });
        }
      }
    }
  }

  // closing the modal set the animation progress to 0
  function close() {
    progress.setValue(0);
    setLoad(false);
    setModalVisible(false);
    navigation.goBack();
  }

  async function handleAddStory() {
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

    close();
  }

  function handleDeleteStory() {
    Animated.timing(progress, {}).stop();
    Alert.alert(
      'Delete story',
      'Are you sure to delete this story?',
      [
        {
          text: 'Ok',
          onPress: () => {
            dispatch(
              deleteStory({
                userId: auth.id,
                storyId: content[current]['_id'],
                token: auth.token,
              }),
            ),
              close();
          },
          style: 'cancel',
        },
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
        onDismiss: () => {},
      },
    );
  }

  const formatDate = time => {
    const dateConvert = new Date(time);
    const start = new Date(time).getTime();
    const end = new Date(Date.now()).getTime();
    const milliseconds = Math.abs(end - start).toString();
    const seconds = parseInt(milliseconds / 1000);
    const minutes = parseInt(seconds / 60);
    const hours = parseInt(minutes / 60);

    if (minutes < 1) {
      return seconds + 's';
    }

    if (hours < 1) {
      return minutes + 'm';
    }

    if (hours < 24) {
      return hours + 'h';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      {/* MODAL */}
      {!showCreateStory && (
        <Modal animationType="fade" transparent={false} visible={modalVisible}>
          <View style={styles.containerModal}>
            <View style={styles.backgroundContainer}>
              {/* check the content type is video or an image */}
              {content[current]?.type === 'video' ? (
                <Video
                  onReadyForDisplay={() => {
                    play();
                  }}
                  rate={1.0}
                  volume={1.0}
                  style={{width: width, height: height, resizeMode: 'cover'}}
                  source={{uri: content[current]?.content}} // Store reference
                />
              ) : (
                <Image
                  onLoadEnd={() => {
                    progress.setValue(0);
                    play();
                  }}
                  source={{
                    uri: content[current]?.content,
                  }}
                  style={{width: width, height: height, resizeMode: 'cover'}}
                />
              )}
            </View>
            <View
              style={{
                flexDirection: 'column',
                flex: 1,
              }}>
              {/* ANIMATION BARS */}
              <View
                style={{
                  flexDirection: 'row',
                  paddingTop: 10,
                  paddingHorizontal: 10,
                }}>
                {content &&
                  content.map((index, key) => {
                    return (
                      // THE BACKGROUND
                      <View
                        key={key}
                        style={{
                          height: 2,
                          flex: 1,
                          flexDirection: 'row',
                          backgroundColor: 'rgba(117, 117, 117, 0.5)',
                          marginHorizontal: 2,
                        }}>
                        {/* THE ANIMATION OF THE BAR*/}
                        <Animated.View
                          style={{
                            flex:
                              current === key ? progress : content[key].finish,
                            height: 2,
                            backgroundColor: 'rgba(255, 255, 255, 1)',
                          }}></Animated.View>
                      </View>
                    );
                  })}
              </View>
              {/* END OF ANIMATION BARS */}

              <View
                style={{
                  height: 50,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: 15,
                }}>
                {/* THE AVATAR AND USERNAME  */}
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Image
                    style={{height: 30, width: 30, borderRadius: 25}}
                    source={{uri: user?.avatar}}
                  />
                  <Text
                    style={{
                      fontWeight: 'bold',
                      color: 'white',
                      paddingLeft: 10,
                    }}>
                    {user?.fullName}
                  </Text>

                  <Text
                    style={{
                      color: 'white',
                      paddingLeft: 10,
                    }}>
                    {formatDate(content[current]?.createdAt)}
                  </Text>
                </View>
                {/* END OF THE AVATAR AND USERNAME */}
                <View style={{display: 'flex', flexDirection: 'row'}}>
                  {/* THE MORE BUTTON */}
                  {user._id === auth.id && (
                    <TouchableOpacity onPress={handleDeleteStory}>
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: 50,
                        }}>
                        <AntDesign
                          name="delete"
                          style={{
                            fontSize: 20,
                            marginRight: 10,
                            color: 'white',
                          }}
                        />
                      </View>
                    </TouchableOpacity>
                  )}
                  {/* END OF MORE BUTTON */}

                  {/* THE CLOSE BUTTON */}
                  <TouchableOpacity
                    onPress={() => {
                      close();
                    }}>
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: 50,
                        paddingHorizontal: 1,
                      }}>
                      <FontAwesome
                        name="close"
                        style={{fontSize: 20, color: 'white'}}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
                {/* END OF CLOSE BUTTON */}
              </View>
              {/* HERE IS THE HANDLE FOR PREVIOUS AND NEXT PRESS */}
              <View style={{flex: 1, flexDirection: 'row'}}>
                <TouchableWithoutFeedback onPress={() => previous()}>
                  <View style={{flex: 1}}></View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => next()}>
                  <View style={{flex: 1}}></View>
                </TouchableWithoutFeedback>
              </View>
              {/* END OF THE HANDLE FOR PREVIOUS AND NEXT PRESS */}
            </View>
          </View>
        </Modal>
      )}

      {showCreateStory && (
        <Modal>
          <View style={styles.backgroundContainer}>
            <TouchableOpacity onPress={handleAddStory}>
              <Text>Create new story</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={close}>
              <Text>Close</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                next();
                setShowCreateStory(false);
              }}>
              <Text>See more stories</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {},
  containerModal: {
    flex: 1,
    backgroundColor: '#000',
  },
  backgroundContainer: {
    position: 'absolute',

    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default Story;
