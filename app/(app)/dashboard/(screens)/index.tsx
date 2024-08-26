import { useEffect } from 'react';
import { StatusBar, View, FlatList, Platform, ActivityIndicator } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import { ThemedView } from '@/components/ThemedView';
import SafeAreaViewComponent from '@/components/SafeAreaView';
import HeaderWithCount from '@/components/HeaderWithCount';
import TodayLendCard from '@/components/TodayLendsCard';
import Spacer from '@/components/Spacer';
import Emptystate from '@/components/Emptystate';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getTodayLends, lendsSelector } from '@/redux/slices/lends/lendsSlice';

import { TodayLends } from '@/utils/types/lends';

export default function HomeScreen() {
  const { todayLends, isLoading } = useAppSelector(lendsSelector);
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      dispatch(getTodayLends());
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
  if (!isLoading && !todayLends.length) {
    return (
      <ThemedView
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Emptystate
          title="No Pending installments found!"
          description="You have no installments pending right now."
        />
      </ThemedView>
    );
  }

  return (
    <SafeAreaViewComponent>
      <ThemedView style={{ flex: 1, paddingTop: StatusBar.currentHeight, paddingHorizontal: 20 }}>
        <View style={{ paddingTop: Platform.OS === 'android' ? 10 : 0 }}>
          <HeaderWithCount title="Pending Lends" count={todayLends.length} countText="lends" />
          <FlatList
            bounces={false}
            style={{ marginVertical: 20, paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
            data={todayLends}
            scrollEnabled={true}
            ItemSeparatorComponent={() => <Spacer height={12} />}
            renderItem={({ item }: { item: TodayLends }) => {
              return <TodayLendCard {...item} />;
            }}
            keyExtractor={(item: any, index: number) => item.ld_id + index}
            ListFooterComponent={() => <Spacer height={60} />}
          />
        </View>
      </ThemedView>
    </SafeAreaViewComponent>
  );
}
