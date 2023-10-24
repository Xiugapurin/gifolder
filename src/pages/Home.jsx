import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useCallback, useState} from 'react';
import Modal from 'react-native-modal';

import {Colors, Icons} from '../utils';
import {ImageList, HomeSearchBar} from '../components';
import OrderModal from '../components/modals/OrderModal';
import {useFocusEffect} from '@react-navigation/native';

const {Ionicons} = Icons;

const Home = () => {
  const [searchParam, setSearchParam] = useState('');
  const [orderBy, setOrderBy] = useState('upload_time');
  const [order, setOrder] = useState('DESC');
  const [isOrderModalVisible, setIsOrderModalVisible] = useState(false);
  const [isListVisible, setIsListVisible] = useState(false);

  const toggleModal = () => {
    setIsOrderModalVisible(!isOrderModalVisible);
  };

  useFocusEffect(
    useCallback(() => {
      setIsListVisible(true);

      return () => {
        setIsListVisible(false);
      };
    }, []),
  );

  return (
    <View style={styles.container}>
      <Modal
        isVisible={isOrderModalVisible}
        animationIn={'zoomIn'}
        animationOInTiming={100}
        animationOut={'zoomOut'}
        animationOutTiming={300}
        onBackdropPress={toggleModal}
        onBackButtonPress={toggleModal}
        useNativeDriver={true}
        backdropOpacity={0.5}>
        <OrderModal
          toggleModal={toggleModal}
          orderBy={orderBy}
          setOrderBy={setOrderBy}
          order={order}
          setOrder={setOrder}
        />
      </Modal>
      <HomeSearchBar
        searchParam={searchParam}
        setSearchParam={setSearchParam}
      />

      <View style={styles.header}>
        <Text style={styles.title}>
          {searchParam ? '搜尋結果' : '我的圖庫'}
        </Text>

        <TouchableOpacity style={styles.filterButton} onPress={toggleModal}>
          <Ionicons name="filter" size={24} color={Colors.TITLE} />
          <Text style={styles.filterButtonText}>排序依據</Text>
        </TouchableOpacity>
      </View>

      {isListVisible && (
        <ImageList searchParam={searchParam} orderBy={orderBy} order={order} />
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    paddingVertical: 36,
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    marginBottom: 12,
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.TITLE,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  filterButtonText: {
    marginLeft: 4,
    fontSize: 14,
    color: Colors.INACTIVE,
  },
});
