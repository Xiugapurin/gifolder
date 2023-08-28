import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import {Icons, Colors} from '../utils';
import {useImageUpload} from '../hooks/useImage';

const {Ionicons, Entypo} = Icons;

const Upload = () => {
  const navigation = useNavigation();
  const {uploadImage, uploading, complete, error} = useImageUpload();

  const [imageURI, setImageURI] = useState('');
  const [imageName, setImageName] = useState('');
  const [imageTag, setImageTag] = useState('');
  const [imageAspectRatio, setImageAspectRatio] = useState(16 / 9);
  const [progress, setProgress] = useState(0);
  const [isImageExist, setIsImageExist] = useState(false);

  const onProgress = e => {
    const loaded = e.nativeEvent.loaded;
    const total = e.nativeEvent.total;
    const calculatedProgress = ((loaded / total) * 100).toFixed(2);

    if (progress < 0) setProgress(0);
    else setProgress(calculatedProgress);
  };

  const onUploadPress = () => {
    uploadImage(imageURI, imageName, imageTag);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.9}
          onPress={() => {
            navigation.goBack();
          }}>
          <Ionicons name="arrow-back-outline" color={Colors.TITLE} size={24} />
        </TouchableOpacity>
        <Text style={styles.title}>添加新圖片</Text>
      </View>

      <ScrollView
        contentContainerStyle={{alignItems: 'center'}}
        showsVerticalScrollIndicator={false}>
        {imageURI === '' ? (
          <View style={styles.preview}>
            <Text style={styles.previewTitle}>圖片預覽</Text>
            <Text style={styles.previewSubtitle}>
              {'若圖片網址正確\n你的圖片將在此顯示'}
            </Text>
          </View>
        ) : (
          <View style={{marginBottom: 24}}>
            <FastImage
              style={[styles.previewImage, {aspectRatio: imageAspectRatio}]}
              source={{uri: imageURI}}
              onProgress={onProgress}
              onLoadStart={() => {
                setImageAspectRatio(16 / 9);
                setIsImageExist(false);
              }}
              onLoad={e => {
                setImageAspectRatio(e.nativeEvent.width / e.nativeEvent.height);
                setProgress(0);
                setIsImageExist(true);
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
            <View style={[styles.progressBar, {width: `${progress}%`}]} />
          </View>
        )}

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={imageURI}
            placeholder="輸入圖片網址 ..."
            placeholderTextColor={Colors.PARAGRAPH}
            onChangeText={setImageURI}
          />
          {imageURI.length > 0 && (
            <TouchableOpacity
              style={styles.inputClose}
              onPress={() => {
                setImageURI('');
                setIsImageExist(false);
              }}>
              <Ionicons name="close" color={Colors.TITLE} size={18} />
            </TouchableOpacity>
          )}
        </View>

        {isImageExist && (
          <TouchableOpacity
            style={[
              styles.uploadButton,
              {
                backgroundColor: uploading ? Colors.GRAY : Colors.PRIMARY,
                elevation: uploading ? 0 : 2,
              },
            ]}
            activeOpacity={0.9}
            onPress={!uploading && onUploadPress}>
            <Entypo name="plus" color={Colors.WHITE} size={20} />
            <Text style={styles.uploadButtonText}>新增圖片</Text>
          </TouchableOpacity>
        )}

        <View style={{height: 50}} />
      </ScrollView>
    </View>
  );
};

export default Upload;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 36,
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  button: {
    padding: 8,
    backgroundColor: Colors.WHITE,
    borderRadius: 8,
    elevation: 3,
  },
  title: {
    marginLeft: 16,
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.TITLE,
  },
  preview: {
    width: '100%',
    aspectRatio: 16 / 9,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 24,
    backgroundColor: Colors.WHITE,
  },
  previewTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.PARAGRAPH,
    marginBottom: 16,
  },
  previewSubtitle: {
    fontSize: 12,
    textAlign: 'center',
    color: Colors.PARAGRAPH,
  },
  previewImage: {
    width: '100%',
    borderRadius: 8,
    backgroundColor: Colors.WHITE,
  },
  progressBar: {
    position: 'relative',
    bottom: 4,
    height: 4,
    backgroundColor: Colors.PRIMARY,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    paddingLeft: 12,
    paddingRight: 36,
    borderRadius: 8,
    color: Colors.PARAGRAPH,
    backgroundColor: Colors.GRAY,
    elevation: 1,
  },
  inputClose: {
    position: 'absolute',
    right: 12,
  },
  uploadButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginTop: 48,
    borderRadius: 8,
  },
  uploadButtonText: {
    position: 'relative',
    top: -2,
    marginLeft: 4,
    color: Colors.WHITE,
    fontSize: 16,
  },
});
