import { useEffect, useState } from 'react';
import { Platform, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';

import SearchBar from '@/components/SearchBar';
import { useAppDispatch } from '@/redux/hooks';
import { getAllLends } from '@/redux/slices/lends/lendsSlice';

export default function SearchLend() {
  const [searchPhrase, setSearchPhrase] = useState('');
  const dispatch = useAppDispatch();
  const isFocused = useIsFocused();


  useEffect(() => {
    return () => {
      setSearchPhrase('');
    };
  }, [isFocused]);

  const search = (data?: string) => {
    dispatch(getAllLends(data));
  };

  return (
    <View style={{ marginTop: Platform.OS == 'android' ? 25 : 5 }}>
      <SearchBar
        searchPhrase={searchPhrase}
        onChange={(e: any) => {
          setSearchPhrase(e);
        }}
        onClick={(searchPhrase: string) => {
          if (searchPhrase.trim().length) {
            search(searchPhrase.trim());
          }
        }}
        onClose={() => {
          setSearchPhrase('');
          search();
        }}
      />
    </View>
  );
}
