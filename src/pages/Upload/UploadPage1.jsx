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
import LottieView from 'lottie-react-native';
import {Icons, Colors} from '../../utils';
import UploadByLink from './UploadByLink';
import UploadByImgur from './UploadByImgur';

const {Ionicons, Entypo} = Icons;

const ExtensionButton = ({extension, active, onPress}) => {
  return (
    <TouchableOpacity
      style={[styles.extensionButton, active && styles.activeExtensionButton]}
      onPress={() => onPress(extension)}>
      <Text
        style={[
          styles.extensionButtonText,
          active && styles.activeExtensionButtonText,
        ]}>
        {extension}
      </Text>
    </TouchableOpacity>
  );
};

const UploadPage1 = ({
  toNext,
  imageURI,
  setImageURI,
  imageAspectRatio,
  setImageAspectRatio,
}) => {
  const [progress, setProgress] = useState(0);
  const [isImageExist, setIsImageExist] = useState(false);

  const onProgress = e => {
    const loaded = e.nativeEvent.loaded;
    const total = e.nativeEvent.total;
    const calculatedProgress = ((loaded / total) * 100).toFixed(1);

    if (calculatedProgress < 0) setProgress(0);
    else setProgress(calculatedProgress);
  };

  return (
    <>
      {/* 圖片載入進度 */}
      <FastImage
        source={{uri: imageURI}}
        style={{
          position: 'absolute',
          left: -100,
          width: 100,
          aspectRatio: imageAspectRatio,
        }}
        onProgress={onProgress}
        onLoadStart={() => {
          setIsImageExist(false);
        }}
        onLoad={e => {
          setIsImageExist(true);
          setImageAspectRatio(e.nativeEvent.width / e.nativeEvent.height);
        }}
        resizeMode={FastImage.resizeMode.stretch}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: 'flex-start',
        }}>
        {imageURI === '' ? (
          <View style={styles.preview}>
            <Text style={styles.previewTitle}>圖片預覽</Text>
            <Text style={styles.previewSubtitle}>
              {'若圖片網址正確\n你的圖片將在此顯示'}
            </Text>
          </View>
        ) : (
          <View style={{width: '100%', marginBottom: 24}}>
            {isImageExist ? (
              <FastImage
                style={[styles.previewImage, {aspectRatio: imageAspectRatio}]}
                source={{uri: imageURI}}
                resizeMode={FastImage.resizeMode.contain}
              />
            ) : (
              <View style={styles.loadingView}>
                <LottieView
                  style={{width: '75%'}}
                  autoPlay
                  loop
                  source={require('../../assets/animations/image_loading.json')}
                />
                <Text style={styles.loadingProgress}>{`${progress} %`}</Text>
              </View>
            )}
          </View>
        )}

        {false ? (
          <UploadByLink
            imageURI={imageURI}
            setImageURI={setImageURI}
            setIsImageExist={setIsImageExist}
          />
        ) : (
          <UploadByImgur imageURI={imageURI} setImageURI={setImageURI} />
        )}

        {isImageExist && (
          <TouchableOpacity
            style={styles.nextButton}
            activeOpacity={0.9}
            onPress={toNext}>
            <Text style={styles.nextButtonText}>下一步</Text>
            <Entypo
              name="chevron-small-right"
              color={Colors.PARAGRAPH}
              size={24}
            />
          </TouchableOpacity>
        )}
      </ScrollView>
    </>
  );
};

export default UploadPage1;

const styles = StyleSheet.create({
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
  },
  loadingView: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingProgress: {
    position: 'relative',
    top: -50,
    fontSize: 24,
    fontFamily: 'sans-serif-condensed',
    color: Colors.PARAGRAPH,
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
    marginBottom: 24,
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
  extensionButtonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  extensionButtonRowTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.PARAGRAPH,
  },
  extensionButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginLeft: 8,
    borderRadius: 4,
    backgroundColor: Colors.WHITE,
    elevation: 2,
  },
  extensionButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.PARAGRAPH,
  },
  activeExtensionButton: {
    backgroundColor: Colors.PRIMARY,
  },
  activeExtensionButtonText: {
    color: Colors.WHITE,
  },
  nextButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    padding: 8,
    paddingLeft: 16,
    marginVertical: 48,
    borderRadius: 4,
    backgroundColor: Colors.WHITE,
    elevation: 3,
  },
  nextButtonText: {
    position: 'relative',
    top: -2,
    marginLeft: 4,
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.PARAGRAPH,
  },
});
