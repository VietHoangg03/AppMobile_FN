import {StyleSheet} from 'react-native';
import {colors} from '@theme/colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingVertical: 15,
    paddingHorizontal: 15,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  userName: {
    fontSize: 13,
    fontWeight: '400',
    color: colors.zblack,
    textAlign: 'center',
  },

  userIconContainer: {
    alignItems: 'center',
    marginRight: 15,
    width: 66,
  },

  storyAvatar: {
    height: 55,
    width: 55,
    borderRadius: 50,
  },
  addImageIcon: {
    width: 40,
    height: 40,
  },
});
