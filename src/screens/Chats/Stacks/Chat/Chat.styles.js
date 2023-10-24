import {StyleSheet} from 'react-native';
import {colors} from '@theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: '#ffffff',
  },

  iconPhone: {
    height: 34,
    width: 36,
  },

  iconVideoCall: {
    height: 48,
    width: 48,
    marginLeft: 12,
  },

  iconFooter: {
    fontSize: 21,
    color: colors.mainColor,
    marginRight: 6,
    marginLeft: 6,
  },

  iconEmoji: {
    fontSize: 21,
    color: colors.mainColor,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.07)',
    borderBottomWidth: 1,
  },
  backIcon: {
    height: 38,
    width: 38,
    marginLeft: 8,
  },
  headerInfo: {
    flex: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  header_avatarIcon: {
    width: 30,
    height: 30,
    borderRadius: 1000,
    marginLeft: 16,
    marginRight: 8,
    alignSelf: 'center',
  },
  header_actions: {
    flex: 1.2,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginRight: 23,
  },
  body: {
    flex: 11,
    marginLeft: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 5,
    marginRight: 5,
    paddingVertical: 8,
  },
  preview: {
    position: 'absolute',
    width: 100,
    height: 200,
    top: -210,
    right: 16,
    elevation: 10,
  },
  previewVideo: {
    alignSelf: 'center',
    width: 100,
    height: 160,
  },
  previewClose: {
    width: 24,
    fontSize: 20,
    color: colors.white,
    padding: 2,
    borderRadius: 100,
    backgroundColor: colors.mainColor,
  },
  previewImg: {
    flex: 1,
    borderRadius: 10,
    marginBottom: 2,
  },
  previewSend: {
    width: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.mainColor,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  input: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.gray03,
    borderRadius: 19,
    height: 37,
    position: 'relative',
  },
  emojiMart: {
    position: 'absolute',
    bottom: 55,
    right: 0,
    width: 250,
    height: 250,
    overflow: 'scroll',
    backgroundColor: '#fff',
  },
  inputText: {
    flex: 1,
    paddingLeft: 11,
    color: colors.zblack,
    fontSize: 16,
  },
  inputEmoji: {
    padding: 4,
    paddingRight: 9,
  },

  four_points: {
    height: 23,
    width: 23,
  },

  camera_button: {
    height: 23,
    width: 23,
  },

  image_button: {
    height: 23,
    width: 23,
  },

  mic_button: {
    height: 22,
    width: 22,
  },

  like_button: {
    height: 37,
    width: 37,
  },

  send_button: {
    height: 20,
    width: 20,
  },

  emoji_button: {
    height: 24,
    width: 24,
  },
});
