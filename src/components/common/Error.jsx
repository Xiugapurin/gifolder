import {StyleSheet, View, Text} from 'react-native';
import LottieView from 'lottie-react-native';
import React from 'react';
import {Colors} from '../../utils';

const Error = ({error}) => {
  return (
    <View
      style={{
        height: '75%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <LottieView
        style={{width: '60%'}}
        autoPlay
        loop={false}
        source={require('../../assets/animations/error.json')}
      />
      <Text style={{fontSize: 18, fontWeight: 'bold', color: Colors.PARAGRAPH}}>
        {error}
      </Text>
    </View>
  );
};

export default Error;

const styles = StyleSheet.create({});
