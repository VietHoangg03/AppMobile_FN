import React, {useEffect} from 'react';
import {socket} from '@utils/socket';
import {createStackNavigator} from '@react-navigation/stack';
import {isAuthenticated} from '@redux/authSlice';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useDispatch, useSelector} from 'react-redux';
import LogIn from '@screens/Auth/LogIn/LogIn';
import SignUp from '@screens/Auth/SignUp/SignUp';
import ForgotPassword from '@screens/Auth/ForgotPassword/ForgotPassword';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SendOTP from '@screens/Auth/ForgotPassword/SendOTP';
import ChangePassword from '@screens/Auth/ForgotPassword/ChangePassword';
import Profile from '@screens/Profile/Profile';
import GroupMembers from '@screens/GroupChat/GroupMembers';
import {WebRTCCall} from '@screens/WebRTCCall/WebRTCCall';
import Chat from '@screens/Chats/Stacks/Chat/Chat';
import Chats from '@screens/Chats/Chats';
import People from '@screens/People/People';
import Discover from '@screens/Discover/Discover';
import Camera from '@screens/Camera/Camera';
import ConversationSettings from '@screens/Chats/Stacks/Convesation/ConversationSettings';
import EditProfile from '@screens/Profile/EditProfile/EditProfile';
import Story from '@components/Story/Story';
import GroupChat from '@screens/GroupChat/GroupChat';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {colors} from '@theme/colors';
import {getUsers} from '@redux/userSlice';

const Stack = createStackNavigator();

const Tab = createBottomTabNavigator();

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  useEffect(() => {
    if (auth?.token) {
      dispatch(getUsers(auth?.token));
    }
  }, [auth]);

  useEffect(() => {
    socket.on(
      'video-call-start',
      ({sender, receiver, conversationId, offer, isVideoCall}) => {
        console.log(sender, receiver, conversationId, offer, isVideoCall);
        navigation.push('WebRTCCall', {
          sender: receiver,
          receiver: sender,
          conversationId,
          isCaller: false,
          sdp: offer,
          isVideoCall,
        });
      },
    );
  }, [socket]);

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          let icon = false;

          if (route.name === 'Chats') {
            iconName = focused ? (
              <Ionicons name="chatbubble" style={{fontSize: 28}} />
            ) : (
              <Ionicons
                name="chatbubble"
                style={{color: colors.grayMain, fontSize: 28}}
              />
            );
          } else if (route.name === 'People') {
            iconName = focused ? (
              <Ionicons name="people" style={{fontSize: 28}} />
            ) : (
              <Ionicons
                name="people"
                style={{color: colors.grayMain, fontSize: 28}}
              />
            );
          } else if (route.name === 'Discover') {
            iconName = focused ? (
              <MaterialIcons name="explore" style={{fontSize: 28}} />
            ) : (
              <MaterialIcons
                name="explore"
                style={{color: colors.grayMain, fontSize: 28}}
              />
            );
          } else if (route.name === 'Profile') {
            icon = true;
            iconName = focused ? 'user-circle' : 'user-circle-o';
          }

          // You can return any component that you like here!
          return icon ? (
            <FontAwesome name={iconName} style={{fontSize: 24}} />
          ) : (
            iconName
          );
        },
        headerShown: false,
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarShowLabel: false,
        tabBarStyle: [
          {
            display: 'flex',
          },
          null,
        ],
      })}>
      <Tab.Screen name="Chats" component={Chats} />
      <Tab.Screen name="People" component={People} />
      <Tab.Screen name="Discover" component={Discover} />
    </Tab.Navigator>
  );
};

export const RootNavigator = () => {
  const auth = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const getToken = async () => {
      const res = await AsyncStorage.getItem('@user_token');
      const id = await AsyncStorage.getItem('@id');

      dispatch(
        isAuthenticated({
          access_token: res,
          id,
        }),
      );
    };

    if (!auth.token) {
      getToken();
    }
  }, []);

  useEffect(() => {
    const getToken = async () => {
      const id = await AsyncStorage.getItem('@id');

      if (id) {
        socket.auth = {
          userId: id,
        };
      }

      socket.connect();
    };

    getToken();

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <Stack.Navigator>
      {/* {userState.isAuthenticated === false ? ( */}
      <Stack.Screen
        name="Home"
        component={auth.token ? Home : LogIn}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SendOTP"
        component={SendOTP}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="GroupMembers"
        component={GroupMembers}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="WebRTCCall"
        component={WebRTCCall}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Camera"
        component={Camera}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ConversationSettings"
        component={ConversationSettings}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Story"
        component={Story}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="GroupChat"
        component={GroupChat}
        options={{
          headerShown: false,
        }}
      />
      {/* <Stack.Screen
        name="OutgoingCall"
        component={OutgoingCall}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="IncomingCall"
        component={IncomingCall}
        options={{
          headerShown: false,
        }}
      /> */}
    </Stack.Navigator>
  );
};
