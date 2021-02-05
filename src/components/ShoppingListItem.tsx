import React, {useEffect, useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  ShoppingListItemType,
  useShoppingList,
} from '../contexts/ShoppingListProvider';
import {Feather} from '@expo/vector-icons';

interface ShoppingListItemProps {
  item: ShoppingListItemType;
}

export const ShoppingListItem: React.FC<ShoppingListItemProps> = ({item}) => {
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const {toggleItemComplete, deleteItem} = useShoppingList();

  useEffect(() => {
    setIsComplete(item.isComplete);
  }, [item.isComplete]);

  return (
    <TouchableOpacity
      style={styles.wrap}
      onLongPress={() => {
        setShowDeleteIcon((prevState) => !prevState);
      }}>
      <Text>{item.name}</Text>
      {showDeleteIcon ? (
        <Feather
          name="trash-2"
          size={30}
          color="firebrick"
          onPress={() => {
            deleteItem(item.id);
          }}
        />
      ) : (
        <Feather
          name={isComplete ? 'check-circle' : 'circle'}
          size={30}
          color="#525252"
          onPress={() => {
            toggleItemComplete(item.id);
          }}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderColor: '#d3d3d3',
  },
});
