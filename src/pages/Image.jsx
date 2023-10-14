import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Keyboard,
  ScrollView,
  ToastAndroid,
  Share,
} from 'react-native';
import FastImage from 'react-native-fast-image';
import Modal from 'react-native-modal';
import {Icons, Colors} from '../utils';
import Clipboard from '@react-native-clipboard/clipboard';
import useUpdateImage from '../hooks/useImage';
import {WarningModal} from '../components';

const {Ionicons, Entypo} = Icons;

const Image = ({route, navigation}) => {
  const {imageInfo} = route.params;

  const {ID, title, uri, aspect_ratio} = imageInfo;
  const [prevTitle, setPrevTitle] = useState(title);
  const [imageTitle, setImageTitle] = useState(title);
  const [imageTitleLength, setImageTitleLength] = useState(title.length);
  const [isWarningModalVisible, setIsWarningModalVisible] = useState(false);
  const {updateImageTitle, updating, error: updateError} = useUpdateImage();

  const toggleModal = () => {
    setIsWarningModalVisible(prev => !prev);
  };

  const truncatedUri = uri =>
    uri.length > 40 ? uri.slice(0, 40) + '...' : uri;

  const onChangeText = text => {
    setImageTitle(text);
    setImageTitleLength(text.length);
  };

  const onUpdate = async () => {
    updateImageTitle(ID, imageTitle)
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
        setPrevTitle(imageTitle);
      });
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: uri,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const exit = () => {
    navigation.navigate('Root', {screen: 'Home'});
  };

  return (
    <View style={styles.container}>
      <Modal
        isVisible={isWarningModalVisible}
        animationIn={'zoomIn'}
        animationOInTiming={100}
        animationOut={'zoomOut'}
        animationOutTiming={300}
        onBackdropPress={toggleModal}
        onBackButtonPress={toggleModal}
        useNativeDriver={true}
        backdropOpacity={0.5}>
        <WarningModal
          toggleModal={toggleModal}
          imageID={ID}
          imageUri={uri}
          exit={exit}
        />
      </Modal>
      <View style={styles.header}>
        <Entypo name="info-with-circle" color={Colors.TITLE} size={32} />
        <Text style={styles.title}>圖片詳情</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          style={styles.content}
          onPress={Keyboard.dismiss}
          activeOpacity={1}>
          <FastImage
            source={{uri: uri}}
            style={{
              width: '100%',
              aspectRatio: aspect_ratio,
              borderRadius: 4,
              marginBottom: 16,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />

          <Text style={styles.sectionTitle}>圖片名稱</Text>
          <View style={styles.imageTitleInputContainer}>
            <TextInput
              style={styles.imageTitleInput}
              value={imageTitle}
              onChangeText={onChangeText}
              placeholder="無標題"
              placeholderTextColor={Colors.PARAGRAPH}
              multiline={true}
              maxLength={50}
            />
            {imageTitle.length > 0 && (
              <TouchableOpacity
                style={styles.imageTitleInputClose}
                onPress={() => {
                  setImageTitle('');
                  setImageTitleLength(3);
                }}>
                <Ionicons name="close" color={Colors.TITLE} size={18} />
              </TouchableOpacity>
            )}
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent:
                prevTitle !== imageTitle ? 'space-between' : 'flex-end',
            }}>
            <Text
              style={
                styles.imageTitleLength
              }>{`${imageTitleLength} / 50`}</Text>
            {prevTitle !== imageTitle && (
              <View style={{flexDirection: 'row', gap: 8}}>
                <TouchableOpacity
                  style={[styles.renameButton, {backgroundColor: Colors.WHITE}]}
                  onPress={() => {
                    setImageTitle(title);
                  }}>
                  <Text
                    style={{
                      fontSize: 14,
                      fontWeight: 'bold',
                      color: Colors.PARAGRAPH,
                    }}>
                    恢復
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.renameButton}
                  onPress={updating ? null : onUpdate}>
                  <Text style={{fontSize: 14, color: Colors.WHITE}}>
                    確定更改
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          <Text style={styles.sectionTitle}>圖片連結</Text>
          <View style={styles.imageUri}>
            <Text>{truncatedUri(uri)}</Text>
            <TouchableOpacity
              style={styles.imageUriButton}
              onPress={() => {
                Clipboard.setString(uri);
              }}>
              <Ionicons name="copy-outline" size={20} color={Colors.TITLE} />
            </TouchableOpacity>
          </View>

          <Text style={styles.sectionTitle}>更多選項</Text>
          <View style={{flexDirection: 'row', gap: 16}}>
            <TouchableOpacity
              style={styles.footerButton}
              activeOpacity={0.8}
              onPress={onShare}>
              <Ionicons name="share-social" size={20} color={Colors.WHITE} />
              <Text style={[styles.footerButtonText, {color: Colors.WHITE}]}>
                分享圖片
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.footerButton, {backgroundColor: Colors.CANCEL}]}
              activeOpacity={0.8}
              onPress={toggleModal}>
              <Ionicons name="trash" size={20} color={Colors.WHITE} />
              <Text style={styles.footerButtonText}>刪除圖片</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
        <View style={{height: 80}} />
      </ScrollView>
    </View>
  );
};

export default Image;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 36,
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    position: 'relative',
    top: -3,
    marginLeft: 16,
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.TITLE,
  },
  content: {},
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.TITLE,
    marginBottom: 12,
  },
  imageTitleInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageTitleInput: {
    flex: 1,
    paddingLeft: 12,
    paddingRight: 36,
    marginBottom: 8,
    borderRadius: 8,
    color: Colors.PARAGRAPH,
    backgroundColor: Colors.GRAY,
    elevation: 1,
  },
  imageTitleInputClose: {
    position: 'absolute',
    right: 12,
  },
  imageTitleLength: {
    marginBottom: 12,
    fontSize: 14,
    fontFamily: 'sans-serif-condensed',
    color: Colors.PARAGRAPH,
    textAlign: 'right',
  },
  renameButton: {
    alignSelf: 'flex-end',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    backgroundColor: Colors.PRIMARY,
  },
  imageUri: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 24,
    borderRadius: 8,
    color: Colors.PARAGRAPH,
    backgroundColor: Colors.UNFOCUS,
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
