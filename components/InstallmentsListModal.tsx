import React, { useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';

import DueCard from '@/components/DueCard';
import HeaderWithCount from '@/components/HeaderWithCount';

import Spacer from './Spacer';

import { IinstallmentTimelines } from '@/utils/types/lends';
import { deviceWidth } from '@/utils/functions';

const InstallmentsListModal = ({ installmentTimelines = [] }: any) => {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <>
      <View
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          width: deviceWidth() - 50,
          paddingTop: 12,
        }}>
        <View
          style={{
            display: 'flex',
            columnGap: 4,
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <Image source={require('@/assets/icons/info.png')} style={{ width: 18, height: 18 }} />
          <Text style={{ color: '#ffffff', fontFamily: 'Inter-600', fontSize: 14, marginLeft: 2 }}>
            To view installment details,
          </Text>
          <TouchableOpacity
            onPress={() => {
              setIsVisible(!isVisible);
            }}
            style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
            <Text
              style={{
                fontSize: 14,
                fontFamily: 'Inter-500',
                borderRadius: 4,
                textDecorationLine: "underline",
                color: "#FFCA3A",
              }}>
              Click here
            </Text>
          </TouchableOpacity>
        </View>
        {/* <View>
          <TouchableOpacity
            onPress={() => {
              setIsVisible(!isVisible);
            }}>
            <Text
              style={{
                color: '#c7c7c7',
                fontSize: 14,
                fontFamily: 'Inter-500',
                backgroundColor: '#323448',
                paddingHorizontal: 8,
                paddingVertical: 2,
                borderRadius: 4,
              }}>
              View
            </Text>
          </TouchableOpacity>
        </View> */}
      </View>
      <Modal
        isVisible={isVisible}
        hasBackdrop={true}
        coverScreen={true}
        animationIn="fadeIn"
        animationOut="fadeOut"
        backdropColor="#060609"
        backdropOpacity={1}
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
