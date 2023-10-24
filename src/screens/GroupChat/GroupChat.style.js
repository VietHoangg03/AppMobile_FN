import {StyleSheet} from 'react-native';
import {colors} from '@theme/colors';

export const styles = StyleSheet.create({
  container: {},

  header: {
    display: 'flex',
    flexDirection: 'row',
    borderBottomColor: 'rgba(0, 0, 0, 0.07)',
    borderBottomWidth: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 15,
    paddingVertical: 16,
    alignItems: 'center',
  },

  arrow_back: {
    paddingRight: 32,
    backgroundColor: colors.white,
  },

  backIcon: {
    backgroundColor: colors.white,
    color: colors.zblack,
    fontSize: 28,
  },

  heading: {
    paddingRight: 84,
  },

  headingText: {
    color: colors.zblack,
    fontSize: 22,
    fontWeight: '600',
  },

  containNextBtn: {
    backgroundColor: colors.white,
  },

  nextBtn: {},

  nextBtnText: {
    marginLeft: 20,
    fontSize: 19,
    fontWeight: '600',
    color: colors.mainColor,
  },

  searchBox: {
    backgroundColor: colors.white,
    paddingVertical: 8,
    paddingHorizontal: 3,
  },

  titleInputView: {
    paddingHorizontal: 17,
    paddingTop: 10,
    paddingBottom: 30,
    backgroundColor: colors.white,
  },

  inputTitle: {
    fontSize: 16,
    borderBottomColor: 'rgba(0, 0, 0, 0.07)',
    borderBottomWidth: 1,
    paddingBottom: 2,
  },

  listUser: {
    // overflow: 'scroll',
  },

  preMemberView: {
    backgroundColor: colors.white,
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 11,
  },

  preMemberContainer: {
    display: 'flex',
    flexDirection: 'row',
  },

  userSlot: {
    backgroundColor: colors.white,
    position: 'relative',
    marginRight: 30,
  },

  userSlotAvatar: {
    height: 60,
    width: 60,
    borderRadius: 50,
  },

  userItemContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: 'center',
    backgroundColor: colors.white,
  },
  userIcon: {
    width: 60,
    height: 60,
    flex: 1,
    borderRadius: 50,
  },
  userDetailsSectionContainer: {
    marginLeft: 15,
    flexDirection: 'row',
    flex: 5,
    justifyContent: 'space-between',
  },
  label1: {
    color: colors.zblack,
    fontSize: 17,
    fontWeight: '500',
    lineHeight: 22,
  },
  label2: {
    color: colors.zblack,
    opacity: 0.5,
    fontWeight: '400',
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: colors.white,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  checked: {
    position: 'relative',
    top: 10,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: 'blue',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
  },
  itemRowWrapper: {
    flexDirection: 'row',
  },
  itemRowIcon: {
    marginHorizontal: 5,
    width: 40,
    height: 40,
  },
});
