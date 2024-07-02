import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import Input from '@/components/Input';
import Spacer from '@/components/Spacer';
import AuthLink from '@/components/AuthLink';
import { useRouter } from 'expo-router';
import SafeAreaViewComponent from '@/components/SafeAreaView';
import { isEmail } from '@/utils/Validation';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/firebaseConfig';


type StateType = string | undefined;

export default function SignIn() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<StateType>('elavarasan@gmail.com');
  const [password, setPassword] = useState<StateType>('12345678');
  const [errors, setErrors] = useState<{ email: string; password: string }>({
    email: '',
    password: ''
  });
  const [isAuthError, setIsAuthError] = useState<string>();

  const signIn = async () => {
    setIsAuthError('');
    if (!isEmail(email)) {
      setErrors((state) => ({ ...state, email: 'Invalid email' }));
      return false;
    }
    if (!password) {
      setErrors((state) => ({
        ...state,
        password: 'Password cannot be an empty'
      }));
      return false;
    }

    setErrors({ email: '', password: '' });
    setIsLoading(true);
    if (email && password) {
      await signInWithEmailAndPassword(auth, email, password)
        .then(async ({ user }) => {
          router.replace('/dashboard');
          setEmail('');
          setPassword('');
        })
        .catch((error) => setIsAuthError(error.message))
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <KeyboardAvoidingView
      {...(Platform.OS === 'ios' ? { behavior: 'padding' } : {})}
      style={{ flex: 1 }}
    >
      <SafeAreaViewComponent>
      <ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flex: 1 }}
        keyboardShouldPersistTaps={'always'}
      >
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
            <View style={styles.errorContainer}>
              {isAuthError ? (
                <Text style={styles.error}>{isAuthError}</Text>
              ) : null}
            </View>
            <Spacer height={10} />
            <View style={styles.loginContainer}>
              <Input
                value={email}
                placeholder="Enter Email"
                label="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="off"
                onChangeText={(text) => {
                  setErrors({ email: '', password: '' });
                  setEmail(text);
                }}
                error={errors.email}
              />
              <Spacer height={20} />
              <Input
                value={password}
                placeholder="Enter password"
                label="Password"
                autoCapitalize="none"
                isPassword
                onChangeText={(text) => {
                  setErrors({ email: '', password: '' });
                  setPassword(text);
                }}
                error={errors.password}
              />
              <Spacer height={50} />
              <View style={styles.btnContainer}>
                <TouchableOpacity
                  style={[styles.button, isLoading ? styles.disable : {}]}
                  onPress={() => {
                    if (!isLoading) {
                      signIn();
                    }
                  }}
                >
                  {isLoading ? (
                    <ActivityIndicator
                      animating
                      color={'#14141D'}
                      style={styles.loader}
                    />
                  ) : null}
                  <Text
                    style={[styles.title, isLoading ? styles.textDisable : {}]}
                  >
                    Sign In
                  </Text>
                </TouchableOpacity>
              </View>
              <Spacer height={50} />
              <AuthLink
                linkText="Sign Up"
                description="Create account"
                onPress={() => {
                  router.navigate('/sign-up');
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
    marginLeft: -20
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
    opacity: 0.8,
  },
  textDisable: { opacity: 0 },
  errorContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  error: {
    fontSize: 16,
    color: 'red',
    fontFamily: 'Avenir-Book',
    paddingHorizontal: 35,
  },
  label: {
    fontSize: 30,
    color: '#FFFFFF',
    fontWeight: '800',
    marginBottom: 2,
    fontFamily: 'Avenir-Black'
  },
});
