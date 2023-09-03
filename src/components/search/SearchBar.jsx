import {StyleSheet, View, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {Colors, Icons} from '../../utils';

const {Ionicons} = Icons;

const SearchBar = ({
  fetchImage,
  setIsSearching,
}) => {
  const [searchParam, setSearchParam] = useState('');
  const onSearch = () => {
    setIsSearching(true);
    fetchImage(searchParam);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="輸入關鍵字"
        placeholderTextColor={Colors.INACTIVE}
        value={searchParam}
        onChangeText={setSearchParam}
        maxLength={50}
      />
      <TouchableOpacity
        style={styles.icon}
        onPress={searchParam ? onSearch : null}>
        <Ionicons
          name="search"
          color={searchParam ? Colors.PRIMARY : Colors.INACTIVE}
          size={24}
        />
      </TouchableOpacity>
      {searchParam && (
        <TouchableOpacity
          style={styles.cancel}
          onPress={() => {
            setSearchParam('');
            setIsSearching(false);
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
    flex: 1,
    paddingRight: 72,
    paddingLeft: 12,
    backgroundColor: Colors.GRAY,
    color: Colors.PARAGRAPH,
    borderRadius: 8,
    elevation: 3,
  },
  icon: {
    position: 'absolute',
    right: 12,
  },
  cancel: {
    position: 'absolute',
    right: 48,
  },
});
