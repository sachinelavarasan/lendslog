import { useContext, useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Redirect, useRouter } from 'expo-router';

// import { FirebaseContext } from '@/contexts/firebase-context';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { fetchProfile } from '@/redux/slices/auth/authSlice';

const StartPage = () => {
  const dispatch = useAppDispatch();
  const { user, isAuthenticateLoading } = useAppSelector(state=>state.auth);

  useEffect(() => {
    dispatch(fetchProfile())
  }, []);

  if(isAuthenticateLoading && !user){
    return (
      <View style={{ flex: 1, justifyContent: 'center', backgroundColor:'#0D0D12' }}>
        <ActivityIndicator size="large" color="#FFCA3A" />
      </View>
    );
  }
  if(!isAuthenticateLoading && !user)
  return <Redirect href="/dashboard" />;

  if(!isAuthenticateLoading && user)
  return <Redirect href="dashboard" />;

  return null;

};

export default StartPage;
