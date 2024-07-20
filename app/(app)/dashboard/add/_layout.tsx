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

import Input from '@/components/Input';
import Spacer from '@/components/Spacer';
// import AuthLink from '@/components/AuthLink';
import SafeAreaViewComponent from '@/components/SafeAreaView';
import { ThemedView } from '@/components/ThemedView';
import CustomRadioButton from '@/components/CustomRadioButton';
import CustomCheckBox from '@/components/CustomCheckBox';
import { CustomSelectInput } from '@/components/CustomSelectInput';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { add, setError } from '@/redux/slices/lends/lendsSlice';

import { lendsSchema, lendsSchemaType } from '@/utils/schema';
import { interestList, paymentTerms, suretyType } from '@/utils/common-data';
import CustomDatePicker from '@/components/CustomDatePicker';

export default function AddLends() {
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector(state => state.lends);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      ld_borrower_name: '',
      ld_borrower_phoneno: '',
      ld_borrower_address: '',
      ld_borrower_notes: '',
      ld_is_nominee: false,
      ld_nominee_name: '',
      ld_nominee_phoneno: '',
      ld_nominee_address: '',
      ld_nominee_notes: '',
      ld_is_surety: false,
      ld_surety_type: 0,
      ld_surety_notes: '',
      ld_lend_amount: '',
      ld_interest_rate: 0,
      ld_payment_term: 0,
      ld_total_weeks_or_month: '',
      ld_start_date: '',
      // ld_payment_type: '',
    },
    resolver: zodResolver(lendsSchema),
  });

  useEffect(() => {
    return () => {
      dispatch(setError(null));
    };
  }, []);

  const onSubmit = (data: lendsSchemaType) => {
    console.log(data);
    dispatch(
      add(data, () => {
        // reset();
        dispatch(setError(null));
        // router.replace('/dashboard');
      })
    );
  };

  console.log('---------- ERROR -------- \n', JSON.stringify(errors, null, 2));
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
                <View style={[styles.sectionContainer, { marginTop: 25 }]}>
                  <View style={[styles.sectionTitleContainer]}>
                    <Text style={[styles.sectionTitle]}>Borrower Details</Text>
                  </View>
                  <Controller
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Borrower Name"
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
                        error={errors.ld_borrower_phoneno?.message}
                        borderLess
                      />
                    )}
                    name="ld_borrower_phoneno"
                  />
                  <Spacer height={21} />
                  <Controller
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Borrower address"
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
                  <Spacer height={21} />
                  <Controller
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Borrow notes"
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
                <View style={[styles.sectionContainer, { marginTop: 25 }]}>
                  <View style={[styles.sectionTitleContainer]}>
                    <Text style={[styles.sectionTitle]}>Lend Details</Text>
                  </View>
                  <Controller
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        placeholder="Lend amount"
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
                  <Spacer height={21} />
                  <Controller
                    control={control}
                    render={({ field }) => (
                      <CustomSelectInput
                        placeholder="Choose interest rate"
                        label="Interest Rate"
                        onChange={data => {
                          field.onChange(data);
                        }}
                        options={interestList}
                      />
                    )}
                    name="ld_interest_rate"
                  />
                  {errors.ld_interest_rate?.message ? (
                    <Text style={styles.errorMessage}>{errors.ld_interest_rate?.message}</Text>
                  ) : null}
                  {/* <Spacer height={21} />
                  <Controller
                    control={control}
                    render={({ field }) => (
                      <CustomSelectInput
                        label="Payment Type"
                        options={paymentTypes}
                        onChange={data => {
                          field.onChange(data);
                        }}
                      />
                    )}
                    name="ld_payment_type"
                  />
                  {errors.ld_payment_type?.message ? (
                    <Text style={styles.errorMessage}>{errors.ld_payment_type?.message}</Text>
                  ) : null} */}
                  <Spacer height={21} />
                  <Controller
                    control={control}
                    render={({ field }) => (
                      <CustomRadioButton
                        label="Payment Term"
                        value={field.value}
                        options={paymentTerms}
                        onChange={data => {
                          field.onChange(data);
                        }}
                        disabled={field.disabled}
                      />
                    )}
                    name="ld_payment_term"
                  />
                  {errors.ld_payment_term?.message ? (
                    <Text style={styles.errorMessage}>{errors.ld_payment_term?.message}</Text>
                  ) : null}
                  <Spacer height={10} />
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
                  <Spacer height={25} />
                  <Controller
                    control={control}
                    render={({ field }) => (
                      <CustomDatePicker onDateChange={(data)=>field.onChange(data)} value={field.value} label="Payment Start Date" placeholder="DD-MM-YYYY" error={errors.ld_start_date?.message} />
                    )}
                    name="ld_start_date"
                  />
                            
                </View>
                <View style={[styles.sectionContainer, { marginTop: 25 }]}>
                  <View style={[styles.sectionTitleContainer]}>
                    <Text style={[styles.sectionTitle]}>Nominee Details</Text>
                    <Text style={{ color: '#a1a1a1', marginTop: 5 }}>
                      Give the details of the primary nominee
                    </Text>
                  </View>
                  <Controller
                    control={control}
                    render={({ field }) => (
                      <CustomCheckBox
                        label="Nominee"
                        fillColor="rgba(255, 200, 58, 0.8)"
                        onChange={data => {
                          field.onChange(data);
                        }}
                        isChecked={field.value}
                      />
                    )}
                    name="ld_is_nominee"
                  />
                  {watch('ld_is_nominee') ? (
                    <View>
                      <Spacer height={21} />
                      <Controller
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            placeholder="Nominee name"
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
                            error={errors.ld_nominee_phoneno?.message}
                            borderLess
                          />
                        )}
                        name="ld_nominee_phoneno"
                      />
                      <Spacer height={21} />
                      <Controller
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            placeholder="Nominee address"
                            label="Address"
                            autoCapitalize="none"
                            onBlur={field.onBlur}
                            onChangeText={field.onChange}
                            error={errors.ld_nominee_address?.message}
                            borderLess
                            multiline={true}
                            numberOfLines={4}
                            isTextBox
                          />
                        )}
                        name="ld_nominee_address"
                      />
                      <Spacer height={21} />
                      <Controller
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            placeholder="About nominee"
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
                  ) : null}
                </View>
                <View style={[styles.sectionContainer, { marginTop: 25 }]}>
                  <View style={[styles.sectionTitleContainer]}>
                    <Text style={[styles.sectionTitle]}>Surety Details</Text>
                    <Text style={{ color: '#a1a1a1', marginTop: 5 }}>
                      Give the details of the surety
                    </Text>
                  </View>
                  <Controller
                    control={control}
                    render={({ field }) => (
                      <CustomCheckBox
                        label="Surety"
                        fillColor="rgba(255, 200, 58, 0.8)"
                        onChange={data => {
                          field.onChange(data);
                        }}
                        isChecked={field.value}
                      />
                    )}
                    name="ld_is_surety"
                  />
                  {watch('ld_is_surety') ? (
                    <View>
                      <Spacer height={21} />
                      <Controller
                        control={control}
                        render={({ field }) => (
                          <CustomSelectInput
                            label="Surety Type"
                            options={suretyType}
                            onChange={data => {
                              field.onChange(data);
                            }}
                          />
                        )}
                        name="ld_surety_type"
                      />
                      {errors.ld_surety_type?.message ? (
                        <Text style={[styles.errorMessage, { marginTop: 5 }]}>
                          {errors.ld_surety_type?.message}
                        </Text>
                      ) : null}
                      <Spacer height={15} />
                      <Controller
                        control={control}
                        render={({ field }) => (
                          <Input
                            {...field}
                            placeholder="About surety"
                            label="Notes"
                            keyboardType="default"
                            autoCapitalize="none"
                            autoComplete="off"
                            onBlur={field.onBlur}
                            onChangeText={field.onChange}
                            borderLess
                            multiline={true}
                            numberOfLines={4}
                            isTextBox
                          />
                        )}
                        name="ld_surety_notes"
                      />
                    </View>
                  ) : null}
                </View>
                <Spacer height={35} />
                <View style={styles.btnContainer}>
                  <TouchableOpacity
                    style={[styles.button, !isValid || isLoading ? styles.disable : {}]}
                    disabled={!isValid || isLoading}
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
