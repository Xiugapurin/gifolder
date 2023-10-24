import {StyleSheet, View, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {Colors, Icons} from '../../utils';
import {useSearchImage} from '../../hooks/useOnlineImageRepo';

const {Ionicons} = Icons;

const SearchBar = ({searchParam, setSearchParam}) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="輸入關鍵字"
        placeholderTextColor={Colors.INACTIVE}
        value={searchParam}
        onChangeText={setSearchParam}
        maxLength={40}
      />
      <View style={styles.icon}>
        <Ionicons
          name="search"
          color={searchParam ? Colors.PRIMARY : Colors.INACTIVE}
          size={24}
        />
      </View>
      {searchParam && (
        <TouchableOpacity
          style={styles.cancel}
          onPress={() => {
            setSearchParam('');
          }}>
          <Ionicons name="close" color={Colors.TITLE} size={18} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  input: {
    width: '100%',
    paddingLeft: 48,
    backgroundColor: Colors.GRAY,
    color: Colors.PARAGRAPH,
    borderRadius: 8,
    elevation: 3,
  },
  icon: {
    position: 'absolute',
    left: 12,
  },
  cancel: {
    position: 'absolute',
    right: 12,
  },
});
