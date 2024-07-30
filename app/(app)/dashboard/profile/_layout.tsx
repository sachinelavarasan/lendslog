import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import SafeAreaViewComponent from '@/components/SafeAreaView';
import { ThemedView } from '@/components/ThemedView';
import PopupMenu from '@/components/PopupMenu';

import ProfileForm from './ProfileForm';

import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { logout } from '@/redux/slices/auth/authSlice';

export default function Profile() {
  const { user } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();
  const [isClicked, setIsClicked] = useState(false);
  const router = useRouter();

  const menuActions = [
    { id: 1, title: 'Edit', action: () => setIsClicked(true), icon: require('@/assets/icons/edit.png') },
    {
      id: 2,
      title: 'Logout',
      action: () => dispatch(logout(() => router.replace('(auth)/login'))),
      icon: require('@/assets/icons/logout.png'),
    },
  ];

  return (
    <KeyboardAvoidingView
      {...(Platform.OS === 'ios' ? { behavior: 'padding' } : {})}
      style={{ flex: 1 }}>
      <SafeAreaViewComponent>
        <ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={'always'}>
          <ThemedView
            style={{ flex: 1, paddingTop: StatusBar.currentHeight, paddingHorizontal: 10 }}>
            <View style={styles.mainContainer}>
              <View style={styles.actionsContainer}>
                <TouchableOpacity
                  accessibilityRole="button" 
                  onPress={() => {
                    router.back();
                  }}
                >
                  <Image source={require('@/assets/icons/back.png')} />
                </TouchableOpacity>
                {menuActions.length ? <PopupMenu actions={menuActions} /> : null}
              </View>
              <View
                style={[
                  styles.profileContainer,
                  // { backgroundColor: "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0") },
                ]}>
                <Text style={styles.profileText}>{user?.us_name[0]}</Text>
              </View>
              <View style={{ width: '100%' }}>
                <ProfileForm isEdit={isClicked} setIsClicked={setIsClicked} />
              </View>
            </View>
          </ThemedView>
        </ScrollView>
      </SafeAreaViewComponent>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  actionsContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 15,
  },
  profileContainer: {
    width: 120,
    height: 120,
    backgroundColor: '#FFCA3A',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 120,
    marginTop: 60,
    marginBottom: 20,
  },
  profileText: { color: '#ffffff', fontSize: 50 },
});
