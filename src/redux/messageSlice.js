import {createSlice} from '@reduxjs/toolkit';
import {postDataAPI, getDataAPI} from '../utils/fetchData';

const messageSlice = createSlice({
  name: 'message',
  initialState: {},
  reducers: {
    setCurrentMessages(state, action) {
      state.currentMessages = action.payload;
    },
  },
});

// Temporarily get all message in conversation
// export const fetchCurrentMessages =
//   (conversationId, token) => async dispatch => {
//     try {
//       console.log('ID FROM REDUX', conversationId);
//       const res = await getDataAPI(
//         `message/whole/conversation/${conversationId}`,
//         token,
//       );

//       if (res.status === 200) {
//         dispatch(setCurrentMessages(res.data));
//       } else {
//         console.log(res);
//       }
//     } catch (err) {
//       console.log(err);
//     }
//   };

export const fetchSendMessage =
  (conversationId, senderId, msgType, content, token) => async dispatch => {
    try {
      const res = await postDataAPI(
        'message/',
        {
          conversationId,
          senderId,
          msgType,
          content,
        },
        token,
      );

      if (res.status === 201) {
        return res.data;
      }
    } catch (err) {
      console.log(err);
    }
  };

const {actions, reducer} = messageSlice;

export const {getCurrentMessages, setCurrentMessages} = actions;

export default reducer;
