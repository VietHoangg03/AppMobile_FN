import React, {useMemo, useState} from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {styles} from './ConvesationSettings.styles';

export default function ConversationSettings({route, navigation}) {
  const avatar = route.params.avatar;
  const {username, status, receiveUser, members} = route.params.userInfo;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => navigation.navigate('Chat')}>
          <Entypo name="chevron-small-left" style={styles.back_icon} />
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.5}>
          <Feather name="more-vertical" style={styles.headerMore_icon} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View style={styles.userInfo}>
          <Image source={{uri: avatar}} style={styles.avatar} />
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.status}>{status}</Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity activeOpacity={0.5} style={styles.actions_content}>
            <View style={styles.actions_icon}>
              <Ionicons name="call" style={{fontSize: 20}} />
            </View>
            <Text style={styles.action_text}>Audio</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5} style={styles.actions_content}>
            <View style={styles.actions_icon}>
              <Ionicons name="videocam" style={{fontSize: 20}} />
            </View>
            <Text style={styles.action_text}>Video</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.actions_content}
            onPress={() =>
              navigation.navigate('Profile', {
                otherUser: receiveUser,
              })
            }>
            <View style={styles.actions_icon}>
              <Ionicons name="person" style={{fontSize: 20}} />
            </View>
            <Text style={styles.action_text}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5} style={styles.actions_content}>
            <View style={styles.actions_icon}>
              <FontAwesome name="bell" style={{fontSize: 20}} />
            </View>
            <Text style={styles.action_text}>Mute</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.settingList}>
          <TouchableOpacity activeOpacity={0.5} style={styles.settingList_item}>
            <Text style={styles.settingList_item_text}>Color</Text>
            <Ionicons
              name="md-heart-circle"
              style={styles.settingList_item_icon}
            />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5} style={styles.settingList_item}>
            <Text style={styles.settingList_item_text}>Emoji</Text>
            <AntDesign name="like1" style={styles.settingList_item_icon} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5} style={styles.settingList_item}>
            <Text style={styles.settingList_item_text}>Nicknames</Text>
            <Entypo
              name="chevron-right"
              style={styles.settingList_item_icon_2}
            />
          </TouchableOpacity>

          <View style={styles.settingList_item}>
            <Text style={styles.blur_text}>More actions</Text>
          </View>

          <TouchableOpacity activeOpacity={0.5} style={styles.settingList_item}>
            <Text style={styles.settingList_item_text}>
              Search in Conversation
            </Text>
            <Entypo
              name="magnifying-glass"
              style={styles.settingList_item_icon_2}
            />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.settingList_item}
            onPress={() =>
              navigation.navigate('GroupMembers', {
                members: members,
              })
            }>
            <Text style={styles.settingList_item_text}>See group members</Text>
            <Ionicons
              name="people-sharp"
              style={styles.settingList_item_icon_2}
            />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5} style={styles.settingList_item}>
            <Text style={styles.settingList_item_text}>Notifications</Text>
            <Entypo
              name="chevron-right"
              style={styles.settingList_item_icon_2}
            />
          </TouchableOpacity>

          <View style={styles.settingList_item}>
            <Text style={styles.blur_text}>Privacy</Text>
          </View>

          <TouchableOpacity activeOpacity={0.5} style={styles.settingList_item}>
            <Text style={styles.settingList_item_text}>Ignore Messages</Text>
            <MaterialCommunityIcons
              name="message-bulleted-off"
              style={styles.settingList_item_icon_2}
            />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5} style={styles.settingList_item}>
            <Text style={styles.settingList_item_text}>Block</Text>
            <Icon name="minus-circle" style={styles.settingList_item_icon_2} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5} style={styles.settingList_item}>
            <Text style={styles.settingList_item_text}>Report</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
