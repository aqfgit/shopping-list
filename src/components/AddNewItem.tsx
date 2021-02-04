import React, {useState} from 'react';
import {Button, Text, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {useShoppingList} from '../contexts/ShoppingListProvider';
import {NavProps} from '../ParamList';

export const AddNewItem: React.FC<NavProps<'NewItem'>> = ({navigation}) => {
  const [inputValue, setInputValue] = useState('');
  const {addItem} = useShoppingList();
  return (
    <View>
      <Text>Add a new item</Text>
      <TextInput
        value={inputValue}
        onChangeText={(text) => setInputValue(text)}
      />
      <Button
        title="Add new item"
        onPress={() => {
          addItem(inputValue);
          navigation.navigate('ShoppingList');
        }}
      />
    </View>
  );
};
