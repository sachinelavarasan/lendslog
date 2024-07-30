import CustomCheckBox from '@/components/CustomCheckBox';
import CustomDatePicker from '@/components/CustomDatePicker';
import CustomRadioButton from '@/components/CustomRadioButton';
import { CustomSelectInput } from '@/components/CustomSelectInput';
import DueCard from '@/components/DueCard';
import Input from '@/components/Input';
import SafeAreaViewComponent from '@/components/SafeAreaView';
import Spacer from '@/components/Spacer';
import { ThemedView } from '@/components/ThemedView';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { edit, setCurrentLend, setError } from '@/redux/slices/lends/lendsSlice';
import { interestList, paymentTerms, suretyType } from '@/utils/common-data';
import { EditLendsSchemaType, EditLendsSchema, lendsSchemaType } from '@/utils/schema';
import { IinstallmentTimelines } from '@/utils/types/lends';
import { zodResolver } from '@hookform/resolvers/zod';
import { useIsFocused } from '@react-navigation/native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';

export default function DetailsScreen() {
  const { id } = useLocalSearchParams();
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { allLends, currentLend, isLoading, error } = useAppSelector(state => state.lends);

  const {
    control,
    handleSubmit,
    formState: { errors, isDirty },
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
      // ld_payment_type: '',
    },
    resolver: zodResolver(EditLendsSchema),
  });

  useEffect(() => {
    if (id && isFocused) {
      const findLend = allLends.find(item => item.ld_id === Number(id));
      if (findLend) {
        dispatch(setCurrentLend(findLend));
        resetForm(findLend);
      }
      setTimeout(() => {
        setLoading(false);
      }, 600);
    }
    return () => {
      dispatch(setCurrentLend(null));
      dispatch(setError(null));
    };
  }, [id, isFocused, allLends]);

  const resetForm = useCallback(
    (currentLend: lendsSchemaType) => {
      reset({
        ld_borrower_name: currentLend?.ld_borrower_name || '',
        ld_borrower_phoneno: currentLend?.ld_borrower_phoneno || '',
        ld_borrower_address: currentLend?.ld_borrower_address || '',
        ld_borrower_notes: currentLend?.ld_borrower_notes || '',
        ld_is_nominee: currentLend?.ld_is_nominee || false,
        ld_nominee_name: currentLend?.ld_nominee_name || '',
        ld_nominee_phoneno: currentLend?.ld_nominee_phoneno || '',
        ld_nominee_address: currentLend?.ld_nominee_address || '',
        ld_nominee_notes: currentLend?.ld_nominee_notes || '',
        ld_is_surety: currentLend?.ld_is_surety,
        ld_surety_type: currentLend?.ld_surety_type || 0,
        ld_surety_notes: currentLend?.ld_surety_notes || '',
      });
    },
    [currentLend]
  );

  const onSubmit = (data: EditLendsSchemaType) => {
    if (currentLend?.ld_id)
      dispatch(
        edit(data, currentLend?.ld_id, lend => {
          dispatch(setError(null));
          resetForm(lend);
        })
      );
  };

  if (loading) {
    return (
      <ThemedView style={styles.container_loading}>
        <ActivityIndicator size="large" color="#FFCA3A" />
      </ThemedView>
    );
  }
  if (!currentLend) {
    return (
      <ThemedView style={styles.container_loading}>
        <Text style={{ color: '#FFCA3A', fontSize: 24, fontFamily: 'Inter-600' }}>
          Item not found
        </Text>
      </ThemedView>
    );
  }

  return (
    <KeyboardAvoidingView
      {...(Platform.OS === 'ios' ? { behavior: 'padding' } : {})}
      style={{ flex: 1 }}>
      <SafeAreaViewComponent>
          <ScrollView
            bounces={false}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps={'always'}>
            <View style={styles.formContainer}>
              {error && (
                <View style={styles.errorContainer}>
                  <Text style={styles.error}>{error}</Text>
                </View>
              )}
              <View style={styles.header}>
                <Text style={styles.label}>Edit Lend Details</Text>
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
                            value={field.value}
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
                    style={[styles.button, !isDirty || isLoading ? styles.disable : {}]}
                    disabled={!isDirty || isLoading}
                    onPress={handleSubmit(onSubmit)}>
                    {isLoading ? (
                      <ActivityIndicator animating color={'#14141D'} style={styles.loader} />
                    ) : null}
                    <Text style={[styles.title, isLoading ? styles.textDisable : {}]}>Update</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <Spacer height={20} />
            <FlatList
              bounces={false}
              style={{ marginBottom: 20, paddingBottom: 20 }}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 15 }}
              scrollEnabled={false}
              ItemSeparatorComponent={() => <Spacer height={10} />}
              data={currentLend.installmentTimelines}
              renderItem={({ item }: { item: IinstallmentTimelines }) => {
                return <DueCard {...item} />;
              }}
              keyExtractor={(item: IinstallmentTimelines, index: number) => item.it_id + 'log'}
            />
          </ScrollView>
      </SafeAreaViewComponent>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container_loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  formContainer: {
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
