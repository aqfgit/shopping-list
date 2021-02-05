import React, {Children, useEffect, useState} from 'react';
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
  const {shoppingListItems} = useShoppingList();
  const [autocompleteItems, setAutocompleteItems] = useState<string[]>([]);

  useEffect(() => {
    if (inputValue.trim().length === 0) {
      setAutocompleteItems([]);
      return;
    }
    const filterAutocompleteItems = () => {
      const newAutocompleteItems = shoppingListItems
        .filter((item) =>
          item.name.toLowerCase().startsWith(inputValue.toLowerCase()),
        )
        .map((item) => item.name);
      setAutocompleteItems(Array.from(new Set(newAutocompleteItems)));
    };
    filterAutocompleteItems();
  }, [inputValue, shoppingListItems, setAutocompleteItems]);

  return (
    <View>
      {children}

      <FlatList
        style={autocompleteItems.length > 0 ? styles.list : styles.emptyList}
        data={autocompleteItems}
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
