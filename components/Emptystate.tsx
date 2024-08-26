import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  ViewProps,
} from 'react-native';

interface ExtraButtonProps {
  title: string;
  description?: string;
}

const Emptystate: React.FC<ExtraButtonProps & ViewProps> = ({ title, description, ...props }) => {
  return (
    <View style={styles.container}>
      <Image source={require('@/assets/icons/empty-box.png')} />
      <View style={styles.contenContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
};

export default Emptystate;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    rowGap: 20,
  },
  title: {
    color: '#ffffff',
    fontSize: 24,
    fontFamily: 'Inter-700',
    textAlign: "center"
  },
  description: {
    color: '#D9D9D9',
    fontSize: 16,
    fontFamily: 'Inter-400',
    textAlign:"center"
  },
  contenContainer:{
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    rowGap:5,
    paddingHorizontal: 40,
  }
});
