import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import {Colors} from '../utils';
import {SearchBar, ImageList} from '../components';

const Recent = () => {
  return (
    <View style={styles.container}>
      <SearchBar />
      <Text style={styles.title}>最近使用</Text>
      <ImageList />
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
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.TITLE,
  },
});
