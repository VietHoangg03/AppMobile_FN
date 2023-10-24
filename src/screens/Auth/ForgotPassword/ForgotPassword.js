import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import CustomInput from '@components/CustomInput/CustomInput';
import CustomButton from '@components/CustomButton/CustomButton';
import {postDataAPI} from '@utils/fetchData';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {setAlert} from '@redux/alertSlice';
import {useSelector, useDispatch} from 'react-redux';
import {colors} from 'react-native-elements';
import {validateEmail} from '@utils/validate';

const ForgotPassword = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const {forgotError} = useSelector(state => state.alert);
  const [errors, setErrors] = useState({
    email: '',
  });
  const dispatch = useDispatch();

  const validate = {
    email: function (email) {
      if (!email) {
        setErrors({...errors, email: 'Please add your email.'});
      } else if (!validateEmail(email)) {
        setErrors({...errors, email: 'Please enter a valid email address.'});
      } else {
        setErrors({...errors, email: ''});
      }
    },
  };

  const sendAccountGetOTP = async () => {
    try {
      const res = await postDataAPI('auth/forgot', {email});

      if (res.data) {
        const otp = await postDataAPI('auth/otp', {email});

        if (otp.data) {
          navigation.navigate('SendOTP', {email, otp: otp.data.otp});
          dispatch(setAlert({type: 'forgotPassword', msg: ''}));
        }
      }
    } catch (e) {
      dispatch(setAlert({type: 'forgotPassword', msg: e.response.data.msg}));
    }
  };
  return (
    <View
      style={{
        marginHorizontal: 17,
        marginTop: 34,
      }}>
      <View style={styles.headerEdit}>
        <Ionicons
          name="arrow-back"
          style={styles.headerIcon}
          onPress={() => navigation.navigate('Home')}
        />
        <Text style={styles.headerText}>Back</Text>
      </View>
      <Text
        style={{
          marginBottom: 12,
          marginLeft: 2,
          fontWeight: '600',
          fontSize: 16,
        }}>
        Enter Your Account To Receive OTP
      </Text>

      <CustomInput
        placeholder={'Please enter your email'}
        value={email}
        setValue={setEmail}
        handleBlur={e => {
          validate.email(e.nativeEvent.text);
        }}
      />

      {errors.email ? (
        <Text style={{color: '#ff3333', alignSelf: 'flex-start'}}>
          {errors.email}
        </Text>
      ) : null}

      {forgotError ? (
        <Text
          style={{
            backgroundColor: '#ffa00a',
            color: '#fff',
            borderRadius: 10,
            padding: 10,
            marginVertical: 10,
          }}>
          {forgotError}
        </Text>
      ) : null}

      <CustomButton onPress={sendAccountGetOTP} text="Submit" />

      {/* <Toast ref={ref => Toast.setRef(ref)} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  headerEdit: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 20,
  },
  headerIcon: {
    fontSize: 20,
    color: colors.blackApp,
  },

  headerText: {
    fontSize: 18,
    marginLeft: 10,
    color: colors.blackApp,
  },
});

export default ForgotPassword;
