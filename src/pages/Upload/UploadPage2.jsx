import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FastImage from 'react-native-fast-image';
import {Icons, Colors} from '../../utils';
import {useUploadImage} from '../../hooks/useImage';
import {useNavigation} from '@react-navigation/native';

const {Ionicons, Entypo} = Icons;

const UploadPage2 = ({toPrev, imageURI, imageAspectRatio}) => {
  const [imageTitle, setImageTitle] = useState('');
  const [imageTitleLength, setImageTitleLength] = useState(3);
  const {uploadImage, uploading, error} = useUploadImage();
  const navigation = useNavigation();

  const onChangeText = text => {
    setImageTitle(text);
    setImageTitleLength(text.length);
  };

  const onUploadPress = async () => {
    await uploadImage(imageURI, '', imageTitle, imageAspectRatio);
    navigation.navigate('Home');
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{alignItems: 'flex-start'}}>
      <View style={styles.preview}>
        <FastImage
          style={[styles.previewImage, {aspectRatio: imageAspectRatio}]}
          source={{uri: imageURI}}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.inputTitle}>幫你的圖片取一個閃亮的名字！</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={imageTitle}
            placeholder="無標題"
            placeholderTextColor={Colors.PARAGRAPH}
            onChangeText={onChangeText}
            maxLength={50}
            multiline={true}
          />
          {imageTitle.length > 0 && (
            <TouchableOpacity
              style={styles.inputClose}
              onPress={() => {
                setImageTitle('');
                setImageTitleLength(3);
              }}>
              <Ionicons name="close" color={Colors.TITLE} size={18} />
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.inputLength}>{`${imageTitleLength} / 50`}</Text>
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, styles.prevButton]}
          activeOpacity={0.9}
          onPress={toPrev}>
          <Entypo
            name="chevron-small-left"
            color={Colors.PARAGRAPH}
            size={24}
          />
          <Text style={styles.buttonText}>上一步</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.uploadButton]}
          activeOpacity={0.9}
          onPress={onUploadPress}>
          <Entypo name="plus" color={Colors.WHITE} size={24} />
          <Text style={[styles.buttonText, {color: Colors.WHITE}]}>新增</Text>
        </TouchableOpacity>
      </View>

      <View style={{height: 50}} />
    </ScrollView>
  );
};

export default UploadPage2;

const styles = StyleSheet.create({
  preview: {
    marginBottom: 24,
  },
  previewImage: {
    width: '100%',
    borderRadius: 8,
  },
  content: {
    width: '100%',
    marginBottom: 24,
  },
  inputTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: Colors.PARAGRAPH,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    paddingLeft: 12,
    paddingRight: 36,
    marginBottom: 8,
    borderRadius: 8,
    color: Colors.PARAGRAPH,
    backgroundColor: Colors.GRAY,
    elevation: 1,
  },
  inputClose: {
    position: 'absolute',
    right: 12,
  },
  inputLength: {
    fontSize: 14,
    fontFamily: 'sans-serif-condensed',
    color: Colors.PARAGRAPH,
    textAlign: 'right',
  },
  buttonRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 48,
    borderRadius: 4,
    elevation: 3,
  },
  prevButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    paddingRight: 16,
    backgroundColor: Colors.WHITE,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 4,
    color: Colors.PARAGRAPH,
  },
  uploadButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: Colors.PRIMARY,
  },
});
