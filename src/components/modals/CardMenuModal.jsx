import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {Colors, Icons} from '../../utils';
import FastImage from 'react-native-fast-image';
import {useDeleteImage} from '../../hooks/useImage';

const {Ionicons} = Icons;

const CardMenuModal = ({toggleModal, activeItem, onRefresh}) => {
  const {deleteImage, error} = useDeleteImage();

  const onDeletePress = async () => {
    await deleteImage(activeItem?.ID);
    onRefresh();
    toggleModal();
  };

  return (
    <View style={styles.container}>
      <View style={styles.modal}>
        {/* START Header */}
        <View style={styles.header}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="image" color={Colors.PARAGRAPH} size={24} />
            <Text style={styles.title}>圖片資訊</Text>
          </View>
          <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
            <Ionicons name="close" size={24} color={Colors.PARAGRAPH} />
          </TouchableOpacity>
        </View>
        {/* END Header */}
        <View style={styles.content}>
          <FastImage
            source={{uri: activeItem?.uri}}
            style={{
              width: '100%',
              // aspectRatio: activeItem.aspectRatio,
              aspectRatio: 16 / 9,
              borderTopRightRadius: 4,
              borderTopLeftRadius: 4,
              marginBottom: 12,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
          {/* <Text style={styles.imageTitle}>{activeItem?.title}</Text> */}
          <Text
            numberOfLines={2}
            ellipsizeMode="tail"
            style={styles.imageTitle}>
            {activeItem?.title}
          </Text>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.footerButton, {backgroundColor: Colors.CANCEL}]}
            onPress={onDeletePress}>
            <Ionicons name="trash" size={20} color={Colors.WHITE} />
            <Text style={[styles.footerButtonText, {marginLeft: 4}]}>
              刪除圖片
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.footerButton} onPress={toggleModal}>
            <Text style={styles.footerButtonText}>確定</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default CardMenuModal;

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
    marginBottom: 16,
  },
  title: {
    position: 'relative',
    top: -3,
    marginLeft: 8,
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.TITLE,
  },
  imageTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 36,
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
    backgroundColor: Colors.PRIMARY,
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
