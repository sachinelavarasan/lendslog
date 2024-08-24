import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { StatusBar, View, FlatList, Platform, ActivityIndicator } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import { ThemedView } from '@/components/ThemedView';
import SafeAreaViewComponent from '@/components/SafeAreaView';
import HeaderWithCount from '@/components/HeaderWithCount';
import Spacer from '@/components/Spacer';
import NotificationCard from '@/components/NotificationCard';
import Emptystate from '@/components/Emptystate';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { getAllNotifications, lendsSelector } from '@/redux/slices/lends/lendsSlice';

import { INotifications } from '@/utils/types/lends';


export default function Notifications() {
  const { todayNotifications, olderNotifications, isLoading } = useAppSelector(lendsSelector);
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();
  const router = useRouter();

  useEffect(() => {
    if (isFocused) {
      dispatch(getAllNotifications());
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
  if (!isLoading && !todayNotifications.length && !olderNotifications.length) {
    return (
      <ThemedView
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
       <Emptystate title='No Notifications found!' description='You have no notifications right now. Come back later'/>
      </ThemedView>
    );
  }

  return (
    <SafeAreaViewComponent>
      <ThemedView style={{ flex: 1, paddingTop: StatusBar.currentHeight, paddingHorizontal: 20 }}>
        <View style={{ paddingTop: Platform.OS === 'android' ? 10 : 0 }}>
          <HeaderWithCount title="Notifications" />
          {todayNotifications.length ? (
            <>
              <HeaderWithCount title="Today" count={todayNotifications.length} subTitle />
              <FlatList
                bounces={false}
                style={{ marginTop: 10 }}
                showsVerticalScrollIndicator={false}
                data={todayNotifications}
                scrollEnabled={true}
                ItemSeparatorComponent={() => <Spacer height={12} />}
                renderItem={({ item }: { item: INotifications }) => {
                  return (
                    <NotificationCard
                      notification={item}
                      type="today"
                      onClick={() => router.push('dashboard')}
                    />
                  );
                }}
                keyExtractor={(item: any, index: number) => item.nt_id}
              />
              <Spacer height={15} />
            </>
          ) : null}
          {olderNotifications.length ? (
            <>
              <HeaderWithCount title="Older" count={olderNotifications.length} subTitle />
              <FlatList
                bounces={false}
                style={{ marginVertical: 10, paddingBottom: 20 }}
                showsVerticalScrollIndicator={false}
                data={olderNotifications}
                scrollEnabled={true}
                ItemSeparatorComponent={() => <Spacer height={12} />}
                renderItem={({ item }: { item: INotifications }) => {
                  return <NotificationCard notification={item} type="older" />;
                }}
                keyExtractor={(item: any, index: number) => item.nt_id}
                ListFooterComponent={() => <Spacer height={60} />}
              />
            </>
          ) : null}
        </View>
      </ThemedView>
    </SafeAreaViewComponent>
  );
}
