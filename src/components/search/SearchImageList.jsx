import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {useState, useEffect} from 'react';
import FastImage from 'react-native-fast-image';
import Modal from 'react-native-modal';
import Clipboard from '@react-native-clipboard/clipboard';
import {MasonryFlashList} from '@shopify/flash-list';
import {Colors, DeviceSize} from '../../utils';
import Loading from '../common/Loading';
import Error from '../common/Error';
import Empty from '../common/Empty';
import SearchCardModal from '../modals/SearchCardModal';

const Card = ({
  item,
  i,
  setActiveItem,
  setActiveItemAspectRatio,
  toggleModal,
}) => {
  const isLeft = i % 2 === 0;
  const image = item?.media_formats?.tinygif;
  const imageAspectRatio = image ? image.dims[0] / image.dims[1] : 16 / 9;

  const onCardPress = async () => {
    setActiveItem(item);
    setActiveItemAspectRatio(imageAspectRatio);
    toggleModal();
  };

  const onCardLongPress = async () => {
    Clipboard.setString(image?.url);
  };

  return (
    <>
      <TouchableOpacity
        style={[styles.card, {marginLeft: isLeft ? 0 : 12}]}
        activeOpacity={0.8}
        onPress={onCardPress}
        delayLongPress={500}
        onLongPress={onCardLongPress}>
        <FastImage
          source={{
            uri: image?.url,
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

const SearchImageList = ({images, isLoading, error}) => {
  const [isCardMenuModalVisible, setIsCardMenuModalVisible] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [activeItemAspectRatio, setActiveItemAspectRatio] = useState(16 / 9);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  const toggleModal = () => {
    setIsCardMenuModalVisible(!isCardMenuModalVisible);
  };

  console.log(images[0].media_formats);

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
        <SearchCardModal
          toggleModal={toggleModal}
          activeItem={activeItem}
          activeItemAspectRatio={activeItemAspectRatio}
        />
      </Modal>

      <View style={styles.titleRow}>
        <Text style={styles.title}>搜尋結果</Text>
        <Text style={styles.subtitle}>{'(長按可複製連結)'}</Text>
      </View>

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
            setActiveItemAspectRatio={setActiveItemAspectRatio}
            toggleModal={toggleModal}
          />
        )}
      />
    </View>
  );
};

export default SearchImageList;

const styles = StyleSheet.create({
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.TITLE,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.PARAGRAPH,
    marginLeft: 8,
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
