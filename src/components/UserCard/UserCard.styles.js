import {Dimensions, StyleSheet} from 'react-native';
import {colors} from '@theme/colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    paddingVertical: 15,
    paddingHorizontal: 15,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userName: {
    fontSize: 16,
    fontWeight: '400',
    color: colors.gray02,
    marginLeft: 5,
    width: '85%',
    position: 'relative',
    top: 8,
    paddingBottom: 12,
    borderBottomColor: colors.grayMain,
    borderBottomWidth: 1,
  },
  userAvatar: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 500,
  },
});
