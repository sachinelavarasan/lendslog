import React from 'react';
import { StyleSheet, SafeAreaView, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

type SafeAreaViewComponentProps = ViewProps & {
  children: JSX.Element;
  lightColor?: string;
  darkColor?: string;
};

const SafeAreaViewComponent = ({
  children,
  style,
  lightColor,
  darkColor,
  ...otherProps
}: SafeAreaViewComponentProps) => {
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
  return (
    <SafeAreaView style={[{ backgroundColor }, styles.container, style]} {...otherProps}>
      {children}
    </SafeAreaView>
  );
};
export default SafeAreaViewComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
