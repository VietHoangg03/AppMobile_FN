import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import CustomInput from '@components/CustomInput/CustomInput';
import CustomButton from '@components/CustomButton/CustomButton';
import {setAlert} from '@redux/alertSlice';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {colors} from '@theme/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SendOTP = ({route, navigation}) => {
  const {email, otp} = route.params;
  const [otpInput, setOtpInput] = useState('');
  const dispatch = useDispatch();
  const {otpError} = useSelector(state => state.alert);

  const checkOtp = () => {
    if (otp === otpInput) {
      navigation.navigate('ChangePassword', {email});
    } else {
      dispatch(setAlert({type: 'otp', msg: 'Invalid OTP.'}));
    }
  };
  return (
    <View
      style={{
        marginHorizontal: 17,
        marginTop: 37,
      }}>
      <View style={styles.headerEdit}>
        <Ionicons
          name="arrow-back"
          style={styles.headerIcon}
          onPress={() => navigation.navigate('ForgotPassword')}
        />
        <Text style={styles.headerText}>Back</Text>
      </View>
      <Text
        style={{
          marginLeft: 2,
          marginBottom: 12,
          fontWeight: '600',
          fontSize: 16,
        }}>
        Please check your email account for the verification code we just sent
        you and enter that code below
      </Text>

      <CustomInput
        placeholder={'Enter OTP'}
        value={otpInput}
        setValue={setOtpInput}
      />

      {otpError ? (
        <Text
          style={{
            color: 'red',
            borderRadius: 10,
            padding: 10,
          }}>
          {otpError}
        </Text>
      ) : null}

      <CustomButton text="Check OTP" onPress={checkOtp} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 50,
  },

  headerEdit: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
    position: 'relative',
  },

  headerIcon: {
    fontSize: 24,
  },

  headerText: {
    fontSize: 20,
    marginLeft: 10,
  },
});

export default SendOTP;
