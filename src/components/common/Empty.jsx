import {View, Text} from 'react-native';
import LottieView from 'lottie-react-native';
import React from 'react';
import {Colors} from '../../utils';

const Empty = () => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <LottieView
        style={{width: '80%'}}
        autoPlay
        loop
        source={require('../../assets/animations/search_failed.json')}
      />
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          color: Colors.PARAGRAPH,
          marginVertical: 4,
        }}>
        {'我們找遍了全世界...'}
      </Text>
      <Text
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          color: Colors.PARAGRAPH,
          marginVertical: 4,
        }}>
        {'試試其他的關鍵字！'}
      </Text>
    </View>
  );
};

export default Empty;
