import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
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
import { ThemedView } from '@/components/ThemedView';

const schema = z.object({
  ld_borrower_name: z.string().min(3, { message: 'Minimum3 chanracters' }),
  ld_borrower_phoneno: z.string().min(8, { message: 'Minimum 8 characters' }),
});

type FormData = {
  ld_borrower_name: string,
  ld_borrower_phoneno: string,
  ld_borrower_address: string,
  ld_borrower_notes: string,
  ld_nominee_name: string,
  ld_nominee_phoneno: string,
  ld_nominee_address: string,
  ld_nominee_notes: string,
  ld_lend_amount: string,
  ld_interest_rate: string,
  ld_total_weeks_or_month: string
};

export default function AddLends() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector(state => state.auth);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    defaultValues: {
      ld_borrower_name: '',
      ld_borrower_phoneno: '',
      ld_borrower_address: '',
      ld_borrower_notes: '',
      ld_nominee_name: '',
      ld_nominee_phoneno: '',
      ld_nominee_address: '',
      ld_nominee_notes: '',
      ld_lend_amount: '0',
      ld_interest_rate: '0',
      ld_total_weeks_or_month: '0'
    },
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    return () => {
      dispatch(setError(null));
    };
  }, []);

  const onSubmit = (data: FormData) => {
    // dispatch(
    //   logIn({ email, password }, () => {
    //     reset();
    //     dispatch(setError(null));
    //     router.replace('/dashboard');
    //   })
    // );
    console.log(data)
  };

  return (
    <KeyboardAvoidingView
      {...(Platform.OS === 'ios' ? { behavior: 'padding' } : {})}
      style={{ flex: 1 }}>
      <SafeAreaViewComponent>
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={'always'}>
          <ThemedView
            style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 13 : 35, paddingHorizontal: 10 }}>
            <View style={styles.formContainer}>
              {error && (
                <View style={styles.errorContainer}>
                  <Text style={styles.error}>{error}</Text>
                </View>
              )}
              <View style={styles.header}>
                <Text style={styles.label}>Add Lend Details</Text>
              </View>
              <View>
                <View style={[styles.sectionContainer, { marginTop: 10 }]}>
                  <View style={[styles.sectionTitleContainer]}>
                    <Text style={[styles.sectionTitle]}>Borrower Details</Text>
                  </View>
                  <Controller
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Enter name"
                        label="Name"
                        keyboardType="default"
                        autoCapitalize="none"
                        autoComplete="off"
                        onBlur={field.onBlur}
                        onChangeText={field.onChange}
                        error={errors.ld_borrower_name?.message}
                        borderLess
                      />
                    )}
                    name="ld_borrower_name"
                  />
                  <Spacer height={20} />
                  <Controller
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Enter phone number"
                        label="Phone number"
                        autoCapitalize="none"
                        onBlur={field.onBlur}
                        onChangeText={field.onChange}
                        error={errors.ld_borrower_phoneno?.message}
                        borderLess
                      />
                    )}
                    name="ld_borrower_phoneno"
                  />
                  <Spacer height={20} />
                  <Controller
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Enter address"
                        label="Address"
                        autoCapitalize="none"
                        onBlur={field.onBlur}
                        onChangeText={field.onChange}
                        error={errors.ld_borrower_address?.message}
                        borderLess
                        multiline={true}
                        numberOfLines={4}
                        isTextBox
                      />
                    )}
                    name="ld_borrower_address"
                  />
                  <Spacer height={20} />
                  <Controller
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Enter notes"
                        label="Notes"
                        keyboardType="default"
                        autoCapitalize="none"
                        autoComplete="off"
                        onBlur={field.onBlur}
                        onChangeText={field.onChange}
                        error={errors.ld_borrower_notes?.message}
                        borderLess
                        multiline={true}
                        numberOfLines={4}
                        isTextBox
                      />
                    )}
                    name="ld_borrower_notes"
                  />
                </View>
                <View style={styles.sectionContainer}>
                  <View style={[styles.sectionTitleContainer]}>
                    <Text style={[styles.sectionTitle]}>Nominee Details</Text>
                    <Text style={{ color: '#a1a1a1', marginTop: 5 }}>
                      Give the details of the primary nominee
                    </Text>
                  </View>
                  <Controller
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Enter name"
                        label="Name"
                        keyboardType="default"
                        autoCapitalize="none"
                        autoComplete="off"
                        onBlur={field.onBlur}
                        onChangeText={field.onChange}
                        error={errors.ld_nominee_name?.message}
                        borderLess
                      />
                    )}
                    name="ld_nominee_name"
                  />
                  <Spacer height={20} />
                  <Controller
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Enter phone number"
                        label="Phone number"
                        autoCapitalize="none"
                        onBlur={field.onBlur}
                        onChangeText={field.onChange}
                        error={errors.ld_nominee_phoneno?.message}
                        borderLess
                      />
                    )}
                    name="ld_nominee_phoneno"
                  />
                  <Spacer height={20} />
                  <Controller
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Enter address"
                        label="Address"
                        autoCapitalize="none"
                        onBlur={field.onBlur}
                        onChangeText={field.onChange}
                        error={errors.ld_nominee_address?.message}
                        borderLess
                      />
                    )}
                    name="ld_nominee_address"
                  />
                  <Spacer height={20} />
                  <Controller
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Enter notes"
                        label="Notes"
                        keyboardType="default"
                        autoCapitalize="none"
                        autoComplete="off"
                        onBlur={field.onBlur}
                        onChangeText={field.onChange}
                        error={errors.ld_nominee_notes?.message}
                        borderLess
                        multiline={true}
                        numberOfLines={4}
                        isTextBox
                      />
                    )}
                    name="ld_nominee_notes"
                  />
                </View>
                <View style={[styles.sectionContainer, { marginTop: 10 }]}>
                  <View style={[styles.sectionTitleContainer]}>
                    <Text style={[styles.sectionTitle]}>Lend Details</Text>
                  </View>
                  <Controller
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Enter lend amount"
                        label="Lend Amount"
                        keyboardType="numeric"
                        onBlur={field.onBlur}
                        onChangeText={field.onChange}
                        error={errors.ld_lend_amount?.message}
                        borderLess
                      />
                    )}
                    name="ld_lend_amount"
                  />
                  <Spacer height={20} />
                  <Controller
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Enter interest rate (eg: 2%)"
                        label="Interest Rate"
                        keyboardType="numeric"
                        onBlur={field.onBlur}
                        onChangeText={field.onChange}
                        error={errors.ld_interest_rate?.message}
                        borderLess
                      />
                    )}
                    name="ld_interest_rate"
                  />
                 <Spacer height={20} />
                  <Controller
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Total number of weeks or months"
                        label="Total Weeks or Months"
                        keyboardType="numeric"
                        onBlur={field.onBlur}
                        onChangeText={field.onChange}
                        error={errors.ld_total_weeks_or_month?.message}
                        borderLess
                      />
                    )}
                    name="ld_total_weeks_or_month"
                  />
                </View>
                <Spacer height={35} />
                <View style={styles.btnContainer}>
                  <TouchableOpacity
                    style={[styles.button, !isValid || isLoading ? styles.disable : {}]}
                    // disabled={!isValid || isLoading}
                    onPress={handleSubmit(onSubmit)}>
                    {isLoading ? (
                      <ActivityIndicator animating color={'#14141D'} style={styles.loader} />
                    ) : null}
                    <Text style={[styles.title, isLoading ? styles.textDisable : {}]}>Add</Text>
                  </TouchableOpacity>
                </View>
                <Spacer height={50} />
              </View>
            </View>
          </ThemedView>
        </ScrollView>
      </SafeAreaViewComponent>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
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
    opacity: 0.7,
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

