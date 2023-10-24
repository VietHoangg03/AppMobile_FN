import {StyleSheet} from 'react-native';
import {colors} from '@theme/colors';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  logo: {
    width: '70%',
    height: 200,
  },
  text: {
    fontSize: 32,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 40,
  },
  inputContainer: {
    width: '100%',
    position: 'relative',
  },
  reveal: {
    position: 'absolute',
    right: 10,
    top: 22,
  },
});
