import React, { useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import HeaderWithCount from '@/components/HeaderWithCount';
import { ThemedView } from '@/components/ThemedView';
import LendsCard, { LendsCardProps } from '@/components/LendsCard';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getAllLends } from '@/redux/slices/lends/lendsSlice';
import { lendsSchemaType } from '@/utils/schema';

export default function index() {
  const dispatch = useAppDispatch();
  const { allLends } = useAppSelector(state => state.lends);
  const isFocused = useIsFocused();
  console.log(allLends);

  useEffect(() => {
    if (isFocused) {
      dispatch(getAllLends());
    }
  }, [isFocused]);

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
                ld_paid_amount={item.ld_paid_amount}
                ld_pending_amount={item.ld_pending_amount}
                ld_paid_weeks={item.ld_paid_weeks}
                ld_pending_weeks={item.ld_pending_weeks}
                // ld_is_current_month_paid={item.installmentTimelines.map((installment: any) => {
                //   let date = new Date(),
                //     year = date.getFullYear(),
                //     month = date.getMonth(),
                //     ld_is_current_month_paid = false;
                //   var firstDay = new Date(year, month, 1);
                //   var lastDay = new Date(year, month + 1, 0);
                //   if (
                //     installment.it_installment_date > firstDay &&
                //     installment.it_installment_date < lastDay
                //   ) {
                //     ld_is_current_month_paid =
                //       installment.it_installement_status == 2 ? true : false;
                //   }
                //   return ld_is_current_month_paid;
                // })}
              />
            );
          }}
          keyExtractor={(item: any) => item.ld_id}
        />
      </View>
    </ThemedView>
  );
}
