import {StyleSheet, View, Text} from 'react-native';
import LottieView from 'lottie-react-native';
import React from 'react';

const Loading = () => {
  return (
    <View
      style={{
        height: '75%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <LottieView
        style={{width: '40%'}}
        autoPlay
        loop
        source={require('../../assets/animations/image_loading.json')}
      />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({});
