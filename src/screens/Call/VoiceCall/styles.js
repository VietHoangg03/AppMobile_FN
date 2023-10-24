import {StyleSheet} from 'react-native';
import {colors} from '@theme/colors';

export const styles = StyleSheet.create({
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },

  header: {
    paddingVertical: 40,
    backgroundColor: colors.gray01,
  },

  body: {
    paddingTop: 30,
  },

  bodyContainer: {
    display: 'flex',
    alignItems: 'center',
  },

  avatar: {
    height: 75,
    width: 75,
    borderRadius: 50,
    marginBottom: 10,
  },

  nameOfUser: {
    fontSize: 33,
    fontWeight: '700',
    color: colors.white,
  },

  stateCalling: {
    color: colors.grayMain,
    fontSize: 17,
  },

  footer: {
    position: 'absolute',
    bottom: 0,
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 20,
    width: '100%',
    paddingLeft: 12,
    backgroundColor: colors.blackFooter,
    borderTopLeftRadius: 19,
    borderTopRightRadius: 19,
  },

  otherButtons: {
    marginHorizontal: 18,
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: 'gray',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  otherButtonIcons: {
    fontSize: 23,
    color: colors.white,
  },

  endCallButton: {
    marginHorizontal: 18,
  },

  endCallButtonIcon: {
    width: 60,
    height: 60,
  },

  footerIncoming: {
    position: 'absolute',
    bottom: 0,
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 45,
    width: '100%',
  },

  buttonIncoming: {
    marginHorizontal: 72,
  },

  incomingButtonImg: {
    width: 60,
    height: 60,
    marginBottom: 10,
  },

  incomingButtonText: {
    fontSize: 15,
    color: colors.grayMain,
  },
});
