import {Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');

import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const Colors = {
  PRIMARY: '#5662F6',
  SECONDARY: '#A7ACED',
  TITLE: '#4C5178',
  PARAGRAPH: '#4F4F4F',
  INACTIVE: '#4F4F4F',
  GRAY: '#E6E6E6',
  UNFOCUS: '#C4C4C4',
  CANCEL: '#E74D38',
  WHITE: '#FFFFFF',
};

export const DeviceSize = {
  DeviceHeight: height,
  DeviceWidth: width,
};

export const Icons = {
  Entypo,
  Ionicons,
};
