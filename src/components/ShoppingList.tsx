import React from 'react';
import {Button, Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useShoppingList} from '../contexts/ShoppingListProvider';
import {NavProps} from '../ParamList';
import {ShoppingListItem} from './ShoppingListItem';

export const ShoppingList: React.FC<NavProps<'ShoppingList'>> = ({
  navigation,
}) => {
  const {shoppingListItems} = useShoppingList();
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
    </View>
  );
};
