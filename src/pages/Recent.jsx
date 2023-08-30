import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import {Colors, Icons} from '../utils';
import {SearchBar, ImageList} from '../components';

const {Entypo} = Icons;

const Recent = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Entypo name="back-in-time" color={Colors.TITLE} size={36} />
        <Text style={styles.title}>最近使用</Text>
      </View>

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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    position: 'relative',
    top: -3,
    marginLeft: 12,
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
