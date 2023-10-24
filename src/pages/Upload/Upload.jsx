import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import {Icons, Colors} from '../../utils';
import UploadPage1 from './UploadPage1';
import UploadPage2 from './UploadPage2';

const {Ionicons} = Icons;

const Upload = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [imageURI, setImageURI] = useState('');
  const [imageAspectRatio, setImageAspectRatio] = useState(16 / 9);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="image-sharp" color={Colors.TITLE} size={32} />
        <Text style={styles.title}>新增圖片</Text>
      </View>

      {currentPage === 1 && (
        <UploadPage1
          toNext={() => setCurrentPage(2)}
          imageURI={imageURI}
          setImageURI={setImageURI}
          imageAspectRatio={imageAspectRatio}
          setImageAspectRatio={setImageAspectRatio}
        />
      )}
      {currentPage === 2 && (
        <UploadPage2
          toPrev={() => setCurrentPage(1)}
          imageURI={imageURI}
          setImageURI={setImageURI}
          imageAspectRatio={imageAspectRatio}
          setImageAspectRatio={setImageAspectRatio}
        />
      )}
    </View>
  );
};

export default Upload;

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
    marginLeft: 16,
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.TITLE,
  },
});
