import React from 'react';
import { StyleSheet, Text, TouchableOpacity, TouchableOpacityProps, View } from 'react-native';

interface ExtraButtonProps {
  linkText: string;
  description: string;
}
//Touchable opacity default props and custom props for this button
const AuthLink: React.FC<ExtraButtonProps & TouchableOpacityProps> = ({
  linkText,
  description,
  ...props
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.description}>{description}</Text>
      <TouchableOpacity {...props}>
        <Text style={styles.linkText}>{linkText}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AuthLink;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  linkText: {
    color: '#FFCA3A',
    fontSize: 16,
    textDecorationLine: 'underline',
    fontFamily: 'Inter-500',
  },
  description: {
    color: '#D9D9D9',
    fontSize: 16,
    marginRight: 15,
    fontFamily: 'Inter-400',
  },
});
