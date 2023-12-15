import {createSlice} from '@reduxjs/toolkit';
import {postDataAPI, getDataAPI} from '../utils/fetchData';
import {SERVER_URL} from '../utils/ip';
import axios from 'axios';

const uploadSlice = createSlice({
  name: 'upload',
  initialState: {
    image: '',
    video: '',
  },
  reducers: {
    getImageUrl(state) {
      return state.image;
    },
    setImageUrl(state, action) {
      state.image = action.payload;
    },
    getVideoUrl(state) {
      return state.video;
    },
    setVideoUrl(state, action) {
      state.video = action.payload;
    },
  },
});

export const uploadFile = async source => {
  try {
    const formData = new FormData();

    formData.append('file', {
      uri: source.uri,
      type: source.type,
      name: source.fileName,
    });
    formData.append('upload_preset', 'r3gh4fir');
    formData.append('cloud_name', 'ddxermrbe');
    const response = await axios.post(
      'https://api.cloudinary.com/v1_1/ddxermrbe/upload',
      formData,
    );
    console.log(response.data);
    return response.data.secure_url;
  } catch (err) {
    console.log(err);
  }
};

const {actions, reducer} = uploadSlice;

export const {getImageUrl, setImageUrl, getVideoUrl, setVideoUrl} = actions;

export default reducer;
