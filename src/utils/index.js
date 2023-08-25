import {Dimensions} from 'react-native';
const {height, width} = Dimensions.get('window');

import Entypo from 'react-native-vector-icons/Entypo';

export const Colors = {
  PRIMARY_COLOR: '#F98D2A',
  SECONDARY_COLOR: '#F1AD7C',
  TITLE_COLOR: '#4C5178',
  PARAGRAPH_COLOR: '#4F4F4F',
  INACTIVE_COLOR: '#4F4F4F',
  BACKGROUND_COLOR: '#F4F4F4',
  UNFOCUS_COLOR: '#C4C4C4',
  CANCEL_COLOR: '#E74D38',
  DARK_GRAY_COLOR: '#212121',
  LIGHT_YELLOW_COLOR: '#EDCA6F',
  MODAL_INPUT_COLOR: '#FCFCFC',
  WHITE_COLOR: '#FFFFFF',
  TRANSPARENT_COLOR: 'rgba(241, 241, 241, 0.5)',
};

export const DeviceSize = {
  DeviceHeight: height,
  DeviceWidth: width,
};

export const Icons = {
  Entypo,
};
