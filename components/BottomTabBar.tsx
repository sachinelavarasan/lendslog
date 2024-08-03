import { View, Platform, TouchableOpacity, Text, Image } from 'react-native';
import Animated, { useSharedValue, withSpring, useAnimatedStyle } from 'react-native-reanimated';

export default function BottomTab({ state, descriptors, navigation }: any) {
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
              {/* {route.name === 'notification' ? (
                <Image
                  style={{ position: 'absolute', right: 18, top: 6 }}
                  source={require('@/assets/icons/notification-unread.png')}
                />
              ) : null} */}
              <options.tabBarIcon focused={isFocused} />
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
