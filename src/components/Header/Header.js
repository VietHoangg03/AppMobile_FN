import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity, Linking} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {images} from '@images';
import {styles} from './Header.styles';
import {logout} from '@redux/authSlice';

const Header = ({heading, icon1, icon2, navigation, loggedUser}) => {
  const dispatch = useDispatch();

  // const theme = useSelector((state) => state.theme);
  // const [themeMode, setThemeMode] = useState(false);
  // useEffect(() => {
  //   const storeData = async () => {
  //     try {
  //       await AsyncStorage.setItem("theme", themeMode);
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };
  //   storeData();
  // }, [themeMode]);

  // const handleTheme = () => {
  //   setThemeMode(!themeMode);
  //   dispatch(editTheme(!theme.isDark));
  // };

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image style={styles.avatar} source={{uri: loggedUser?.avatar}} />
        </TouchableOpacity>
        <Text style={styles.title}>{heading}</Text>
      </View>

      <View style={styles.row}>
        {/* a.k.a Logout button */}
        <TouchableOpacity onPress={handleLogout}>
          {/* <MaterialIcons name="logout" style={{ fontSize: 26, marginRight: 12, }} /> */}
          <Image style={styles.iconLogout} source={images.logout} />
        </TouchableOpacity>

        <Image style={styles.iconCam} source={icon1} />

        {/* a.k.a New message button */}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('GroupChat');
          }}>
          <Image style={styles.icon} source={icon2} />
        </TouchableOpacity>

        {/* <TouchableOpacity onPress={() => navigation.navigate('CreateChat')}>
          <Image style={styles.icon} source={icon2} />
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default Header;
