import {View, Text, StyleSheet, Pressable} from 'react-native';
import React, {useState} from 'react';
import {postDataAPI} from '@utils/fetchData';
import CustomInput from '@components/CustomInput/CustomInput';
import CustomButton from '@components/CustomButton/CustomButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useReveal} from '@hooks/useReveal';
import {validatePassword, validateConfirmPassword} from '@utils/validate';

const ChangePassword = ({navigation, route}) => {
  const {email} = route.params;
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({
    password: '',
    confirmPassword: '',
  });
  const {passwordVisibility, rightIcon, handlePasswordVisibility} = useReveal();
  const {
    passwordVisibility: confirmPasswordVisibility,
    rightIcon: rightIconConfirm,
    handlePasswordVisibility: handleCofirmPasswordVisibility,
  } = useReveal();

  const changePass = async () => {
    if (!password) {
      setErrors(preState => ({
        ...preState,
        password: 'Please add your password.',
      }));
    }
    if (!confirmPassword) {
      setErrors(preState => ({
        ...preState,
        confirmPassword: 'Please add your confirm password.',
      }));
    }

    if (
      !errors.password &&
      !errors.confirmPassword &&
      password &&
      confirmPassword
    ) {
      await postDataAPI('auth/changepassword', {email, password});
      navigation.navigate('Home');
    }
  };

  const validate = {
    password: function (password) {
      if (!password) {
        setErrors({...errors, password: 'Please add your password.'});
      } else if (!validatePassword(password)) {
        setErrors({
          ...errors,
          password: 'Password must be at least 8 characters.',
        });
      } else {
        setErrors({...errors, password: ''});
      }
    },
    confirmPassword: function (confirmPassword, password) {
      if (!confirmPassword) {
        setErrors({
          ...errors,
          confirmPassword: 'Please confirm your password.',
        });
      } else if (!validateConfirmPassword(confirmPassword, password)) {
        setErrors({
          ...errors,
          confirmPassword:
            'Confirm password field must have the same value as the password field.',
        });
      } else {
        setErrors({...errors, confirmPassword: ''});
      }
    },
  };

  return (
    <View style={{margin: 20}}>
      <View
        style={{
          flexDirection: 'row',
          paddingVertical: 10,
          alignItems: 'center',
          position: 'relative',
        }}>
        <Ionicons
          name="arrow-back"
          style={{fontSize: 24}}
          onPress={() => navigation.navigate('Home')}
        />
        <Text style={{fontSize: 18, marginLeft: 5}}>Back</Text>
      </View>
      <Text
        style={{
          marginBottom: 20,
          marginLeft: 2,
          fontWeight: '600',
          fontSize: 16,
        }}>
        OTP matched! Please enter your new password
      </Text>
      <View style={styles.inputContainer}>
        <Text>New password</Text>
        <CustomInput
          placeholder={'Enter new password'}
          value={password}
          setValue={setPassword}
          secureTextEntry={passwordVisibility ? true : false}
          style={{padding: 20}}
          handleBlur={e => {
            validate.password(e.nativeEvent.text);
          }}
        />
        {password ? (
          <Pressable
            style={{position: 'absolute', right: 10, top: 42}}
            onPress={handlePasswordVisibility}>
            <Ionicons name={rightIcon} size={22} color="#232323" />
          </Pressable>
        ) : null}
      </View>

      {errors.password ? (
        <Text style={{color: '#ff3333', alignSelf: 'flex-start'}}>
          {errors.password}
        </Text>
      ) : null}

      <View style={{position: 'relative'}}>
        <Text>Confirm new password</Text>
        <CustomInput
          placeholder={'Enter confirm password'}
          value={confirmPassword}
          setValue={setConfirmPassword}
          secureTextEntry={confirmPasswordVisibility ? true : false}
          style={{padding: 20}}
          handleBlur={e => {
            validate.confirmPassword(e.nativeEvent.text, password);
          }}
        />
        {confirmPassword ? (
          <Pressable
            style={{position: 'absolute', right: 10, top: 42}}
            onPress={handleCofirmPasswordVisibility}>
            <Ionicons name={rightIconConfirm} size={22} color="#232323" />
          </Pressable>
        ) : null}
      </View>

      {errors.confirmPassword ? (
        <Text style={{color: '#ff3333', alignSelf: 'flex-start'}}>
          {errors.confirmPassword}
        </Text>
      ) : null}

      <CustomButton onPress={changePass} text="Submit" />
    </View>
  );
};

const styles = StyleSheet.create({
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

export default ChangePassword;
