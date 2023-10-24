import {StyleSheet} from 'react-native';
import {colors} from '@theme/colors';

export const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
  header: {
    height: '6%',
    flexDirection: 'row',
    paddingHorizontal: 8,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  back_icon: {
    fontSize: 50,
    color: colors.zblack,
  },
  headerMore_icon: {
    fontSize: 30,
    color: colors.zblack,
  },
  userInfo: {
    marginVertical: 8,
    alignItems: 'center',
  },
  avatar: {
    width: 125,
    height: 125,
    borderRadius: 100,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  status: {
    fontWeight: '100',
  },
  actions: {
    flexDirection: 'row',
    marginVertical: 16,
    justifyContent: 'space-evenly',
  },
  actions_content: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  actions_icon: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.gray01,
    borderRadius: 100,
  },
  action_text: {
    fontSize: 12,
    color: colors.zblack,
  },
  settingList: {
    marginHorizontal: 16,
  },
  settingList_item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  blur_text: {
    color: colors.blackApp,
  },
  settingList_item_text: {
    fontSize: 15,
  },
  settingList_item_icon: {
    color: colors.mainColor,
    fontSize: 30,
  },
  settingList_item_icon_2: {
    color: colors.gray02,
    fontSize: 28,
  },
});
