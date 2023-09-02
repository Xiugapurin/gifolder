import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {useState} from 'react';
import FastImage from 'react-native-fast-image';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import {MasonryFlashList} from '@shopify/flash-list';
import {Colors, DeviceSize} from '../../utils';
import Loading from '../common/Loading';
import Error from '../common/Error';
import Empty from '../common/Empty';
import SearchCardModal from '../modals/SearchCardModal';

const Card = ({item, i, setActiveItem, toggleModal}) => {
  const [imageAspectRatio, setImageAspectRatio] = useState(16 / 9);
  const isLeft = i % 2 === 0;
  const onCardPress = async () => {
    await setActiveItem(item);
    toggleModal();
  };

  const onCardLongPress = async () => {
    Clipboard.setString(item.uri);
  };

  return (
    <>
      {/* Preload to estimate aspectRatio */}
      <FastImage
        source={{uri: item.media_formats.tinygif.url}}
        style={{
          position: 'absolute',
          left: -100,
          width: 100,
          aspectRatio: imageAspectRatio,
        }}
        onLoad={e => {
          setImageAspectRatio(e.nativeEvent.width / e.nativeEvent.height);
        }}
        resizeMode={FastImage.resizeMode.stretch}
      />
      <TouchableOpacity
        style={[styles.card, {marginLeft: isLeft ? 0 : 12}]}
        activeOpacity={0.8}
        onPress={onCardPress}
        delayLongPress={500}
        onLongPress={onCardLongPress}>
        <FastImage
          source={{
            uri: item.media_formats.tinygif.url,
          }}
          style={{
            width: '100%',
            aspectRatio: imageAspectRatio,
            alignSelf: 'stretch',
            borderRadius: 4,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
      </TouchableOpacity>
    </>
  );
};

const Footer = () => (
  <View
    style={{
      marginTop: 50,
      marginBottom: 200,
      paddingVertical: 12,
      alignItems: 'center',
      borderRadius: 4,
      backgroundColor: Colors.GRAY,
    }}>
    <Text style={{fontSize: 14, color: Colors.PARAGRAPH, fontWeight: 'bold'}}>
      已經到達終點啦！
    </Text>
  </View>
);

const SearchImageList = ({fetchImage, images, isLoading, error}) => {
  const [isCardMenuModalVisible, setIsCardMenuModalVisible] = useState(false);
  const [activeItem, setActiveItem] = useState(null);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  const toggleModal = () => {
    setIsCardMenuModalVisible(!isCardMenuModalVisible);
  };

  return (
    <View style={{height: DeviceSize.DeviceHeight, width: '100%'}}>
      <Modal
        isVisible={isCardMenuModalVisible}
        animationIn={'zoomIn'}
        animationOInTiming={100}
        animationOut={'zoomOut'}
        animationOutTiming={300}
        onBackdropPress={toggleModal}
        onBackButtonPress={toggleModal}
        useNativeDriver={true}
        backdropOpacity={0.5}>
        <SearchCardModal toggleModal={toggleModal} activeItem={activeItem} />
      </Modal>

      <Text style={styles.title}>搜尋結果</Text>
      <MasonryFlashList
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<View />}
        ListEmptyComponent={<Empty />}
        ListFooterComponent={<Footer />}
        onEndReached={() => console.log('onEndReached')}
        estimatedItemSize={50}
        numColumns={2}
        data={images}
        renderItem={({item, index}) => (
          <Card
            item={item}
            i={index}
            setActiveItem={setActiveItem}
            toggleModal={toggleModal}
          />
        )}
      />
    </View>
  );
};

export default SearchImageList;

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.TITLE,
    marginBottom: 12,
  },
  card: {
    flex: 1,
    justifyContent: 'space-between',
    marginTop: 12,
    borderRadius: 4,
    backgroundColor: Colors.WHITE,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 36,
    color: Colors.PARAGRAPH,
  },
  cardTime: {
    fontSize: 10,
    color: Colors.INACTIVE,
  },
  cardMenuButton: {
    position: 'absolute',
    bottom: 12,
    right: 8,
    paddingTop: 16,
    paddingLeft: 16,
  },
  emptyComponentText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.PARAGRAPH,
    marginVertical: 4,
  },
});
