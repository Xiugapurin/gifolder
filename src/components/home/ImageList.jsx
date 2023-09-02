import {
  Text,
  View,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import {useState} from 'react';
import FastImage from 'react-native-fast-image';
import Modal from 'react-native-modal';
import Clipboard from '@react-native-clipboard/clipboard';
import {MasonryFlashList} from '@shopify/flash-list';
import {useFetchImages} from '../../hooks/useImage';
import {Colors, DeviceSize, Icons} from '../../utils';
import CardMenuModal from '../modals/CardMenuModal';
import {useNavigation} from '@react-navigation/native';
import Loading from '../common/Loading';
import Error from '../common/Error';

const {Entypo} = Icons;

const Card = ({item, i, setActiveItem, toggleModal}) => {
  const onCardPress = async () => {
    Clipboard.setString(item.uri);
  };

  const onCardLongPress = async () => {
    await setActiveItem(item);
    toggleModal();
  };

  return (
    <TouchableOpacity
      style={[styles.card, {marginLeft: i % 2 === 0 ? 0 : 12}]}
      activeOpacity={0.8}
      onPress={onCardPress}
      delayLongPress={500}
      onLongPress={onCardLongPress}>
      <FastImage
        source={{uri: item.uri}}
        style={{
          width: '100%',
          aspectRatio: item.aspect_ratio,
          borderRadius: 4,
        }}
        resizeMode={FastImage.resizeMode.contain}
      />
    </TouchableOpacity>
  );
};

const EmptyCard = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.emptyCard}
      activeOpacity={0.8}
      onPress={() => navigation.navigate('Upload')}>
      <Entypo
        name="upload"
        color={Colors.PRIMARY}
        size={48}
        style={{marginBottom: 12}}
      />
      <Text style={styles.emptyCardText}>看起來這裡空空如也...</Text>
      <Text style={styles.emptyCardText}>點擊這裡來上傳圖片！</Text>
      {/* <Text style={styles.cardTime}>3分鐘前</Text> */}
    </TouchableOpacity>
  );
};

const ImageList = ({searchParam, orderBy, order}) => {
  const [isCardMenuModalVisible, setIsCardMenuModalVisible] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const {images, isLoading, onRefresh, error} = useFetchImages(
    searchParam,
    orderBy,
    order,
  );

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
        <CardMenuModal
          toggleModal={toggleModal}
          activeItem={activeItem}
          onRefresh={onRefresh}
        />
      </Modal>

      <MasonryFlashList
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<View />}
        ListEmptyComponent={<EmptyCard />}
        ListFooterComponent={<View style={{height: 300}} />}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={onRefresh}
            colors={[Colors.PRIMARY, Colors.SECONDARY]}
          />
        }
        onEndReached={() => console.log('onEndReached')}
        estimatedItemSize={200}
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

export default ImageList;

const styles = StyleSheet.create({
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
  emptyCard: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    aspectRatio: 16 / 9,
    borderRadius: 4,
    backgroundColor: Colors.WHITE,
    elevation: 3,
  },
  emptyCardText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.PARAGRAPH,
    marginVertical: 4,
  },
});
