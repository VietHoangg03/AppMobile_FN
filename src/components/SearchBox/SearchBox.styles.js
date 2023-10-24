import {StyleSheet} from 'react-native';

import {colors} from '@theme/colors';

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: colors.white,
    position: 'relative',
    zIndex: 99999,
  },
  contentContainer: {
    flexDirection: 'row',
    backgroundColor: colors.gray01,
    padding: 10,
    marginHorizontal: 15,
    borderRadius: 50,
    display: 'flex',
    alignItems: 'center',
    height: 44,
  },
  searchIcon: {
    width: 16,
    height: 16,
    marginRight: 15,
    marginLeft: 11,
  },
  containerSearch: {
    position: 'absolute',
    flexDirection: 'column',
  },
  searchInput: {
    width: '100%',
    height: 50,
    fontSize: 15,
  },
  closeIcon: {
    position: 'absolute',
    zIndex: 99,
    right: 15,
    fontSize: 20,
  },
});
