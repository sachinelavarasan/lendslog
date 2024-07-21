import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
} from 'react-native';
import Modal from 'react-native-modal';
import { useEffect, useState } from 'react';
import OTPTextInput from 'react-native-otp-textinput';
import SafeAreaViewComponent from '@/components/SafeAreaView';
import Spacer from '@/components/Spacer';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { otpValidation } from '@/utils/Validation';
import { deviceHeight, deviceWidth, getAsyncValue } from '@/utils/functions';
import { setError, verifyOtp, sendOtp } from '@/redux/slices/auth/authSlice';
import { useRouter } from 'expo-router';
import { useIsFocused } from '@react-navigation/native';

const MobileVerify = () => {
  const [otp, setOtp] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [isModalVisible, setModalVisible] = useState(false);

  const router = useRouter();
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();
  const { error , otpVerifyLoading } = useAppSelector(state => state.auth);

  const width = deviceWidth();
  const height = deviceHeight();

  useEffect(() => {
    if (isFocused) {
      sendOtpMob();
    }
  }, [isFocused]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleTextChange = (data: string) => {
    setOtp(data);
  };

  const verify = async () => {
    dispatch(
      verifyOtp({ code: otp, phone }, () => {
        dispatch(setError(null));
        toggleModal();
      })
    );
  };
  const sendOtpMob = async () => {
    const data = await getAsyncValue('@signup-user');
    if (data.phone) {
      setPhone(data.phone);
      dispatch(
        sendOtp({ phone: data.phone }, () => {
          dispatch(setError(null));
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
          contentContainerStyle={{ flex: 1, display: 'flex', alignItems: 'center' }}
          keyboardShouldPersistTaps={'always'}>
          <Spacer height={100} />
          <Text style={styles.header}>Enter OTP Code</Text>
          <Text style={styles.subtext}>
            Enter the 6-digit code that has been sent to {phone}
          </Text>
          <Spacer height={30} />
          <OTPTextInput
            inputCount={6}
            containerStyle={styles.textInputContainer}
            textInputStyle={styles.roundedTextInput}
            inputCellLength={1}
            tintColor="#FFCA3A"
            offTintColor="#ffca3a87"
            keyboardType="numeric"
            autoFocus={true}
            handleTextChange={handleTextChange}></OTPTextInput>
          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.error}>{error}</Text>
            </View>
          )}
          <Spacer height={50} />

          <TouchableOpacity
            style={[styles.button, otpVerifyLoading || !otpValidation(otp) ? styles.disable : {}]}
            onPress={verify}
            disabled={otpVerifyLoading || !otpValidation(otp)}>
            {otpVerifyLoading ? (
              <ActivityIndicator animating color={'#14141D'} style={styles.loader} />
            ) : null}
            <Text style={[styles.title, otpVerifyLoading ? styles.textDisable : {}]}>Verify</Text>
          </TouchableOpacity>
          <Modal
            isVisible={isModalVisible}
            hasBackdrop={true}
            deviceHeight={height}
            deviceWidth={width}
            coverScreen={true}>
            <View
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View
                style={{
                  backgroundColor: '#14141D',
                  width: width - 60,
                  borderRadius: 10,
                  paddingVertical: 30,
                  paddingHorizontal: 30,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    color: '#ffffff',
                    fontSize: 20,
                    textAlign: 'center',
                    lineHeight: 24,
                  }}>
                  Your mobile number has been verified successfully.
                </Text>
                <Spacer height={30} />
                <TouchableOpacity
                  style={[
                    styles.button,
                    {
                      width: 'auto',
                      paddingVertical: 12,
                      paddingHorizontal: 30,
                      backgroundColor: 'rgba(0, 176, 176, 0.6902)',
                    },
                  ]}
                  onPress={() => {
                    toggleModal();
                    setTimeout(() => {
                      router.replace('/(auth)/login');
                    }, 500);
                  }}>
                  <Text style={[styles.title]}>Login</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </ScrollView>
      </SafeAreaViewComponent>
    </KeyboardAvoidingView>
  );
};

export default MobileVerify;

const styles = StyleSheet.create({
  header: {
    fontSize: 28,
    color: '#FFFFFF',
    fontFamily: 'Inter-600',
  },
  subtext: {
    fontSize: 16,
    color: '#F2F2F2',
    fontFamily: 'Inter-600',
    paddingVertical: 20,
    maxWidth: 300,
    textAlign: 'center',
    lineHeight: 24,
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
    verticalAlign: 'middle',
  },
  button: {
    width: deviceWidth() - 60,
    textAlign: 'center',
    backgroundColor: '#FFCA3A',
    borderRadius: 8,
    paddingVertical: 16,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    position: 'absolute',
  },
  title: {
    color: '#000',
    fontSize: 18,
    fontFamily: 'Inter-500',
    textAlign: 'center',
  },
  disable: {
    opacity: 0.4,
  },
  textDisable: { opacity: 0 },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex',
    width: deviceWidth() - 60,
    paddingBottom: 10,
  },
  error: {
    fontSize: 16,
    color: 'red',
    fontFamily: 'Inter-400',
  },
});
