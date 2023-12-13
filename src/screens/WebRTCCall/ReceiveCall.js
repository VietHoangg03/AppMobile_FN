// import {Avatar} from 'native-base';
import React from 'react';
import {View, StyleSheet, Text, Image, ImageBackground} from 'react-native';
import {ButtonCall} from '@components/ButtonCall/ButtonCall';
import {axiosAuth, getAvatarUrl} from '@libs';

export default function ReceiveCall({join, hangup, remoteInfo}) {
  return (
    <ImageBackground
      blurRadius={10}
      source={{uri: remoteInfo.avatar}}
      resizeMode="cover"
      style={styles.container}>
      {remoteInfo && (
        <View style={styles.background}>
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
          <Text style={{color: '#fff'}}>
            {remoteInfo.fullName} is calling...
          </Text>
        </View>
      )}
      <View style={styles.btnContainer}>
        <ButtonCall onPress={join} iconName="call" backgroundColor="green" />
        <ButtonCall
          onPress={hangup}
          iconName="call-end"
          backgroundColor="red"
          style={{marginLeft: 30}}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  // background: {
  //   position: 'absolute',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   width: '100%',
  //   height: '100%',
  //   backgroundColor: '#fff',
  // },
  btnContainer: {
    flexDirection: 'row',
    top: 150,
  },
});
