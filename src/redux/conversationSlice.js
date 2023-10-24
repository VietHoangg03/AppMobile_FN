import {createSlice} from '@reduxjs/toolkit';
import {postDataAPI, getDataAPI} from '../utils/fetchData';
import moment from 'moment';

export const defaultAvatarGroupChat =
  'https://preview.redd.it/hz1l8524rqv61.png?width=2926&format=png&auto=webp&s=1a6a33e36e9b594fd6ed77ee3e9ad7794ae25d39';

const conversationSlice = createSlice({
  name: 'conversation',

  initialState: {
    conversations: [],
    current_conversation: {},
    members: [],
    lastMessages: [],
  },

  reducers: {
    getConversations(state, action) {
      state.conversations = action.payload;
    },
    setLastMessages(state, action) {
      state.lastMessages = action.payload;
    },
    setConversations(state, action) {
      state.conversations = [...state.conversations, action.payload];
    },

    getCurrentConversation(state) {
      return state.current_conversation;
    },
    setCurrentConversation(state, action) {
      state.current_conversation = action.payload;
    },

    getMembers(state) {
      return state.members;
    },
    setMembers(state, action) {
      state.members = action.payload;
    },
  },
});

export const fetchConversations = (userId, token) => async dispatch => {
  try {
    const res = await getDataAPI(`conversation/user/${userId}`, token);

    const conversations = [];
    if (res.status === 200) {
      // Change title of Conversations whose title = '1vs1' into peerName

      for (const conversation of res.data.conversations) {
        const loggedIn = conversation.members.find(e => e.idUser === userId);
        if (conversation.title === '1vs1' && loggedIn.show) {
          let peerId =
            userId === conversation.members[0].idUser
              ? conversation.members[1].idUser
              : conversation.members[0].idUser;

          const peerRes = await getDataAPI(`user/${peerId}`, token);

          if (peerRes.status === 200) {
            conversation.title = peerRes.data.fullName;
            conversation.avatar = peerRes.data.avatar;
          }

          conversations.push(conversation);
        } else if (conversation.title !== '1vs1' && loggedIn.show) {
          // setup default avatar for conversations
          conversation.avatar = defaultAvatarGroupChat;
          conversations.push(conversation);
        }
      }

      // const res1 = await getDataAPI(`message/last`, token);

      // const {lastMessages} = res1.data;

      // const mapMess = res.data.conversations.map(e => e._id);

      // const lastMess = lastMessages
      //   .filter(mess => mapMess.includes(mess._id))
      //   .map(e => ({
      //     ...e,
      //     createdAt: moment(e.createdAt).format('HH:mm'),
      //   }));

      // dispatch(setLastMessages(lastMess));

      dispatch(getConversations(conversations));
    } else {
      console.log(res);
    }
  } catch (err) {
    console.log(err);
  }
};

export const fetchConversationById =
  (conversationId, token) => async dispatch => {
    try {
      const res = await getDataAPI(`conversation/id/${conversationId}`, token);

      if (res.status === 200) {
        dispatch(setCurrentConversation(res.data));
      } else {
        console.log(res);
      }
    } catch (err) {
      console.log(err);
    }
  };

export const fetchMembers = (conversationId, token) => async dispatch => {
  try {
    const res = await getDataAPI(
      `conversation/members/${conversationId}`,
      token,
    );

    if (res.status === 200) {
      dispatch(setMembers(res.data));
    } else {
      console.log(res);
    }
  } catch (err) {
    console.log(err);
  }
};

// export const fetchConversation1vs1 =
//   (peerA, peerB, token) => async dispatch => {
//     try {
//       const res = await getDataAPI(
//         `conversation/peers?peerA=${peerA}&peerB=${peerB}`,
//         token,
//       );

//       if (res.status === 200) {
//         const peerRes = await getDataAPI(`user/${peerB}`, token);

//         if (peerRes.status === 200) {
//           res.data.title = peerRes.data.fullName;
//           res.data.avatar = peerRes.data.avatar;
//         } else {
//           console.log(peerRes);
//         }
//         dispatch(setCurrentConversation(res.data));
//         dispatch(fetchCurrentMessages(res.data._id, token));
//       } else if (res.status === 204) {
//         const createNew1vs1 = await postDataAPI(
//           'conversation',
//           {title: '1vs1', members: [peerA, peerB]},
//           token,
//         );

//         dispatch(setConversations(createNew1vs1.data));
//         dispatch(setCurrentConversation(createNew1vs1.data));
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

export const fetchCreateConversation =
  (title, members, token) => async dispatch => {
    try {
      const res = await postDataAPI('conversation/', {title, members}, token);

      if (res.status === 201) {
        return res.data;
      } else {
        console.log(res);
      }
    } catch (err) {
      console.log(err);
    }
  };

const {actions, reducer} = conversationSlice;

export const {
  getConversations,
  setConversations,
  getCurrentConversation,
  setCurrentConversation,
  getMembers,
  setMembers,
  setLastMessages,
} = actions;

export default reducer;
