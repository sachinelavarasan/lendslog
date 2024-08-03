import { useEffect } from 'react';
import { StatusBar, View, FlatList, Platform } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import { ThemedView } from '@/components/ThemedView';
import SafeAreaViewComponent from '@/components/SafeAreaView';
import HeaderWithCount from '@/components/HeaderWithCount';
import TodayLendCard from '@/components/TodayLendsCard';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getAllNotifications, lendsSelector } from '@/redux/slices/lends/lendsSlice';

import { INotifications, TodayLends } from '@/utils/types/lends';
import Spacer from '@/components/Spacer';
import NotificationCard from '@/components/NotificationCard';

export default function Notifications() {
  const { todayNotifications, olderNotifications } = useAppSelector(lendsSelector);
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      dispatch(getAllNotifications());
    }
  }, [isFocused]);

  return (
    <SafeAreaViewComponent>
      <ThemedView style={{ flex: 1, paddingTop: StatusBar.currentHeight, paddingHorizontal: 20 }}>
        <View style={{ paddingTop: Platform.OS === 'android' ? 10 : 0 }}>
          <HeaderWithCount title="Notifications"  />
          <HeaderWithCount title="Today"  count={todayNotifications.length} subTitle />
          <FlatList
            bounces={false}
            style={{marginTop:15 }}
            showsVerticalScrollIndicator={false}
            data={todayNotifications}
            scrollEnabled={true}
            ItemSeparatorComponent={() => <Spacer height={12} />}
            renderItem={({ item }: { item: INotifications }) => {
              return <NotificationCard notification={item} type='today' />;
            }}
            keyExtractor={(item: any, index: number) => item.nt_id + index}
          />
            <HeaderWithCount title="Older" count={olderNotifications.length} subTitle />
            <FlatList
            bounces={false}
            style={{ marginVertical: 20, paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
            data={olderNotifications}
            scrollEnabled={true}
            ItemSeparatorComponent={() => <Spacer height={12} />}
            renderItem={({ item }: { item: INotifications }) => {
              return <NotificationCard notification={item} type='older' />;
            }}
            keyExtractor={(item: any, index: number) => item.nt_id + index}
            ListFooterComponent={() => <Spacer height={60} />}
          />
        </View>
      </ThemedView>
    </SafeAreaViewComponent>
  );
}
