import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';

import {Colors, Icons} from '../utils';
import SearchImageList from '../components/SearchImageList';

const {Ionicons} = Icons;

const Search = () => {
  const navigation = useNavigation();
  const [searchParam, setSearchParam] = useState('');

  const isSearching = searchParam.length > 0;

  return (
    <View style={styles.container}>
      <View style={styles.searchBarContainer}>
        <TextInput
          style={styles.searchBarInput}
          placeholder="輸入關鍵字"
          placeholderTextColor={Colors.INACTIVE}
          value={searchParam}
          onChangeText={setSearchParam}
          maxLength={10}
        />
        <View style={styles.searchBarIcon}>
          <Ionicons
            name="search"
            color={isSearching ? Colors.PRIMARY : Colors.INACTIVE}
            size={28}
          />
        </View>
      </View>

      {isSearching ? (
        <SearchImageList searchParam={searchParam} />
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
            在這片土地上搜尋完美的圖片
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
});
