import React, {Children, useEffect, useState} from 'react';
import {Text, View} from 'react-native';
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
        .filter((item) => item.name.startsWith(inputValue))
        .map((item) => item.name);
      setAutocompleteItems(Array.from(new Set(newAutocompleteItems)));
    };
    filterAutocompleteItems();
  }, [inputValue, shoppingListItems, setAutocompleteItems]);

  return (
    <View>
      {children}
      <FlatList
        data={autocompleteItems}
        renderItem={({item}) => (
          <TouchableOpacity
            key={item}
            onPress={() => {
              setInputValue(item);
            }}>
            <Text>{item}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item}
      />
    </View>
  );
};
