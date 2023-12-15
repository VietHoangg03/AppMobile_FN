import React, {useEffect} from 'react';
import {
  View,
  Text,
  Image,
  SafeAreaView,
  Linking,
  ScrollView,
  TouchableOpacity,
  Button,
  TextInput,
  Alert,
} from 'react-native';
import {CheckBox} from 'react-native-elements';
import {images} from '@images';
import {styles} from './EditProfile.styles';
import {colors} from '@theme/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
// import { editAttributeUser, upload } from "@redux/userSlice";
import Modal from 'react-native-modal';
import {getUsers, updateProfile} from '@redux/userSlice';
import {uploadFile} from '@redux/uploadSlice';
import {launchImageLibrary} from 'react-native-image-picker';
import {validateName} from '@utils/validate';
import {FancyAlert} from 'react-native-expo-fancy-alerts';

const EditProfile = ({navigation, route}) => {
  const {user} = route.params;
  const dispatch = useDispatch();

  const auth = useSelector(state => state.auth);
  const [infoTemp, setInfoTemp] = useState(user);
  const [info, setInfo] = useState(user);
  console.log(user);
  const [modalVisible, setModalVisible] = useState({
    information: false,
    bio: false,
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
  });

  const handleData = (field, text) => {
    setInfo({...info, [field]: text});
  };

  const handleSave = fieldModal => {
    setModalVisible(!modalVisible[fieldModal]);
  };

  const setModal = fieldModal => {
    setModalVisible({
      ...modalVisible,
      [fieldModal]: !modalVisible[fieldModal],
    });
  };

  const handlePickerAvatar = async type => {
    const result = await launchImageLibrary({});
    const uri = result.assets[0];
    if (!result.didCancel) {
      if (type === 'avatar') {
        setInfo({...info, avatar: uri.uri, avatarTemp: uri});
        // dispatch(editAttributeUser({ type: "avatar", data: uri }));
      } else if (type === 'wallpaper') {
        setInfo({...info, wallpaper: uri.uri, wallpaperTemp: uri});
        // dispatch(editAttributeUser({ type: "wallpaper", data: uri }));
      }
    }
  };

  const validate = {
    firstName: function (firstName) {
      if (!firstName) {
        setErrors({...errors, firstName: 'Please add your first name.'});
      } else if (!validateName(firstName)) {
        setErrors({
          ...errors,
          firstName: 'Name can only contain non-numeric characters.',
        });
      } else {
        setErrors({...errors, firstName: ''});
      }
    },
    lastName: function (lastName) {
      if (!lastName) {
        setErrors({...errors, lastName: 'Please add your last name.'});
      } else if (!validateName(lastName)) {
        setErrors({
          ...errors,
          lastName: 'Name can only contain non-numeric characters.',
        });
      } else {
        setErrors({...errors, lastName: ''});
      }
    },
  };

  const onUpdatePress = async () => {
    const newInfo = {...info};

    if (!newInfo?.firstName) {
      setErrors(preState => ({
        ...preState,
        firstName: 'Please add your first name.',
      }));
    }
    if (!newInfo?.lastName) {
      setErrors(preState => ({
        ...preState,
        lastName: 'Please add your last name.',
      }));
    }

    if (info.avatar !== user.avatar) {
      newInfo.avatar = await uploadFile(info.avatarTemp, 'image', auth.token);
    }

    if (info.wallpaper !== user.wallpaper) {
      newInfo.wallpaper = await uploadFile(
        info.wallpaperTemp,
        'image',
        auth.token,
      );
    }

    dispatch(
      updateProfile({
        userId: auth.id,
        profile: newInfo,
        token: auth.token,
      }),
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* a.k.a header of edit profile */}
        <View style={styles.headerEdit}>
          <Ionicons
            name="arrow-back"
            style={styles.headerIcon}
            onPress={() => navigation.navigate('Profile')}
          />

          <Text style={styles.headerText}>Edit Profile</Text>

          <TouchableOpacity onPress={onUpdatePress} style={styles.saveButton}>
            <Text style={styles.textSaveButton}>Save</Text>
          </TouchableOpacity>
        </View>

        {/* a.k.a body of edit profile */}
        <View style={styles.editContainer}>
          <View style={styles.typeEditContainer}>
            <Text style={styles.typeEditText}>Profile Picture</Text>

            <Text
              style={styles.editText}
              onPress={() => handlePickerAvatar('avatar')}>
              Edit
            </Text>
          </View>
          <Image
            source={{uri: info.avatar} || images.avatar}
            style={styles.profileAvatar}
          />
        </View>

        <View style={styles.editContainer}>
          <View style={styles.typeEditContainer}>
            <Text style={styles.typeEditText}>Cover Photo</Text>
            <Text
              style={styles.editText}
              onPress={() => handlePickerAvatar('wallpaper')}>
              Edit
            </Text>
          </View>
          <Image
            source={{uri: info.wallpaper} || images.wallpaper}
            style={styles.profileWallpaper}
          />
        </View>

        <View style={styles.editContainer}>
          <View style={styles.typeEditContainer}>
            <Text style={styles.typeEditText}>Bio</Text>

            <Text style={styles.editText} onPress={() => setModal('bio')}>
              Edit
            </Text>
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <Text style={styles.textInfo}>{info.bio}</Text>
            </View>
          </View>

          <Modal isVisible={modalVisible.bio}>
            <View style={styles.modalViewBio}>
              <Text style={styles.modalTypeText}>Edit Bio</Text>

              <View style={styles.infoContainer}>
                <View style={styles.infoItem}>
                  <TextInput
                    onChangeText={text => handleData('bio', text)}
                    style={styles.modalInput}
                    placeholder="Input your bio..."
                    multiline
                    value={info.bio}
                  />
                </View>
              </View>

              <View style={styles.containerButton}>
                <TouchableOpacity
                  onPress={() => handleSave('bio')}
                  style={{
                    ...styles.button,
                    backgroundColor: colors.mainColor,
                  }}>
                  <Text style={{color: colors.white, fontWeight: '500'}}>
                    Save
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    ...styles.button,
                    backgroundColor: colors.grayMain,
                  }}
                  onPress={() => {
                    setModalVisible({information: false});

                    setInfo(infoTemp);
                  }}>
                  <Text>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>

        <View style={styles.editContainer}>
          <View style={styles.typeEditContainer}>
            <Text style={styles.typeEditText}>Information</Text>

            <Text
              style={styles.editText}
              onPress={() => setModal('information')}>
              Edit
            </Text>
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.infoItem}>
              <Text style={styles.typeInfo}>First Name:</Text>
              <Text style={styles.textInfo}>{info.firstName}</Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.typeInfo}>Last Name:</Text>
              <Text style={styles.textInfo}>{info.lastName}</Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.typeInfo}>Address:</Text>
              <Text style={styles.textInfo}>{info.address}</Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.typeInfo}>School:</Text>
              <Text style={styles.textInfo}>{info.school}</Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.typeInfo}>Work:</Text>
              <Text style={styles.textInfo}>{info.work}</Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.typeInfo}>Gender:</Text>
              <Text style={styles.textInfo}>{info.gender}</Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.typeInfo}>Date Of Birth:</Text>
              <Text style={styles.textInfo}>{info.dateOfBirth}</Text>
            </View>
          </View>

          <Modal isVisible={modalVisible.information}>
            <View style={styles.modalViewInfo}>
              <Text style={styles.modalTypeText}>Edit Information</Text>

              <View style={styles.infoContainer}>
                <View style={styles.infoItem}>
                  <Text style={styles.typeInfo}>First Name:</Text>
                  <TextInput
                    onChangeText={text => handleData('firstName', text)}
                    style={{...styles.modalInput, height: 40, width: 180}}
                    placeholder="Input your first name..."
                    value={info.firstName}
                    onEndEditing={e => {
                      validate.firstName(e.nativeEvent.text.trim());
                    }}
                  />
                </View>

                {errors.firstName ? (
                  <Text style={{color: '#ff3333', alignSelf: 'flex-start'}}>
                    {errors.firstName}
                  </Text>
                ) : null}

                <View style={styles.infoItem}>
                  <Text style={styles.typeInfo}>Last Name:</Text>
                  <TextInput
                    onChangeText={text => handleData('lastName', text)}
                    style={{...styles.modalInput, height: 40, width: 180}}
                    placeholder="Input your last name..."
                    value={info.lastName}
                    onEndEditing={e => {
                      validate.lastName(e.nativeEvent.text.trim());
                    }}
                  />
                </View>

                {errors.lastName ? (
                  <Text style={{color: '#ff3333', alignSelf: 'flex-start'}}>
                    {errors.lastName}
                  </Text>
                ) : null}

                <View style={styles.infoItem}>
                  <Text style={styles.typeInfo}>Address:</Text>
                  <TextInput
                    onChangeText={text => handleData('address', text)}
                    style={{...styles.modalInput, height: 40, width: 180}}
                    placeholder="Input your address..."
                    value={info.address}
                  />
                </View>

                <View style={styles.infoItem}>
                  <Text style={styles.typeInfo}>School:</Text>
                  <TextInput
                    onChangeText={text => handleData('school', text)}
                    style={{...styles.modalInput, height: 40, width: 180}}
                    placeholder="Input your school..."
                    value={info.school}
                  />
                </View>

                <View style={styles.infoItem}>
                  <Text style={styles.typeInfo}>Workplace:</Text>
                  <TextInput
                    onChangeText={text => handleData('work', text)}
                    style={{...styles.modalInput, height: 40, width: 180}}
                    placeholder="Input your workplace..."
                    value={info.work}
                  />
                </View>
                <Text style={styles.nodeText}>
                  Your gender and date of birth cannot be changed for security
                  reasons
                </Text>
              </View>

              <View style={styles.containerButton}>
                <TouchableOpacity
                  onPress={() => handleSave('information')}
                  style={{
                    ...styles.button,
                    backgroundColor: colors.mainColor,
                  }}>
                  <Text style={{color: colors.white, fontWeight: '500'}}>
                    Save
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    ...styles.button,
                    backgroundColor: colors.grayMain,
                  }}>
                  <Text
                    onPress={() => {
                      setModalVisible({information: false});
                      setInfo(infoTemp);
                    }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditProfile;
