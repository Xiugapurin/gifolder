import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import React from 'react';
import {Colors, Icons} from '../../utils';
import {useSearchSuggestion} from '../../hooks/useOnlineImageRepo';

const {Ionicons} = Icons;

const buttonColors = [
  {backgroundColor: Colors.PRIMARY, textColor: Colors.WHITE},
  {backgroundColor: Colors.WHITE, textColor: Colors.TITLE},
];

const SearchBar = ({searchParam, setSearchParam}) => {
  const {suggestions, isLoading, error} = useSearchSuggestion(searchParam);

  return (
    <>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="輸入關鍵字"
          placeholderTextColor={Colors.INACTIVE}
          value={searchParam}
          onChangeText={setSearchParam}
          maxLength={40}
        />
        <View style={styles.icon}>
          <Ionicons
            name="search"
            color={searchParam ? Colors.PRIMARY : Colors.INACTIVE}
            size={24}
          />
        </View>
        {searchParam && (
          <TouchableOpacity
            style={styles.cancel}
            onPress={() => {
              setSearchParam('');
            }}>
            <Ionicons name="close" color={Colors.TITLE} size={18} />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.suggestionContainer}>
        {!isLoading &&
          searchParam &&
          suggestions.map((suggestion, index) => {
            const {backgroundColor, textColor} = buttonColors[index % 2];

            return (
              <TouchableOpacity
                key={index.toString()}
                style={[styles.suggestionButton, {backgroundColor}]}
                onPress={() => {
                  setSearchParam(suggestion);
                }}>
                <Text style={[styles.suggestionText, {color: textColor}]}>
                  {suggestion}
                </Text>
              </TouchableOpacity>
            );
          })}
      </View>
    </>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  input: {
    width: '100%',
    paddingLeft: 48,
    backgroundColor: Colors.GRAY,
    color: Colors.PARAGRAPH,
    borderRadius: 8,
    elevation: 3,
  },
  icon: {
    position: 'absolute',
    left: 12,
  },
  cancel: {
    position: 'absolute',
    right: 12,
  },
  suggestionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    columnGap: 8,
    rowGap: 4,
    marginBottom: 12,
  },
  suggestionButton: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    backgroundColor: Colors.PRIMARY,
  },
  suggestionText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.WHITE,
  },
});
