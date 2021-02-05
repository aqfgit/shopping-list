import React, {useContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type ShoppingListItemType = {
  id: string;
  name: string;
  isComplete: boolean;
};

type ShoppingListContextType = {
  shoppingListItems: ShoppingListItemType[];
  autocompleteItemNames: string[];
  addItem: (name: string) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
  deleteAllItems: () => Promise<void>;
  toggleItemComplete: (id: string) => Promise<void>;
};

const ShoppingListContext = React.createContext<ShoppingListContextType>(
  {} as ShoppingListContextType,
);

export const useShoppingList = (): ShoppingListContextType => {
  return useContext(ShoppingListContext);
};

export const ShoppingListProvider: React.FC = ({children}) => {
  const [shoppingListItems, setShoppingListItems] = useState<
    ShoppingListItemType[]
  >([]);
  const [autocompleteItemNames, setAutocompleteItemNames] = useState<string[]>(
    [],
  );
  const ASYNC_STORAGE_ITEMS_KEY = 'shoppingListItems';
  const ASYNC_STORAGE_AUTOCOMPLETE_KEY = 'autocompleteItemNames';

  useEffect(() => {
    getDataFromAsyncStorage();
  }, []);

  const getDataFromAsyncStorage = async () => {
    try {
      const storageShoppingListItems = await AsyncStorage.getItem(
        ASYNC_STORAGE_ITEMS_KEY,
      );
      const storageAutocompleteNames = await AsyncStorage.getItem(
        ASYNC_STORAGE_AUTOCOMPLETE_KEY,
      );
      setShoppingListItems(
        storageShoppingListItems != null
          ? JSON.parse(storageShoppingListItems)
          : [],
      );
      setAutocompleteItemNames(
        storageAutocompleteNames != null
          ? JSON.parse(storageAutocompleteNames)
          : [],
      );
    } catch (error) {
      console.error(error);
    }
  };

  const addItem = async (name: string): Promise<void> => {
    try {
      const newItem = {id: Math.random() + '', name, isComplete: false};
      const updatedItems = (shoppingListItems as ShoppingListItemType[]).concat(
        newItem,
      );
      const jsonItems = JSON.stringify(updatedItems);
      await AsyncStorage.setItem(ASYNC_STORAGE_ITEMS_KEY, jsonItems);
      setShoppingListItems(updatedItems);

      const updatedAutocompleteNames = autocompleteItemNames.concat(name);
      const jsonNames = JSON.stringify(updatedAutocompleteNames);
      await AsyncStorage.setItem(ASYNC_STORAGE_AUTOCOMPLETE_KEY, jsonNames);
      setAutocompleteItemNames(updatedAutocompleteNames);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteItem = async (id: string): Promise<void> => {
    const getRemainingItems = (item: ShoppingListItemType) => item.id !== id;
    try {
      const updatedItems = shoppingListItems.filter(getRemainingItems);
      const jsonItems = JSON.stringify(updatedItems);
      await AsyncStorage.setItem(ASYNC_STORAGE_ITEMS_KEY, jsonItems);
      setShoppingListItems((prevState) => {
        return prevState.filter(getRemainingItems);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteAllItems = async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(ASYNC_STORAGE_ITEMS_KEY);
      setShoppingListItems([]);
    } catch (error) {
      console.error(error);
    }
  };

  const toggleItemComplete = async (id: string): Promise<void> => {
    const indexOfTheItem = shoppingListItems.findIndex(
      (item: ShoppingListItemType) => item.id === id,
    );
    const updatedItems = shoppingListItems.slice(0);
    try {
      updatedItems[indexOfTheItem].isComplete = !updatedItems[indexOfTheItem]
        .isComplete;
      const jsonItems = JSON.stringify(updatedItems);
      await AsyncStorage.setItem('notes', jsonItems);
      setShoppingListItems(updatedItems);
    } catch (error) {
      console.error(error);
    }
  };

  const value = {
    shoppingListItems,
    autocompleteItemNames,
    addItem,
    deleteItem,
    deleteAllItems,
    toggleItemComplete,
  };
  return (
    <ShoppingListContext.Provider value={value}>
      {children}
    </ShoppingListContext.Provider>
  );
};
