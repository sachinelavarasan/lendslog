import React from 'react';
import { Tabs } from 'expo-router';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  Dimensions,
} from 'react-native';

const ROUTES = [
  {
    name: 'index',
    title: 'Today',
    icon: require('@/assets/icons/Today.png'),
  },
  {
    name: 'add',
    title: 'Add',
    icon: require('@/assets/icons/add.png'),
  },
  {
    name: 'lends',
    title: 'Lends',
    icon: require('@/assets/icons/week-month-icon.png'),
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
        backgroundColor: '#0B0B0F',
        paddingBottom: Platform.OS === 'ios' ? 10 : 0,
        paddingHorizontal: 20,
        paddingTop: 10,
        borderTopColor: '#14141D',
        borderTopWidth: 1,
        position: 'static',
        bottom: 0,
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
            style={[{ flex: 1, alignItems: 'center', marginBottom: 10 }]}>
            <View
              style={[
                { height: 55, width: 55, padding: 5, alignItems: 'center' },
                isFocused ? styles.activeColor : null,
              ]}>
              <Image source={options.tabBarIcon} />
              <Text
                style={{
                  color: '#D9D9D9',
                  fontFamily: 'Inter-700',
                  fontSize: 10,
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

export default function TabLayout() {
  const { width, height } = Dimensions.get('window');
  return (
    <View
      style={{
        width,
        height,
      }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
        tabBar={props => <MyTabBar {...props} />}>
        {ROUTES.map(item => (
          <Tabs.Screen
            key={item.name}
            name={item.name}
            options={{
              title: item.title,
              tabBarIcon: item.icon,
            }}
          />
        ))}
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  activeColor: {
    backgroundColor: '#14141D',
    borderRadius: 10,
  },
});
