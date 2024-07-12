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
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from 'react-native-reanimated';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';

const ROUTES: {
  name: string;
  title: string;
  icon: any;
}[] = [
  {
    name: 'index',
    title: 'Today',
    // icon: require('@/assets/icons/Today.png'),
    icon: 'calendar',
  },
  {
    name: 'add',
    title: 'Add',
    // icon: require('@/assets/icons/add.png'),
    icon: 'plus',
  },
  {
    name: 'lends',
    title: 'Lends',
    // icon: require('@/assets/icons/week-month-icon.png'),
    icon: 'money-check-alt',
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
        // paddingHorizontal: 20,
        // paddingTop: 10,
        borderTopColor: '#14141D',
        borderTopWidth: 1,
        position: 'static',
        bottom: 0,
        // height:90
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
        const borderColor = useSharedValue('transparent');

        if (isFocused) {
          borderColor.value = withSpring('#FFCA3A', {
            duration: 300,
            dampingRatio: 2,
          }); // animate when focused
        } else {
          borderColor.value = withSpring('transparent'); // animate when focused
        }

        const animatedStyle = useAnimatedStyle(() => {
          return {
            // width: width.value,
            // backgroundColor: isFocused ? '#FFCA3A' : 'transparent',
            // borderRadius: isFocused ? 90 : 0,
            borderTopColor: borderColor.value,
          };
        });

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
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 10,
              },
            ]}>
            <Animated.View
              style={[
                {
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  alignItems: 'center',
                  borderTopWidth: 3,
                },
                animatedStyle,
              ]}>
              {/* <Image source={options.tabBarIcon} /> */}
              {['lends','add'].includes(route.name) ? (
                <FontAwesome5
                  name={options.tabBarIcon}
                  size={24}
                  color={isFocused ? '#FFCA3A' : '#FFF'}
                />
              ) : (
                <Ionicons
                  name={options.tabBarIcon}
                  color={isFocused ? '#FFCA3A' : '#FFF'}
                  size={24}
                />
              )}
            </Animated.View>
            <Text
              style={{
                color: isFocused ? '#FFCA3A' : '#FFF',
                fontFamily: 'Inter-400',
                fontSize: 10,
              }}>
              {label}
            </Text>
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
