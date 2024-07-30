import {
  StatusBar,
  View,
  FlatList,
  Platform,
} from 'react-native';

import { ThemedView } from '@/components/ThemedView';
import SafeAreaViewComponent from '@/components/SafeAreaView';
import DueCard from '@/components/DueCard';
import HeaderWithCount from '@/components/HeaderWithCount';

import { useAppSelector } from '@/redux/hooks';
import { lendsSelector } from '@/redux/slices/lends/lendsSlice';
import { IinstallmentTimelines } from '@/utils/types/lends';


export default function HomeScreen() {
  const { timelines } = useAppSelector(lendsSelector);

  return (
    <SafeAreaViewComponent>
      <ThemedView style={{ flex: 1, paddingTop: StatusBar.currentHeight, paddingHorizontal: 20 }}>
        <View style={{ paddingTop: Platform.OS === 'android' ? 10 : 5 }}>
          <HeaderWithCount title="Today due users list" count={10} countText='users'/>
          <FlatList
            bounces={false}
            style={{ marginBottom: 20, paddingBottom: 20 }}
            showsVerticalScrollIndicator={false}
            data={timelines}
            renderItem={({ item }: {item: IinstallmentTimelines}) => {
              return <DueCard {...item} />
            }}
            keyExtractor={(item: any, index: number) => item.name + index}
          />
        </View>
      </ThemedView>
    </SafeAreaViewComponent>
  );
}
