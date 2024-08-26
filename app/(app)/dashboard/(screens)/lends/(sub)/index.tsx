import React, { useEffect } from 'react';
import { ActivityIndicator, FlatList, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import HeaderWithCount from '@/components/HeaderWithCount';
import { ThemedView } from '@/components/ThemedView';
import LendsCard from '@/components/LendsCard';
import Emptystate from '@/components/Emptystate';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getAllLends } from '@/redux/slices/lends/lendsSlice';

export default function index() {
  const dispatch = useAppDispatch();
  const { allLends, isLoading } = useAppSelector(state => state.lends);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      dispatch(getAllLends());
    }
  }, [isFocused]);

  if (isLoading) {
    return (
      <ThemedView
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <ActivityIndicator size="large" color="#FFCA3A" />
      </ThemedView>
    );
  }
  // Empty state
  if (!isLoading && !allLends.length) {
    return (
      <ThemedView
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Emptystate
          title="No lends found!"
          description="No lends here yet! Once you start lending, all your items will appear in this space."
        />
      </ThemedView>
    );
  }

  return (
    <ThemedView style={{ flex: 1 }}>
      <HeaderWithCount title="All Lends" count={allLends.length} countText="lends" />
      <View style={{ flex: 1 }}>
        <FlatList
          bounces={false}
          showsVerticalScrollIndicator={false}
          data={allLends}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }: any) => {
            return (
              <LendsCard
                ld_id={item.ld_id}
                ld_borrower_name={item.ld_borrower_name}
                ld_payment_term={item.ld_payment_term}
                ld_lend_amount={item.ld_lend_amount}
                ld_principal_repayment={item.ld_principal_repayment}
                ld_start_date={item.ld_start_date}
                // ld_paid_amount={item.ld_paid_amount}
                // ld_pending_amount={item.ld_pending_amount}
                ld_paid_weeks={item.ld_paid_weeks}
                ld_pending_weeks={item.ld_pending_weeks}
                ld_total_weeks_or_month={item.ld_total_weeks_or_month}
                ld_interest_amount={item.ld_interest_amount}
              />
            );
          }}
          keyExtractor={(item: any) => item.ld_id}
        />
      </View>
    </ThemedView>
  );
}
