import {
  Text,
  View,
  FlatList,
  StyleSheet,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import {useState} from 'react';
import FastImage from 'react-native-fast-image';
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import {useFetchImagesBySearchParam} from '../hooks/useImage';
import {Colors} from '../utils';
import CardMenuModal from './modals/CardMenuModal';
import Loading from './Loading';
import Error from './Error';

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
          borderTopRightRadius: 4,
          borderTopLeftRadius: 4,
        }}
        resizeMode={FastImage.resizeMode.contain}
      />
      <View style={{padding: 8, paddingBottom: 12}}>
        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.cardTitle}>
          {item.title}
        </Text>
        <Text style={styles.cardTime}>3分鐘前</Text>
      </View>
    </TouchableOpacity>
  );
};

const EmptyComponent = () => {
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <LottieView
        style={{width: '80%'}}
        autoPlay
        loop
        source={require('../assets/animations/search_failed.json')}
      />
      <Text style={styles.emptyComponentText}>{'我們找遍了全世界...'}</Text>
      <Text style={styles.emptyComponentText}>{'試試其他的關鍵字！'}</Text>
    </View>
  );
};

const SearchImageList = ({searchParam}) => {
  const [isCardMenuModalVisible, setIsCardMenuModalVisible] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const {images, isLoading, onRefresh, error} =
    useFetchImagesBySearchParam(searchParam);

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
    <>
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

      <Text style={styles.title}>搜尋結果</Text>
      <FlatList
        keyExtractor={item => item.ID}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<View />}
        ListEmptyComponent={<EmptyComponent />}
        ListFooterComponent={<View style={{height: 100}} />}
        contentContainerStyle={{
          alignSelf: 'stretch',
        }}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={onRefresh}
            colors={[Colors.PRIMARY, Colors.SECONDARY]}
          />
        }
        onEndReached={() => console.log('onEndReached')}
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
    </>
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
