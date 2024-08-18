import React, { useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';

import DueCard from '@/components/DueCard';
import HeaderWithCount from '@/components/HeaderWithCount';
import { IinstallmentTimelines } from '@/utils/types/lends';
import Spacer from './Spacer';

const InstallmentsListModal = ({ installmentTimelines = [] }: any) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          setIsVisible(!isVisible);
        }}>
        <Text
          style={{
            color: '#c7c7c7',
            fontSize: 14,
            fontFamily: 'Inter-500',
            textDecorationLine:'underline'
          }}>
          View
        </Text>
      </TouchableOpacity>
      <Modal
        isVisible={isVisible}
        hasBackdrop={true}
        coverScreen={true}
        animationIn="fadeIn"
        animationOut="fadeOut"
        backdropColor="#060609"
        backdropOpacity={0.9}
        hideModalContentWhileAnimating={true}
        useNativeDriver={true}>
        <View
          style={{
            marginBottom: 15,
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <HeaderWithCount
            title="Installments List"
            subTitle
            count={installmentTimelines?.length}
          />
          <TouchableOpacity
            onPress={() => {
              setIsVisible(!isVisible);
            }}>
            <Image source={require('@/assets/icons/close.png')} />
          </TouchableOpacity>
        </View>
        <FlatList
          bounces={false}
          // style={{ marginBottom: 20, paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
          // contentContainerStyle={{ paddingHorizontal: 15 }}
          ItemSeparatorComponent={() => <Spacer height={10} />}
          data={installmentTimelines}
          renderItem={({ item }: { item: IinstallmentTimelines }) => {
            return <DueCard {...item} />;
          }}
          keyExtractor={(item: IinstallmentTimelines, index: number) => item.it_id + 'log'}
        />
      </Modal>
    </>
  );
};

export default InstallmentsListModal;
