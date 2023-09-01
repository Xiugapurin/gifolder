import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import React, {useEffect, useState} from 'react';
import {Icons, Colors} from '../../utils';
import useUploadImage from '../../hooks/useImgur';
import {uriToBlob} from '../../utils/uriToBlob';

const {Entypo} = Icons;

const UploadByImgur = ({imageURI, setImageURI}) => {
  const [imageLocalURI, setImageLocalURI] = useState('');
  const {uploadImage, error: uploadError} = useUploadImage();

  const onSelectButtonPress = async () => {
    const result = await launchImageLibrary({mediaType: 'photo'});

    if (result.didCancel) {
      ToastAndroid.show('取消選取圖片', ToastAndroid.SHORT);
      return;
    }

    if (result.errorCode) {
      ToastAndroid.show('發生了點小錯誤 ...', ToastAndroid.SHORT);
      console.log(result.errorMessage);
      return;
    }

    const localImageURI = result.assets[0].uri;

    try {
      const blob = await uriToBlob(localImageURI);
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result.split(',')[1]; // 去掉 data:image/jpeg;base64, 部分
        // 現在 base64String 包含圖片的 base64 數據
        // 可以將它用於後續處理，例如上傳到伺服器
        console.log(base64String);
        // 在這裡執行上傳操作
        uploadImage(base64String)
          .then(imgurLink => {
            setImageURI(imgurLink);
          })
          .catch(error => {
            ToastAndroid.show('uploadError', ToastAndroid.SHORT);
          });
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      ToastAndroid.show('uploadError', ToastAndroid.SHORT);
    }
  };

  return (
    <>
      <TextInput
        style={styles.input}
        value={imageURI}
        placeholder="選取後圖片網址將在此顯示"
        placeholderTextColor={Colors.PARAGRAPH}
        editable={false}
      />
      <TouchableOpacity
        style={styles.selectButton}
        onPress={onSelectButtonPress}>
        <Entypo name="folder-images" size={20} color={Colors.PRIMARY} />
        <Text style={styles.selectButtonText}>選取圖片</Text>
      </TouchableOpacity>
    </>
  );
};

export default UploadByImgur;

const styles = StyleSheet.create({
  input: {
    width: '100%',
    paddingLeft: 12,
    paddingRight: 36,
    marginBottom: 12,
    borderRadius: 8,
    color: Colors.PARAGRAPH,
    backgroundColor: Colors.GRAY,
    elevation: 1,
  },
  inputClose: {
    position: 'absolute',
    right: 12,
  },
  selectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.WHITE,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  selectButtonText: {
    position: 'relative',
    top: -3,
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
    color: Colors.PRIMARY,
  },
});
