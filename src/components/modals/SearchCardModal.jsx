import {
  Text,
  View,
  Share,
  Keyboard,
  TextInput,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {Colors, Icons} from '../../utils';
import FastImage from 'react-native-fast-image';
import {useUploadImage} from '../../hooks/useImage';

const {Entypo, Ionicons} = Icons;

const SearchCardModal = ({toggleModal, activeItem, activeItemAspectRatio}) => {
  const [imageTitle, setImageTitle] = useState(activeItem?.content_description);
  const [imageTitleLength, setImageTitleLength] = useState(
    activeItem?.content_description.length,
  );
  const [isInputFocus, setIsInputFocus] = useState(false);
  const {uploadImage, uploading, error} = useUploadImage();

  const onChangeText = text => {
    setImageTitle(text);
    setImageTitleLength(text.length);
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: activeItem?.media_formats.gif.url,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const onAddButtonPress = () => {
    uploadImage(
      activeItem?.media_formats.gif.url,
      activeItem?.media_formats.tinygif.url,
      imageTitle,
      activeItemAspectRatio,
    )
      .then(() => {
        ToastAndroid.show('已成功加入至圖庫！', ToastAndroid.SHORT);
      })
      .catch(() => {
        ToastAndroid.show(error, ToastAndroid.SHORT);
      })
      .finally(() => {
        toggleModal();
      });
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
            source={{uri: activeItem?.media_formats.tinygif.url}}
            style={{
              width: '100%',
              aspectRatio: 16 / 9,
              borderRadius: 4,
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
          <TouchableOpacity
            style={[styles.footerButton, {backgroundColor: Colors.WHITE}]}
            onPress={onShare}>
            <Ionicons name="share-social" size={20} color={Colors.PRIMARY} />
            <Text style={[styles.footerButtonText, {color: Colors.PRIMARY}]}>
              分享圖片
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.footerButton}
            onPress={uploading ? null : onAddButtonPress}>
            <Entypo name="plus" size={20} color={Colors.WHITE} />
            <Text style={styles.footerButtonText}>加入圖庫</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SearchCardModal;

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
    fontFamily: 'sans-serif-condensed',
    color: Colors.PARAGRAPH,
    textAlign: 'right',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
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
    marginLeft: 4,
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.WHITE,
  },
});
