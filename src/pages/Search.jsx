import {View, Text, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import LottieView from 'lottie-react-native';
import {SearchBar, SearchImageList} from '../components';
import {useFetchSearchImage} from '../hooks/useOnlineImageRepo';
import {Colors} from '../utils';

const Search = () => {
  const [isSearching, setIsSearching] = useState(false);
  const {fetchImage, images, isLoading, error} = useFetchSearchImage();

  return (
    <View style={styles.container}>
      <SearchBar fetchImage={fetchImage} setIsSearching={setIsSearching} />

      {isSearching ? (
        <SearchImageList images={images} isLoading={isLoading} error={error} />
      ) : (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <LottieView
            style={{width: '100%'}}
            autoPlay
            loop
            source={require('../assets/animations/search_page.json')}
          />
          <Text
            style={{fontSize: 18, fontWeight: 'bold', color: Colors.PARAGRAPH}}>
            在這裡搜尋完美的圖片
          </Text>
        </View>
      )}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 36,
    paddingHorizontal: 24,
  },
  searchBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  searchBarInput: {
    flex: 1,
    paddingLeft: 48,
    backgroundColor: Colors.GRAY,
    color: Colors.PARAGRAPH,
    borderRadius: 8,
    elevation: 3,
  },
  searchBarIcon: {
    position: 'absolute',
    left: 12,
  },
  searchBarCancel: {
    position: 'absolute',
    right: 12,
  },
});
