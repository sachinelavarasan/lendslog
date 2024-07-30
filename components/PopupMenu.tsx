import { useMemo, useState } from 'react';
import { Image, ImageSourcePropType, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';

interface PopupMenuProps {
  actions: {
    id: number;
    title: string;
    icon?: ImageSourcePropType;
    action: () => void;
  }[];
}
const PopupMenu = ({ actions }: PopupMenuProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const openMenu = () => setModalVisible(true);
  const closeMenu = () => setModalVisible(false);

  const popupOptions = useMemo(() => {
    if (actions) return actions;
    else actions = [];
  }, [actions]);

  return (
    <View  style={{position:"relative"}}>
      <TouchableOpacity
        accessibilityRole="button"
        onPress={openMenu}
        style={[[modalVisible ? styles.isSelected : null, { padding: 5 }]]}>
        <Image source={require('@/assets/icons/3-dot.png')} />
      </TouchableOpacity>
      <Modal
        isVisible={modalVisible && actions.length > 0}
        onBackdropPress={() => closeMenu()}
        animationIn="slideInUp"
        backdropOpacity={0}
       
      >
        <View style={styles.overlay}>
          <View style={styles.menu}>
            {popupOptions &&
              popupOptions.length &&
              popupOptions.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.menuItem,
                      index < popupOptions.length - 1 ? { marginBottom: 8 } : null,
                    ]}
                    onPress={() => {
                      item.action();
                      closeMenu();
                    }}>
                    <Image source={item.icon} />
                    <Text style={styles.menuItemText}>{item.title}</Text>
                  </TouchableOpacity>
                );
              })}
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default PopupMenu;
const styles = StyleSheet.create({
  overlay: {
    flex:1,
    top:30,
    right:0,
    position: 'absolute'
  },
  menu: {
    width: 200,
    padding: 10,
    backgroundColor: '#14141D',
    borderRadius: 6,
    alignItems: 'center',
  },
  menuItem: {
    width: '100%',
    backgroundColor: '#0D0D12',
    borderRadius: 6,
    display: 'flex',
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  menuItemText: { fontSize: 16, color: '#FFFFFF', fontFamily: 'Inter-500' },
  isSelected: {
    backgroundColor: '#14141D',
    borderRadius: 30,
  },
});
