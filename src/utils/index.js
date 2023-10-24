import {Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');

import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const Colors = {
  PRIMARY: '#3F80E3',
  SECONDARY: '#A7ACED',
  TITLE: '#4C5178',
  PARAGRAPH: '#4F4F4F',
  INACTIVE: '#4F4F4F',
  GRAY: '#E0E0E0',
  UNFOCUS: '#C4C4C4',
  CANCEL: '#E74D38',
  WHITE: '#FFFFFF',
  Yellow: '#F3DF7C',
};

export const DeviceSize = {
  DeviceHeight: height,
  DeviceWidth: width,
};

export const Icons = {
  Entypo,
  Ionicons,
};
