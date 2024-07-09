import React, { useState, useRef, useEffect } from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Text,
} from 'react-native';
import { useRouter } from 'expo-router';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
// import OTPTextInput from 'react-native-otp-textinput';

import Input from '@/components/Input';
import Spacer from '@/components/Spacer';
import AuthLink from '@/components/AuthLink';
import SafeAreaViewComponent from '@/components/SafeAreaView';

import { isEmail } from '@/utils/Validation';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { setError, signUp } from '@/redux/slices/auth/authSlice';

const schema = z.object({
  email: z.string().email({ message: 'Invalid Email' }),
  password: z.string().min(8, { message: 'Minimum 8 characters' }),
});

type FormData = {
  email: string;
  password: string;
};

const Register = () => {
  const router = useRouter();
  // const otpInput = useRef<OTPTextInput>(null);
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector(state => state.auth);

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm({
    defaultValues: {
      email: 'janani@gmail.com',
      password: '1234567822',
    },
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    return () => {
      dispatch(setError(null));
    };
  }, []);

  const register = async ({ email, password }: FormData) => {
    if (email && password) {
      dispatch(
        signUp({ email, password }, () => {
          reset();
          dispatch(setError(null));
          router.replace('/(auth)/login');
        })
      );
    }
  };

  return (
    <KeyboardAvoidingView
      {...(Platform.OS === 'ios' ? { behavior: 'padding' } : {})}
      style={{ flex: 1 }}>
      <SafeAreaViewComponent>
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flex: 1 }}
          keyboardShouldPersistTaps={'always'}>
          <View style={styles.container}>
            <View style={styles.formContainer}>
              <View style={styles.imageContainer}>
                {/* <Image
                source={require('@/assets/images/app-screen-icon.png')}
                style={styles.image}
                resizeMode="contain"
              /> */}
                <Text style={styles.label}>Sign Up</Text>
              </View>
              <Spacer height={10} />
              <View style={styles.loginContainer}>
                <Controller
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter Email"
                      label="Email"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoComplete="off"
                      onBlur={field.onBlur}
                      onChangeText={field.onChange}
                      error={errors.email?.message}
                    />
                  )}
                  name="email"
                />
                <Spacer height={20} />
                <Controller
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter password"
                      label="Password"
                      autoCapitalize="none"
                      isPassword
                      onBlur={field.onBlur}
                      onChangeText={field.onChange}
                      error={errors.password?.message}
                    />
                  )}
                  name="password"
                />
                <View style={styles.errorContainer}>
                  {error ? <Text style={styles.error}>{error}</Text> : null}
                </View>
                <Spacer height={10} />
                <View style={styles.btnContainer}>
                  <TouchableOpacity
                    style={[styles.button, !isDirty || isLoading ? styles.disable : {}]}
                    onPress={handleSubmit(register)}>
                    {isLoading ? (
                      <ActivityIndicator animating color={'#14141D'} style={styles.loader} />
                    ) : null}
                    <Text style={[styles.title, isLoading ? styles.textDisable : {}]}>Sign Up</Text>
                  </TouchableOpacity>
                </View>
                <Spacer height={50} />
                <AuthLink
                  linkText="Sign In"
                  description="Already have an account ?"
                  onPress={() => {
                    router.replace('/login');
                  }}
                />
                <Spacer height={50} />
                {/* <OTPTextInput
                  ref={otpInput}
                  inputCount={6}
                  containerStyle={styles.textInputContainer}
                  textInputStyle={styles.roundedTextInput}
                  inputCellLength={1} tintColor="#FFCA3A" offTintColor="#ffca3a87"
                  keyboardType='numeric'
                  autoFocus={true}></OTPTextInput> */}
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaViewComponent>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -20,
  },
  image: {
    height: 200,
    width: 200,
  },
  loginContainer: {
    justifyContent: 'center',
    paddingHorizontal: 35,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  btnContainer: {
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#FFCA3A',
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 25,
  },
  loader: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#14141D',
    fontWeight: '600',
    fontSize: 16,
    fontFamily: 'Avenir-Black',
  },
  disable: {
    opacity: 0.7,
  },
  textDisable: { opacity: 0 },
  errorContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    display: 'flex',
    width: '100%',
    paddingTop: 20,
    paddingBottom: 10,
  },
  error: {
    fontSize: 14,
    color: 'red',
    fontFamily: 'Avenir-Book',
  },
  label: {
    fontSize: 30,
    color: '#FFFFFF',
    fontWeight: '800',
    marginBottom: 2,
    fontFamily: 'Avenir-Black',
  },
  textInputContainer: {
    marginBottom: 20,
  },
  roundedTextInput: {
    borderRadius: 16,
    borderWidth: 4,
    color: '#FFCA3A',
    padding: 0,
    fontSize: 28,
    lineHeight: 33,
    fontWeight: '700',
    verticalAlign: 'middle',
  },
});

export default Register;
