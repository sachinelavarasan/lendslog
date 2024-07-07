import { useEffect } from 'react';
// import { useRouter } from 'expo-router';
import { StyleSheet, StatusBar, Text, View, TouchableOpacity, FlatList } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';

import { ThemedView } from '@/components/ThemedView';
import SafeAreaViewComponent from '@/components/SafeAreaView';
import DueCard from '@/components/DueCard';
import HeaderWithCount from '@/components/HeaderWithCount';

import { db } from '@/firebaseConfig';
import { useAppSelector } from '@/redux/store';

export default function HomeScreen() {
  const lendLog = useAppSelector((state) => state.lends.log);
  console.log("lendLog ========", lendLog)
  // const router = useRouter();
    const fetchData= async()=>{
  const querySnapshot = await getDocs(collection(db, "admin"));
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data().name}`);
    })
  }
    useEffect(()=>{
      fetchData();
  },[])
  // const data = [
  //   {
  //     name: 'John Paul',
  //     type: 'Month',
  //     amt: Math.floor(Math.random() * 10000),
  //   },
  //   {
  //     name: 'Elavarsan',
  //     type: 'Week',
  //     amt: Math.floor(Math.random() * 10000),
  //   },
  //   {
  //     name: 'Janani',
  //     type: 'Week',
  //     amt: Math.floor(Math.random() * 10000),
  //   },
  //   {
  //     name: 'Nobody',
  //     type: 'Month',
  //     amt: Math.floor(Math.random() * 10000),
  //   },
  // ];

  // const goBack = () => {
  //   router.back();
  // };
  return (
    <SafeAreaViewComponent>
      <ThemedView style={{ flex: 1, paddingTop: StatusBar.currentHeight, paddingHorizontal: 20 }}>
        <HeaderWithCount title="Today due users list" count={10} />
        <FlatList
          bounces={false}
          style={{ marginBottom: 20, paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
          data={[...lendLog]}
          renderItem={({ item }: any) => {
            return <DueCard data={item} />;
          }}
          keyExtractor={(item: any, index: number) => item.name + index}
        />
      </ThemedView>
    </SafeAreaViewComponent>
  );
}

// const styles = StyleSheet.create({
//   titleContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     gap: 8,
//   },
//   stepContainer: {
//     gap: 8,
//     marginBottom: 8,
//   },
//   button: {
//     alignItems: 'center',
//     flexDirection: 'row',
//     justifyContent: 'center',
//     backgroundColor: '#FFCA3A',
//     borderRadius: 15,
//     paddingVertical: 15,
//     paddingHorizontal: 25,
//   },
// });
