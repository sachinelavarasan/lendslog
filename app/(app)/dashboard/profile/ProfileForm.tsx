import React, { useCallback, useEffect } from 'react';
import { useIsFocused } from '@react-navigation/native';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import Input from '@/components/Input';
import Spacer from '@/components/Spacer';

import CustomRadioButton from '@/components/CustomRadioButton';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { updateProfile, setError } from '@/redux/slices/auth/authSlice';

import { userSchema, userSchemaType } from '@/utils/schema';
import { genders } from '@/utils/common-data';

export default function ProfileForm({
  isEdit,
  setIsClicked,
}: {
  isEdit: boolean;
  setIsClicked: any;
}) {
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();
  const { user, error, isLoading } = useAppSelector(state => state.auth);

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      us_name: '',
      us_username: '',
      us_phone_no: '',
      us_address: '',
      us_gender: 0,
      us_state: '',
      us_district: '',
      us_pincode: '',
    },
    resolver: zodResolver(userSchema),
  });

  const resetData = useCallback(
    (user: userSchemaType) => {
      reset({
        us_name: user?.us_name,
        us_username: user?.us_username,
        us_phone_no: user?.us_phone_no,
        us_address: user?.us_address,
        us_gender: user?.us_gender,
        us_state: user?.us_state,
        us_district: user?.us_district,
        us_pincode: user?.us_pincode,
      });
    },
    [user]
  );

  useEffect(() => {
    if (isFocused && user) {
      resetData(user);
    }

    return () => {
      dispatch(setError(null));
    };
  }, [isFocused, user]);

  const onSubmit = (data: userSchemaType) => {
    console.log(data);
    dispatch(
      updateProfile(data, (user: userSchemaType) => {
        resetData(user);
        setIsClicked((state: any) => !state);
        dispatch(setError(null));
        // router.replace('/dashboard');
      })
    );
  };

  return (
    <View style={styles.formContainer}>
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.error}>{error}</Text>
        </View>
      )}
      <View>
        <View style={[styles.sectionContainer, { marginTop: 25 }]}>
          <Controller
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Enter your name"
                label="Name"
                keyboardType="default"
                autoCapitalize="none"
                autoComplete="off"
                onBlur={field.onBlur}
                onChangeText={field.onChange}
                error={errors.us_name?.message}
                borderLess
                editable={isEdit}
              />
            )}
            name="us_name"
          />
          <Spacer height={21} />
          <Controller
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Enter your username"
                label="Username"
                keyboardType="default"
                autoCapitalize="none"
                autoComplete="off"
                onBlur={field.onBlur}
                onChangeText={field.onChange}
                error={errors.us_username?.message}
                borderLess
                editable={isEdit}
              />
            )}
            name="us_username"
          />
          <Spacer height={21} />
          <Controller
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="+91XXXXXXXXXX"
                label="Phone number"
                autoCapitalize="none"
                onBlur={field.onBlur}
                onChangeText={field.onChange}
                error={errors.us_phone_no?.message}
                borderLess
                editable={isEdit}
              />
            )}
            name="us_phone_no"
          />
          <Spacer height={21} />
          <Controller
            control={control}
            render={({ field }) => (
              <CustomRadioButton
                label="Gender"
                value={field.value}
                options={genders}
                onChange={data => {
                  field.onChange(data);
                }}
                disabled={!isEdit}
              />
            )}
            name="us_gender"
          />
          {errors.us_gender?.message ? (
            <Text style={styles.errorMessage}>{errors.us_gender?.message}</Text>
          ) : null}
          <Spacer height={21} />
          <Controller
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Enter your address"
                label="Address"
                autoCapitalize="none"
                onBlur={field.onBlur}
                onChangeText={field.onChange}
                error={errors.us_address?.message}
                borderLess
                multiline={true}
                numberOfLines={4}
                isTextBox
                editable={isEdit}
              />
            )}
            name="us_address"
          />
          <Spacer height={21} />
          <Controller
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Enter your state"
                label="State"
                keyboardType="default"
                autoCapitalize="none"
                autoComplete="off"
                onBlur={field.onBlur}
                onChangeText={field.onChange}
                error={errors.us_state?.message}
                borderLess
                editable={isEdit}
              />
            )}
            name="us_state"
          />
          <Spacer height={21} />
          <Controller
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Enter your district"
                label="District"
                keyboardType="default"
                autoCapitalize="none"
                autoComplete="off"
                onBlur={field.onBlur}
                onChangeText={field.onChange}
                error={errors.us_district?.message}
                borderLess
                editable={isEdit}
              />
            )}
            name="us_district"
          />
          <Spacer height={21} />
          <Controller
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Eg. 639002"
                label="Pincode"
                autoCapitalize="none"
                onBlur={field.onBlur}
                onChangeText={field.onChange}
                error={errors.us_pincode?.message}
                borderLess
                editable={isEdit}
              />
            )}
            name="us_pincode"
          />
        </View>
        <Spacer height={35} />
        <View style={styles.btnContainer}>
          <TouchableOpacity
            style={[styles.button, !isDirty || isLoading ? styles.disable : {}]}
            disabled={!isDirty || isLoading}
            onPress={handleSubmit(onSubmit)}>
            {isLoading ? (
              <ActivityIndicator animating color={'#14141D'} style={styles.loader} />
            ) : null}
            <Text style={[styles.title, isLoading ? styles.textDisable : {}]}>Edit</Text>
          </TouchableOpacity>
        </View>
        <Spacer height={50} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
  sectionContainer: {
    marginTop: 20,
  },
  btnContainer: {
    alignItems: 'center',
  },
  button: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#FFCA3A',
    borderRadius: 8,
    paddingVertical: Platform.OS === 'android' ? 12 : 16,
    width: '100%',
  },
  loader: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#14141D',
    fontSize: 16,
    fontFamily: 'Inter-600',
  },
  disable: {
    opacity: 0.4,
  },
  textDisable: { opacity: 0 },
  errorContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    display: 'flex',
    width: '100%',
    paddingTop: 20,
    paddingBottom: 10,
  },
  error: {
    fontSize: 14,
    color: '#f02d3a',
    fontFamily: 'Inter-500',
    letterSpacing: 0.5,
  },
  errorMessage: {
    fontSize: 12,
    color: '#f02d3a',
    fontFamily: 'Inter-300',
    letterSpacing: 0.5,
  },
  label: {
    fontSize: 25,
    color: '#FFFFFF',
    fontFamily: 'Inter-800',
  },
  sectionTitle: {
    fontSize: 20,
    color: 'rgba(255,200,58,0.78)',
    marginBottom: 2,
    fontFamily: 'Inter-500',
  },
  sectionTitleContainer: {
    marginBottom: 10,
  },
});
