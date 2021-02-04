import React from 'react';
import {Alert, Button, Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useShoppingList} from '../contexts/ShoppingListProvider';
import {NavProps} from '../ParamList';
import {ShoppingListItem} from './ShoppingListItem';

export const ShoppingList: React.FC<NavProps<'ShoppingList'>> = ({
  navigation,
}) => {
  const {shoppingListItems, deleteAllItems} = useShoppingList();
  return (
    <View>
      <FlatList
        data={shoppingListItems}
        renderItem={({item}) => <ShoppingListItem item={item} />}
      />
      <Button
        title="add new item"
        onPress={() => navigation.navigate('NewItem')}
      />
      <Button
        title="delete all items"
        onPress={() => {
          Alert.alert(
            'Warning',
            'Are you sure you wanna delete all items on the list?',
            [
              {
                text: 'Yes',
                onPress: () => {
                  deleteAllItems();
                },
              },
              {
                text: 'Cancel',
                style: 'cancel',
              },
            ],
          );
        }}
      />
    </View>
  );
};
