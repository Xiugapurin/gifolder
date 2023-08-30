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
        placeholder="輸入名稱"
        placeholderTextColor={Colors.INACTIVE}
        value={searchParam}
        onChangeText={setSearchParam}
        maxLength={10}
      />

      <TouchableOpacity style={styles.button}>
        <Ionicons
          name="search"
          color={searchParam.length > 0 ? Colors.PRIMARY : Colors.INACTIVE}
          size={28}
        />
      </TouchableOpacity>
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
    elevation: 3,
  },
  button: {
    marginLeft: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
