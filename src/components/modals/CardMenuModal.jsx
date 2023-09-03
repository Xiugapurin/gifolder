import {
  StyleSheet,
  Text,
  View,
  Share,
  TouchableOpacity,
  ToastAndroid,
  TextInput,
  Keyboard,
} from 'react-native';
import React, {useState} from 'react';
import Clipboard from '@react-native-clipboard/clipboard';
import {Colors, Icons} from '../../utils';
import FastImage from 'react-native-fast-image';
import useUpdateImage, {useDeleteImage} from '../../hooks/useImage';

const {Ionicons} = Icons;

const CardMenuModal = ({toggleModal, activeItem, onRefresh}) => {
  const [imageTitle, setImageTitle] = useState(activeItem?.title);
  const [imageTitleLength, setImageTitleLength] = useState(
    activeItem?.title?.length,
  );
  const [isInputFocus, setIsInputFocus] = useState(false);
  const {deleteImage, error: deleteError} = useDeleteImage();
  const {updateImageTitle, updating, error: updateError} = useUpdateImage();

  const onChangeText = text => {
    setImageTitle(text);
    setImageTitleLength(text.length);
  };

  const onDeletePress = async () => {
    await deleteImage(activeItem?.ID);
    onRefresh();
    toggleModal();
  };

  const onUpdate = async () => {
    updateImageTitle(activeItem.ID, imageTitle)
      .then(() => {
        ToastAndroid.showWithGravity(
          '圖片名稱已更新！',
          ToastAndroid.SHORT,
          ToastAndroid.BOTTOM,
        );
      })
      .catch(() => {
        ToastAndroid.show(updateError, ToastAndroid.SHORT);
      })
      .finally(() => {
        onRefresh();
        toggleModal();
      });
  };

  const onShare = async () => {
    const uri = activeItem?.uri;
    // const message = uri.includes('tenor.com') ? uri.replace('.gif', '') : uri;

    try {
      const result = await Share.share({
        message: uri,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.modal}
        onPress={Keyboard.dismiss}
        activeOpacity={1}>
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
              aspectRatio: 16 / 9,
              borderTopRightRadius: 4,
              borderTopLeftRadius: 4,
              marginBottom: 12,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
          <Text style={styles.imageTitle}>圖片名稱</Text>
          <TextInput
            style={[
              styles.imageTitleInput,
              isInputFocus
                ? {
                    borderColor: Colors.PRIMARY,
                    backgroundColor: Colors.WHITE,
                  }
                : {borderColor: Colors.GRAY},
            ]}
            value={imageTitle}
            onChangeText={onChangeText}
            placeholder="無標題"
            placeholderTextColor={Colors.GRAY}
            multiline={true}
            onFocus={() => setIsInputFocus(true)}
            onBlur={() => setIsInputFocus(false)}
            maxLength={50}
          />
          <Text
            style={styles.imageTitleLength}>{`${imageTitleLength} / 50`}</Text>
        </View>

        <View style={styles.footer}>
          <View>
            <TouchableOpacity
              style={[
                styles.footerButton,
                {backgroundColor: Colors.WHITE, marginBottom: 8},
              ]}
              onPress={() => {
                Clipboard.setString(activeItem.uri);
              }}>
              <Ionicons
                name="copy-outline"
                size={20}
                color={Colors.PARAGRAPH}
              />
              <Text
                style={[styles.footerButtonText, {color: Colors.PARAGRAPH}]}>
                複製連結
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.footerButton, {backgroundColor: Colors.CANCEL}]}
              onPress={onDeletePress}>
              <Ionicons name="trash" size={20} color={Colors.WHITE} />
              <Text style={styles.footerButtonText}>刪除圖片</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={[
                styles.footerButton,
                {backgroundColor: Colors.WHITE, marginBottom: 8},
              ]}
              onPress={onShare}>
              <Ionicons
                name="share-social"
                size={20}
                color={Colors.PARAGRAPH}
              />
              <Text
                style={[styles.footerButtonText, {color: Colors.PARAGRAPH}]}>
                分享圖片
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.footerButton}
              onPress={updating ? null : onUpdate}>
              <Ionicons name="checkmark-sharp" size={20} color={Colors.WHITE} />
              <Text style={styles.footerButtonText}>確定修改</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
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
    marginBottom: 8,
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.PARAGRAPH,
  },
  imageTitleInput: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    paddingHorizontal: 8,
    borderRadius: 4,
    borderWidth: 1,
    backgroundColor: Colors.GRAY,
    color: Colors.PARAGRAPH,
  },
  imageTitleLength: {
    marginBottom: 48,
    fontSize: 10,
    color: Colors.PARAGRAPH,
    textAlign: 'right',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
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
    marginLeft: 4,
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.WHITE,
  },
});
