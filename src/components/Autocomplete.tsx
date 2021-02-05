import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import {useShoppingList} from '../contexts/ShoppingListProvider';

interface AutocompleteProps {
  inputValue: string;
  setInputValue: (newState: string) => void;
}

export const Autocomplete: React.FC<AutocompleteProps> = ({
  inputValue,
  setInputValue,
  children,
}) => {
  const {autocompleteItemNames} = useShoppingList();
  const [autocompleteResults, setAutocompleteResults] = useState<string[]>([]);

  useEffect(() => {
    if (inputValue.trim().length === 0) {
      setAutocompleteResults([]);
      return;
    }
    const filterAutocompleteItems = () => {
      const newAutocompleteItems = autocompleteItemNames.filter((item) =>
        item.toLowerCase().startsWith(inputValue.toLowerCase()),
      );

      setAutocompleteResults(Array.from(new Set(newAutocompleteItems)));
    };
    filterAutocompleteItems();
  }, [inputValue, setAutocompleteResults, autocompleteItemNames]);

  return (
    <View>
      {children}

      <FlatList
        style={autocompleteResults.length > 0 ? styles.list : styles.emptyList}
        data={autocompleteResults}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.listItem}
            key={item}
            onPress={() => {
              setInputValue(item);
            }}>
            <Text style={styles.text}>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  emptyList: {
    borderWidth: 0,
  },
  list: {
    padding: 10,
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: '#777777',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    backgroundColor: '#f1f1f1',
  },
  listItem: {
    borderBottomWidth: 1,
    borderColor: '#d1d1d1',
    padding: 10,
  },
  text: {
    color: '#616161',
  },
});
