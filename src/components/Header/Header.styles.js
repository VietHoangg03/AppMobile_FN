import {StyleSheet} from 'react-native';
import {colors} from '@theme/colors';

export const styles = StyleSheet.create({
  container: {
    marginTop: 4,
    display: 'flex',
    backgroundColor: colors.white,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: '700',
  },

  iconLogout: {
    width: 25,
    height: 25,
    marginHorizontal: 5,
    marginVertical: 15,
    marginRight: 16,
  },

  icon: {
    width: 40,
    height: 40,
    marginHorizontal: 5,
    marginVertical: 15,
    marginRight: 15,
  },
  iconCam: {
    width: 40,
    height: 40,
    marginHorizontal: 5,
    marginVertical: 15,
    marginRight: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    marginHorizontal: 15,
    marginVertical: 15,
    borderRadius: 50,
  },
});
