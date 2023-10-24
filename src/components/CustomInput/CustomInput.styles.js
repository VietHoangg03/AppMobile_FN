import {StyleSheet} from 'react-native';
import {colors} from '@theme/colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: '100%',
    borderColor: colors.gray01,
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  input: {
    fontSize: 16,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
});
