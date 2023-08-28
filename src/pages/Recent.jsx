import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

import {Colors, Icons} from '../utils';
import {SearchBar, ImageList} from '../components';

const {Entypo} = Icons;

const Recent = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <SearchBar />
      <Text style={styles.title}>最近使用</Text>
      <ImageList />
      {/* <TouchableOpacity
        style={styles.button}
        activeOpacity={0.9}
        onPress={() => {
          navigation.navigate('Upload');
        }}>
        <Entypo name="plus" color={Colors.WHITE} size={36} />
      </TouchableOpacity> */}
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
    marginBottom: 12,
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
