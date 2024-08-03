import { useEffect } from 'react';
import { StatusBar, View, FlatList, Platform } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import { ThemedView } from '@/components/ThemedView';
import SafeAreaViewComponent from '@/components/SafeAreaView';
import HeaderWithCount from '@/components/HeaderWithCount';
import TodayLendCard from '@/components/TodayLendsCard';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getTodayLends, lendsSelector } from '@/redux/slices/lends/lendsSlice';

import { TodayLends } from '@/utils/types/lends';
import Spacer from '@/components/Spacer';

export default function HomeScreen() {
  const { todayLends } = useAppSelector(lendsSelector);
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      dispatch(getTodayLends());
    }
  }, [isFocused]);

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
