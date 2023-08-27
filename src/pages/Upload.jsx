import {
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import FastImage from 'react-native-fast-image';
import {useNavigation} from '@react-navigation/native';
import {Icons, Colors} from '../utils';

const {Ionicons} = Icons;

const Upload = () => {
  const navigation = useNavigation();
  const [imageURI, setImageURI] = useState('');
  const [imageAspectRatio, setImageAspectRatio] = useState(16 / 9);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.9}
            onPress={() => {
              navigation.goBack();
            }}>
            <Ionicons
              name="arrow-back-outline"
              color={Colors.TITLE}
              size={24}
            />
          </TouchableOpacity>
          <Text style={styles.title}>添加新圖片</Text>
        </View>
        <View style={styles.content}>
          {imageURI === '' ? (
            <View style={styles.preview}>
              <Text style={styles.previewTitle}>圖片預覽</Text>
              <Text style={styles.previewSubtitle}>
                {'若圖片網址正確\n你的圖片將在此顯示'}
              </Text>
            </View>
          ) : (
            <FastImage
              style={[styles.previewImage, {aspectRatio: imageAspectRatio}]}
              source={{uri: imageURI}}
              onLoadStart={() => {
                setImageAspectRatio(16 / 9);
              }}
              onLoad={e =>
                setImageAspectRatio(e.nativeEvent.width / e.nativeEvent.height)
              }
              resizeMode={FastImage.resizeMode.contain}
            />
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
                }}>
                <Ionicons name="close" color={Colors.TITLE} size={18} />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
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
  content: {},
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
  },
  previewImage: {
    width: '100%',
    borderRadius: 8,
    marginBottom: 24,
    backgroundColor: Colors.WHITE,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    paddingLeft: 12,
    paddingRight: 36,
    backgroundColor: Colors.GRAY,
    color: Colors.PARAGRAPH,
    borderRadius: 8,
  },
  inputClose: {
    position: 'absolute',
    right: 12,
  },
});
