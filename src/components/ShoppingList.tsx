import React from 'react';
import {Button, Text, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useShoppingList} from '../contexts/ShoppingListProvider';
import {NavProps} from '../ParamList';

export const ShoppingList: React.FC<NavProps<'ShoppingList'>> = ({
  navigation,
}) => {
  const {shoppingListItems} = useShoppingList();
  return (
    <View>
      <FlatList
        data={shoppingListItems}
        renderItem={({item}) => <Text key={item.id}>{item.name}</Text>}
      />
      <Button
        title="add new item"
        onPress={() => navigation.navigate('NewItem')}
      />
    </View>
  );
};
