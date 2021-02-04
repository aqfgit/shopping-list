import React, {useContext, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type ShoppingListItem = {
  id: string;
  name: string;
  isComplete: boolean;
};

type ShoppingListContextType = {
  shoppingListItems: ShoppingListItem[];
};

const ShoppingListContext = React.createContext<ShoppingListContextType>({
  shoppingListItems: [],
});

export const useShoppingList = (): ShoppingListContextType => {
  return useContext(ShoppingListContext);
};

export const ShoppingListProvider: React.FC = ({children}) => {
  const [shoppingListItems, setShoppingListItems] = useState<
    ShoppingListItem[]
  >([]);

  const addItem = async (name: string): Promise<void> => {
    try {
      const newItem = {id: Math.random() + '', name, isComplete: false};
      const updatedItems = (shoppingListItems as ShoppingListItem[]).concat(
        newItem,
      );
      const jsonItems = JSON.stringify(updatedItems);
      await AsyncStorage.setItem('shoppingListItems', jsonItems);
      setShoppingListItems(updatedItems);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteItem = async (id: string): Promise<void> => {
    const getRemainingItems = (item: ShoppingListItem) => item.id !== id;
    try {
      const updatedItems = shoppingListItems.filter(getRemainingItems);
      const jsonItems = JSON.stringify(updatedItems);
      await AsyncStorage.setItem('shoppingListItems', jsonItems);
      setShoppingListItems((prevState) => {
        return prevState.filter(getRemainingItems);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteAllItems = async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem('shoppingListItems');
      setShoppingListItems([]);
    } catch (error) {
      console.error(error);
    }
  };

  const value = {
    shoppingListItems,
    addItem,
    deleteItem,
    deleteAllItems,
  };
  return (
    <ShoppingListContext.Provider value={value}>
      {children}
    </ShoppingListContext.Provider>
  );
};
