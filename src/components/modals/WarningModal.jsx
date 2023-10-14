import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Colors, Icons} from '../../utils';
import {useDeleteImage} from '../../hooks/useImage';
import FastImage from 'react-native-fast-image';

const {Ionicons} = Icons;

const WarningModal = ({toggleModal, imageID, imageUri, exit}) => {
  const {deleteImage, error} = useDeleteImage();

  const onDeletePress = async () => {
    deleteImage(imageID)
      .then(() => {
        ToastAndroid.showWithGravity(
          '圖片已刪除',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      })
      .catch(e => {
        ToastAndroid.showWithGravity(
          error,
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      })
      .finally(() => {
        toggleModal();
        exit();
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.modal}>
        <View style={styles.header}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="warning" color={Colors.CANCEL} size={24} />
            <Text style={styles.title}>刪除確認</Text>
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
            <Ionicons name="close" size={24} color={Colors.PARAGRAPH} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <FastImage
            source={{uri: imageUri}}
            style={{
              width: '100%',
              aspectRatio: 16 / 9,
              borderTopRightRadius: 4,
              borderTopLeftRadius: 4,
              marginBottom: 12,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
          <Text
            style={{fontSize: 16, fontWeight: 'bold', color: Colors.PARAGRAPH}}>
            確定刪除這張圖片嗎？
          </Text>
          <Text
            style={{fontSize: 16, fontWeight: 'bold', color: Colors.PARAGRAPH}}>
            圖片刪除後將無法回復！
          </Text>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[
              styles.footerButton,
              {backgroundColor: Colors.WHITE, elevation: 0},
            ]}
            onPress={toggleModal}>
            <Text style={[styles.footerButtonText, {color: Colors.PARAGRAPH}]}>
              取消
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerButton} onPress={onDeletePress}>
            <Ionicons name="trash" color={Colors.WHITE} size={20} />
            <Text style={[styles.footerButtonText, {marginLeft: 4}]}>
              刪除圖片
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default WarningModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '80%',
    padding: 16,
    borderRadius: 8,
    backgroundColor: Colors.WHITE,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    position: 'relative',
    top: -2,
    marginLeft: 8,
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.CANCEL,
  },
  content: {
    marginBottom: 64,
    alignItems: 'center',
  },
  filterButtonTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.PARAGRAPH,
    marginBottom: 24,
  },
  filterButtonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  filterButtonRowTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.PARAGRAPH,
  },
  filterButton: {
    width: '40%',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginLeft: 16,
    borderRadius: 4,
    backgroundColor: Colors.WHITE,
    elevation: 3,
  },
  filterButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.PARAGRAPH,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    backgroundColor: Colors.CANCEL,
    elevation: 1,
  },
  footerButtonText: {
    position: 'relative',
    top: -1,
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.WHITE,
  },
});
