import { StatusBar, StyleSheet, TouchableOpacity, View, Text } from 'react-native';

import Lends from '@/components/LogSearch';
import { MaterialTopTabs } from '@/components/MaterialTopTabs';
import SafeAreaViewComponent from '@/components/SafeAreaView';
import { ThemedView } from '@/components/ThemedView';

const ROUTES = [
  {
    name: 'index',
    title: 'Today',
  },
  {
    name: 'week',
    title: 'Week',
  },
  {
    name: 'month',
    title: 'Month',
  },
];

function MyTabBar({ state, descriptors, navigation }: any) {
  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 10,
        backgroundColor: '#14141D',
        padding: 10,
        marginVertical: 15,
      }}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            key={route.key}
            style={[
              {
                width: '30%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              },
            ]}>
            <View
              style={[
                { width: '100%', padding: 8, alignItems: 'center' },
                isFocused ? styles.activeColor : null,
              ]}>
              <Text
                style={{
                  color: '#ffffff',
                  fontFamily: isFocused ? 'Inter-700' : 'Inter-500',
                  fontSize: 16,
                }}>
                {label}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export default function Layout() {
  return (
      <SafeAreaViewComponent>
        <ThemedView style={{ flex: 1, paddingTop: StatusBar.currentHeight, paddingHorizontal: 20 }}>
          <Lends />
          <MaterialTopTabs
            screenOptions={{
              tabBarShowLabel: false,
            }}
            tabBar={props => <MyTabBar {...props} />}>
            {ROUTES.map(item => (
              <MaterialTopTabs.Screen
                key={item.name}
                name={item.name}
                options={{
                  title: item.title,
                }}
              />
            ))}
          </MaterialTopTabs>
        </ThemedView>
      </SafeAreaViewComponent>
  );
}

const styles = StyleSheet.create({
  activeColor: {
    backgroundColor: 'rgba(0, 176, 176, 0.6902)',
    borderRadius: 4,
  },
});
