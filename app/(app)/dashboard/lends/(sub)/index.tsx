import React, { useEffect } from 'react';
import { Text } from 'react-native';

import HeaderWithCount from '@/components/HeaderWithCount';
import { ThemedView } from '@/components/ThemedView';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getAllLends } from '@/redux/slices/lends/lendsSlice';

export default function index() {
  const dispatch = useAppDispatch();
  const { lends } = useAppSelector(state => state.lends);

  useEffect(() => {
    dispatch(getAllLends());
  }, []);
  
  return (
    <ThemedView style={{ flex: 1 }}>
      <HeaderWithCount title="All borrowers list" count={100} countText="borrowers" />
      <Text style={{ color: '#fff' }}>All Borrowers</Text>
    </ThemedView>
  );
}
