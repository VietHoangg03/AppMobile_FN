import {View, Text, Image, ScrollView, Pressable} from 'react-native';
import React, {useState} from 'react';
import {styles} from './SignUp.styles';
import {images} from '@images/index';
import {colors} from '@theme/colors';
import CustomInput from '@components/CustomInput/CustomInput';
import CustomButton from '@components/CustomButton/CustomButton';
import CustomRadio from '@components/CustomRadio/CustomRadio';
import {useDispatch, useSelector} from 'react-redux';
import {register} from '@redux/authSlice';
import {useReveal} from '@hooks/useReveal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {addUser} from '@redux/userSlice';
import {postDataAPI} from '@utils/fetchData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  validateBirthday,
  validateConfirmPassword,
  validateDate,
  validateEmail,
  validateName,
  validatePassword,
} from '@utils/validate';

const SignUp = ({navigation}) => {
  const [info, setInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    dateOfBirth: '',
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    dateOfBirth: '',
  });

  const {passwordVisibility, rightIcon, handlePasswordVisibility} = useReveal();

  const {
    passwordVisibility: confirmPasswordVisibility,
    rightIcon: rightIconConfirm,
    handlePasswordVisibility: handleCofirmPasswordVisibility,
  } = useReveal();

  const dispatch = useDispatch();
  const error = useSelector(state => state.alert?.error);

  const radioButtonsData = [
    {
      id: '0',
      label: 'Male',
      value: 'Male',
    },
    {
      id: '1',
      label: 'Female',
      value: 'Female',
    },
    {
      id: '2',
      label: 'Others',
      value: 'Others',
    },
  ];

  const handleData = (field, text) => {
    setInfo({...info, [field]: text});
  };

  const onLogIn = () => {
    navigation.navigate('Home');
  };

  const onSignUp = async () => {
    const {
      email,
      password,
      confirmPassword,
      dateOfBirth,
      gender,
      firstName,
      lastName,
    } = info;
    if (!email) {
      setErrors(preState => ({...preState, email: 'Please add your email.'}));
    }
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
    if (!firstName) {
      setErrors(preState => ({
        ...preState,
        firstName: 'Please add your first name.',
      }));
    }
    if (!lastName) {
      setErrors(preState => ({
        ...preState,
        lastName: 'Please add your last name.',
      }));
    }
    if (!gender) {
      setErrors(preState => ({
        ...preState,
        gender: 'Please select your gender.',
      }));
    }
    if (!dateOfBirth) {
      setErrors(preState => ({
        ...preState,
        dateOfBirth: 'Please add your date of birth.',
      }));
    }

    if (
      !errors.email &&
      !errors.password &&
      !errors.dateOfBirth &&
      !errors.gender &&
      !errors.firstName &&
      !errors.lastName &&
      !errors.confirmPassword
    ) {
      // const res = await postDataAPI('auth/register', info);

      // dispatch(addUser(res.data.user));

      // await AsyncStorage.setItem('@user_token', res.data.access_token);

      // navigation.navigate('Home', {token: res.data.access_token});

      dispatch(register(info));

      navigation.navigate('Home');
    }
  };

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
    firstName: function (firstName) {
      if (!firstName) {
        setErrors({...errors, firstName: 'Please add your first name.'});
      } else if (!validateName(firstName)) {
        setErrors({
          ...errors,
          firstName: 'Name can only contain non-numeric characters.',
        });
      } else {
        setErrors({...errors, firstName: ''});
      }
    },
    lastName: function (lastName) {
      if (!lastName) {
        setErrors({...errors, lastName: 'Please add your last name.'});
      } else if (!validateName(lastName)) {
        setErrors({
          ...errors,
          lastName: 'Name can only contain non-numeric characters.',
        });
      } else {
        setErrors({...errors, lastName: ''});
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
    gender: function (gender) {
      if (!gender) {
        setErrors({...errors, gender: 'Please select your gender.'});
      } else {
        setErrors({...errors, gender: ''});
      }
    },
    dateOfBirth: function (dob) {
      if (!dob) {
        setErrors({...errors, dateOfBirth: 'Please add your date of birth.'});
      } else if (!validateDate(dob)) {
        setErrors({
          ...errors,
          dateOfBirth: 'Please enter a valid date (format MM/DD/YYYY)',
        });
      } else if (validateBirthday(dob) !== 'valid') {
        setErrors({
          ...errors,
          dateOfBirth: validateBirthday(dob),
        });
      } else {
        setErrors({...errors, dateOfBirth: ''});
      }
    },
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={images.Logo} style={styles.logo} resizeMode="contain" />

      <Text style={styles.text}>Welcome to FlashMessage</Text>

      <CustomButton
        onPress={onLogIn}
        text="Already have account? Log In"
        type="TERTIARY"
        fgColor={colors.secondColor}
      />

      <CustomInput
        placeholder="First Name"
        value={info.firstName}
        setValue={text => handleData('firstName', text)}
        handleBlur={e => {
          validate.firstName(e.nativeEvent.text.trim());
        }}
      />

      {errors.firstName ? (
        <Text style={{color: '#ff3333', alignSelf: 'flex-start'}}>
          {errors.firstName}
        </Text>
      ) : null}

      <CustomInput
        placeholder="Last Name"
        value={info.lastName}
        setValue={text => handleData('lastName', text)}
        handleBlur={e => {
          validate.lastName(e.nativeEvent.text.trim());
        }}
      />

      {errors.lastName ? (
        <Text style={{color: '#ff3333', alignSelf: 'flex-start'}}>
          {errors.lastName}
        </Text>
      ) : null}

      <CustomInput
        placeholder="Email"
        value={info.email}
        setValue={text => handleData('email', text)}
        handleBlur={e => {
          validate.email(e.nativeEvent.text);
        }}
      />

      {errors.email ? (
        <Text style={{color: '#ff3333', alignSelf: 'flex-start'}}>
          {errors.email}
        </Text>
      ) : null}

      <View style={styles.inputContainer}>
        <CustomInput
          placeholder="Password"
          value={info.password}
          setValue={text => handleData('password', text)}
          secureTextEntry={passwordVisibility ? true : false}
          style={{padding: 20}}
          handleBlur={e => {
            validate.password(e.nativeEvent.text);
          }}
        />
        {info.password ? (
          <Pressable style={styles.reveal} onPress={handlePasswordVisibility}>
            <Ionicons name={rightIcon} size={22} color="#232323" />
          </Pressable>
        ) : null}
      </View>

      {errors.password ? (
        <Text style={{color: '#ff3333', alignSelf: 'flex-start'}}>
          {errors.password}
        </Text>
      ) : null}

      <View style={styles.inputContainer}>
        <CustomInput
          placeholder="Confirm password"
          value={info.confirmPassword}
          setValue={text => handleData('confirmPassword', text)}
          secureTextEntry={confirmPasswordVisibility ? true : false}
          style={{padding: 20}}
          handleBlur={e => {
            validate.confirmPassword(e.nativeEvent.text, info.password);
          }}
        />
        {info.confirmPassword ? (
          <Pressable
            style={styles.reveal}
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

      <CustomInput
        placeholder="Date of birth"
        value={info.dateOfBirth}
        setValue={text => handleData('dateOfBirth', text)}
        handleBlur={e => {
          validate.dateOfBirth(e.nativeEvent.text);
        }}
      />

      {errors.dateOfBirth ? (
        <Text style={{color: '#ff3333', alignSelf: 'flex-start'}}>
          {errors.dateOfBirth}
        </Text>
      ) : null}

      <CustomRadio
        radioButtonsData={radioButtonsData}
        layout="row"
        setValue={text => {
          validate.gender(text);
          handleData('gender', text);
        }}
      />

      {errors.gender ? (
        <Text style={{color: '#ff3333', alignSelf: 'flex-start'}}>
          {errors.gender}
        </Text>
      ) : null}

      <View
        style={{
          marginBottom: 80,
          marginTop: 15,
        }}>
        <Text style={{marginVertical: 10, marginBottom: 15, marginLeft: 3}}>
          By choosing Sign Up, you agree to our{' '}
          <Text style={{color: colors.mainColor}}>Terms, Data Policy</Text>. You
          may receive SMS notifications or email from us and can opt out at
          anytime.
        </Text>

        {error ? (
          <Text
            style={{
              backgroundColor: '#ffa00a',
              color: '#fff',
              borderRadius: 10,
              padding: 10,
              marginVertical: 10,
            }}>
            {error}
          </Text>
        ) : null}
        <CustomButton onPress={onSignUp} text="Sign Up" />
      </View>
    </ScrollView>
  );
};

export default SignUp;
