import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {Colors, Icons} from '../utils';

const {Ionicons} = Icons;

const SearchBar = () => {
  const [searchParam, setSearchParam] = useState('');

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="輸入 #標籤 或 名稱"
        placeholderTextColor={Colors.PARAGRAPH}
        value={searchParam}
        onChangeText={setSearchParam}
        maxLength={10}
      />

      {searchParam.length > 0 && (
        <TouchableOpacity style={styles.button}>
          <Ionicons name="search" color={Colors.PRIMARY} size={24} />
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
    paddingHorizontal: 12,
    backgroundColor: Colors.GRAY,
    color: Colors.PARAGRAPH,
    borderRadius: 8,
  },
  button: {
    marginLeft: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
