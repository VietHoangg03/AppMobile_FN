import {StyleSheet, View, Text} from 'react-native';
import {colors} from '@theme/colors';
import LinearGradient from 'react-native-linear-gradient';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  logo: {
    width: '100%',
    height: 160,
    marginBottom: 30,
    marginTop: 30,
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
