import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

import {Colors, Icons} from '../utils';
import {SearchBar, ImageList} from '../components';

const {Entypo} = Icons;

const Recent = () => {
  const [searchParam, setSearchParam] = useState('');

  return (
    <View style={styles.container}>
      <SearchBar searchParam={searchParam} setSearchParam={setSearchParam} />

      <Text style={styles.title}>{searchParam ? '搜尋結果' : '最近使用'}</Text>

      <ImageList searchParam={searchParam} />
    </View>
  );
};

export default Recent;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 36,
    paddingHorizontal: 24,
  },
  title: {
    marginBottom: 12,
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.TITLE,
  },
  button: {
    position: 'absolute',
    bottom: 180,
    right: 24,
    padding: 16,
    borderRadius: 200,
    backgroundColor: Colors.SECONDARY,
  },
});
