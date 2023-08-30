import {StyleSheet, View, Text} from 'react-native';
import LottieView from 'lottie-react-native';
import React from 'react';
import {Colors} from '../utils';

const Loading = () => {
  return (
    <View
      style={{
        height: '75%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <LottieView
        style={{width: '50%'}}
        autoPlay
        loop
        source={require('../assets/animations/loading.json')}
      />
      <Text style={{fontSize: 18, fontWeight: 'bold', color: Colors.PARAGRAPH}}>
        載入中 ...
      </Text>
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({});
