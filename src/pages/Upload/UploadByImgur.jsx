import {Text, StyleSheet, TouchableOpacity, ToastAndroid} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import React from 'react';
import {Icons, Colors} from '../../utils';
import {uriToBlob} from '../../utils/uriToBlob';
import {useUploadImage} from '../../hooks/useOnlineImageRepo';

const {Entypo} = Icons;

const UploadByImgur = ({imageURI, setImageURI}) => {
  const {uploadImage, uploading, error: uploadError} = useUploadImage();

  const onSelectButtonPress = async () => {
    const result = await launchImageLibrary({mediaType: 'photo'});

    if (result.didCancel) {
      ToastAndroid.show('你已取消選取啦', ToastAndroid.SHORT);
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
        const base64String = reader.result.split(',')[1];

        uploadImage(base64String)
          .then(imgurLink => {
            setImageURI(imgurLink);
          })
          .catch(e => {
            ToastAndroid.show(uploadError, ToastAndroid.SHORT);
          });
      };
      reader.readAsDataURL(blob);
    } catch (error) {
      ToastAndroid.show(uploadError, ToastAndroid.SHORT);
    }
  };

  return (
    <>
      <TouchableOpacity
        style={styles.selectButton}
        onPress={uploading ? null : onSelectButtonPress}>
        <Entypo name="folder-images" size={20} color={Colors.PARAGRAPH} />
        <Text style={styles.selectButtonText}>
          {uploading
            ? '正在上傳圖片...'
            : imageURI
            ? '重新選取圖片'
            : '點此選取圖片'}
        </Text>
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
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    marginBottom: 12,
    borderRadius: 8,
    elevation: 1,
    backgroundColor: Colors.GRAY,
  },
  selectButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
    color: Colors.PARAGRAPH,
  },
});
