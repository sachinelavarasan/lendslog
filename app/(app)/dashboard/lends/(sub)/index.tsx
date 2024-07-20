import React, { useEffect } from 'react';
import { FlatList, Text, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import HeaderWithCount from '@/components/HeaderWithCount';
import { ThemedView } from '@/components/ThemedView';
import LendsCard, { LendsCardProps } from '@/components/LendsCard';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getAllLends } from '@/redux/slices/lends/lendsSlice';
import { lendsSchemaType } from '@/utils/schema';

export default function index(props: any) {
  const dispatch = useAppDispatch();
  const { allLends } = useAppSelector(state => state.lends);
  const isFocused = useIsFocused();

  useEffect(() => {
    dispatch(getAllLends());
  }, [props, isFocused]);

  return (
    <ThemedView style={{ flex: 1 }}>
      <HeaderWithCount title="All Lends" count={allLends.length} countText="lends" />
      <View>
        <FlatList
          bounces={false}
          style={{ marginBottom: 20, paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
          data={allLends}
          renderItem={({ item }: any) => {
            return (
              <LendsCard
                ld_borrower_name={item.ld_borrower_name}
                ld_payment_term={item.ld_payment_term}
                ld_lend_amount={item.ld_lend_amount}
                ld_principal_repayment={item.ld_principal_repayment}
                ld_start_date={item.ld_start_date}
              />
            );
          }}
          keyExtractor={(item: any) => item.ld_id}
        />
      </View>
    </ThemedView>
  );
}
