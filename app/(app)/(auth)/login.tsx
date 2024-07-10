import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

import Input from '@/components/Input';
import Spacer from '@/components/Spacer';
import AuthLink from '@/components/AuthLink';
import SafeAreaViewComponent from '@/components/SafeAreaView';

import { logIn, setError } from '@/redux/slices/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

const schema = z.object({
  email: z.string().email({ message: 'Invalid Email' }),
  password: z.string().min(8, { message: 'Minimum 8 characters' }),
});

type FormData = {
  email: string;
  password: string;
};

export default function SignIn() {
  const router = useRouter();
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
      password: '12345678',
    },
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    return () => {
      dispatch(setError(null));
    };
  }, []);

  const onSubmit = ({ email, password }: FormData) => {
    dispatch(
      logIn({ email, password }, () => {
        reset();
        dispatch(setError(null));
        router.replace('/dashboard');
      })
    );
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
                <Text style={styles.label}>Login</Text>
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
                    onPress={handleSubmit(onSubmit)}>
                    {isLoading ? (
                      <ActivityIndicator animating color={'#14141D'} style={styles.loader} />
                    ) : null}
                    <Text style={[styles.title, isLoading ? styles.textDisable : {}]}>Sign In</Text>
                  </TouchableOpacity>
                </View>
                <Spacer height={50} />
                <AuthLink
                  linkText="Sign Up"
                  description="Create account"
                  onPress={() => {
                    router.replace('/sign-up');
                  }}
                />
                <Spacer height={50} />
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaViewComponent>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: -20,
  },
  loginContainer: {
    justifyContent: 'center',
    paddingHorizontal: 35,
  },
  image: {
    height: 200,
    width: 200,
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
});
