import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Icons, Colors} from '../../utils';

const {Ionicons} = Icons;

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

const UploadByLink = ({imageURI, setImageURI, setIsImageExist}) => {
  const [imageExtension, setImageExtension] = useState('');

  const handleExtensionPress = extension => {
    if (imageURI) {
      const fileName = imageURI.substring(imageURI.lastIndexOf('/') + 1);

      if (fileName.includes('.')) {
        const existingExtension = fileName.split('.').pop();
        const newFileName = fileName.replace(
          `.${existingExtension}`,
          `.${extension}`,
        );
        setImageURI(imageURI.replace(fileName, newFileName));
      } else {
        setImageURI(`${imageURI}.${extension}`);
      }

      setImageExtension(extension);
    }
  };

  useEffect(() => {
    // 檢查 imageURI 是否有值
    if (imageURI) {
      // 從 URI 切割出檔名部分
      const fileName = imageURI.substring(imageURI.lastIndexOf('/') + 1);

      // 判斷是否有附檔名，如果有則提取附檔名
      let extension = '';
      if (fileName.includes('.')) {
        extension = fileName.split('.').pop();
      }

      // 更新 imageExtension 狀態
      setImageExtension(extension);
    } else setImageExtension('');
  }, [imageURI]);

  return (
    <>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={imageURI}
          placeholder="輸入圖片網址 ..."
          placeholderTextColor={Colors.PARAGRAPH}
          onChangeText={setImageURI}
        />
        {/* input 全部刪除按鈕 */}
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

      {/* 更換副檔名按鈕 */}
      {imageURI.length > 0 && (
        <>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'baseline',
            }}>
            <Text style={styles.extensionButtonRowTitle}>圖片類型</Text>
            <Text style={styles.extensionButtonRowSubtitle}>
              {'  (若圖片未成功載入請點此更換副檔名)'}
            </Text>
          </View>
          <View style={styles.extensionButtonRow}>
            {['gif', 'png', 'jpg'].map((extension, i) => (
              <ExtensionButton
                key={`${extension}-${i.toString()}`}
                extension={extension}
                active={imageExtension === extension}
                onPress={handleExtensionPress}
              />
            ))}
          </View>
        </>
      )}
    </>
  );
};

export default UploadByLink;

const styles = StyleSheet.create({
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
    gap: 8,
  },
  extensionButtonRowTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.TITLE,
  },
  extensionButtonRowSubtitle: {
    fontSize: 12,
    color: Colors.TITLE,
    marginBottom: 12,
  },
  extensionButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
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
});
