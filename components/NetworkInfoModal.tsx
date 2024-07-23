import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useEffect, useState } from 'react';

import NetInfo from '@react-native-community/netinfo';
import Modal from 'react-native-modal';
import Spacer from '@/components/Spacer';
import { deviceWidth, deviceHeight } from '@/utils/functions';

const NetworkInfoModal = () => {
  const [netInfo, setNetInfo] = useState<{ type: string; connected: any }>({
    type: '',
    connected: null,
  });
  const width = deviceWidth();
  const height = deviceHeight();
  useEffect(() => {
    // Subscribe to network state updates
    const unsubscribe = NetInfo.addEventListener(state => {
      setNetInfo({
        type: state.type,
        connected: state.isConnected,
      });
    });

    return () => {
      // Unsubscribe to network state updates
      unsubscribe();
    };
  }, []);

  if ((netInfo.type === 'cellular' || 'wifi') && netInfo.connected) {
    return null;
  }
  return (
    <Modal
      isVisible={true}
      hasBackdrop={true}
      deviceHeight={height}
      deviceWidth={width}
      coverScreen={true}>
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={styles.modal}>
            <Image source={require('@/assets/icons/network-warning.png')}/>
          <Text
            style={styles.title}>
            Network Error
          </Text>
          <Spacer height={15} />
          <Text style={styles.subTitle}>
          There is an error occurred while connecting to  network. Please check your mobile network. 
          </Text>

        </View>
      </View>
    </Modal>
  );
};

export default NetworkInfoModal;

const styles = StyleSheet.create({
  modal: {
    backgroundColor: '#14141D',
    width: deviceWidth() - 60,
    borderRadius: 10,
    paddingVertical: 30,
    paddingHorizontal: 30,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#ffffff',
    fontSize: 24,
    textAlign: 'center',
    lineHeight: 24,
    marginTop: 16
  },
  subTitle:{
    color: '#C7C7C7',
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  }
});
