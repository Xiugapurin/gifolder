import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import FastImage from 'react-native-fast-image';
import DoritoImage from '../assets/images/Dorito.png';
import {Colors, Icons} from '../utils';

const {Ionicons} = Icons;

const Setting = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <FastImage
          source={DoritoImage}
          style={{
            width: '40%',
            aspectRatio: 1,
            marginBottom: 12,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
        <Text style={styles.title}>Dorito</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>個人設置</Text>
      </View>
    </ScrollView>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 36,
    paddingHorizontal: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.Yellow,
    fontFamily: 'sans-serif-condensed',
    textShadowColor: Colors.GRAY,
    textShadowOffset: {width: 0, height: 0.5},
    textShadowRadius: 1,
  },
  section: {},
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.TITLE,
  },
});
