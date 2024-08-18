// SearchBar.js
import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Keyboard } from 'react-native';
import { Feather, Entypo } from '@expo/vector-icons';

interface Props {
  searchPhrase: string;
  onChange: (e: any) => void;
  onClick: (searchPhrase: string) => void;
  onClose: () => void;
}

const SearchBar = ({ searchPhrase, onChange, onClick, onClose }: Props) => {
  const [clicked, setIsClicked] = useState(false);
  return (
    <View style={styles.container}>
      <View style={clicked ? styles.searchBar__clicked : styles.searchBar__unclicked}>
        {/* search Icon */}
        <Feather name="search" size={20} color="#C7C7C7" style={{ marginLeft: 10 }} />
        {/* Input field */}
        <TextInput
          style={styles.input}
          placeholder="Search by borrower name"
          value={searchPhrase}
          onChangeText={onChange}
          autoCorrect={false}
          autoComplete={'off'}
          spellCheck={false}
          autoCapitalize="none"
          onFocus={() => {
            setIsClicked(true);
          }}
          onSubmitEditing={() => {
            Keyboard.dismiss();
            onClick(searchPhrase);
            setIsClicked(false);
          }}
          placeholderTextColor={'#C7C7C7'}
        />

        <View style={styles.actions}>
          {clicked && (
            <>
              <View style={styles.check}>
                <Entypo
                  name="check"
                  size={20}
                  color="#b7b6c1"
                  style={{ padding: 2 }}
                  onPress={() => {
                    Keyboard.dismiss();
                    onClick(searchPhrase);
                    setIsClicked(false);
                  }}
                />
              </View>
              <View style={styles.close}>
                {/* cross Icon, depending on whether the search bar is clicked or not */}
                <Entypo
                  name="cross"
                  size={20}
                  color="#b7b6c1"
                  style={{ padding: 1.5 }}
                  onPress={() => {
                    Keyboard.dismiss();
                    onClose();
                    setIsClicked(false);
                  }}
                />
              </View>
            </>
          )}
        </View>
      </View>
      {/* cancel button, depending on whether the search bar is clicked or not */}
      {/* {clicked && (
        <View>
          <Button
            title="Cancel"
            onPress={() => {
              Keyboard.dismiss();
              setIsClicked(false);
            }}
          ></Button>
        </View>
      )} */}
    </View>
  );
};
export default SearchBar;

// styles
const styles = StyleSheet.create({
  container: {
    // margin: 15,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  searchBar__unclicked: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#1C1C29',
    borderRadius: 4,
    alignItems: 'center',
    elevation: 3,
  },
  searchBar__clicked: {
    paddingVertical: 12,
    paddingHorizontal: 10,
    flexDirection: 'row',
    width: '100%',
    backgroundColor: '#1C1C29',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    elevation: 3,
  },
  input: {
    fontSize: 14,
    marginLeft: 20,
    width: '70%',
    color: '#FFF',
    fontFamily: 'Inter-400',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 2,
  },
  check: {
    height: 25,
    width: 25,
    borderRadius: 25,
    backgroundColor: '#323448',
    alignContent: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  close: {
    height: 25,
    width: 25,
    borderRadius: 25,
    alignContent: 'center',
    justifyContent: 'center',
    borderColor: '#323448',
    backgroundColor: '#323448',
    borderWidth: 1,
    marginRight: 5,
  },
});
