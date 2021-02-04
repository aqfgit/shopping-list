import React from 'react';
import {Button, Text, View} from 'react-native';
import {NavProps} from '../ParamList';

export const ShoppingList: React.FC<NavProps<'ShoppingList'>> = ({
  navigation,
}) => {
  return (
    <View>
      <Text>My shopping list here</Text>
      <Button
        title="add new item"
        onPress={() => navigation.navigate('NewItem')}
      />
    </View>
  );
};
