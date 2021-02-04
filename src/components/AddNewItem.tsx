import React, {useState} from 'react';
import {Alert, Button, Text, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {useShoppingList} from '../contexts/ShoppingListProvider';
import {NavProps} from '../ParamList';
import {Autocomplete} from './Autocomplete';
import {StyleSheet} from 'react-native';

export const AddNewItem: React.FC<NavProps<'NewItem'>> = ({navigation}) => {
  const [inputValue, setInputValue] = useState('');
  const {addItem} = useShoppingList();

  return (
    <View>
      <Text>Add a new item</Text>

      <Autocomplete inputValue={inputValue} setInputValue={setInputValue}>
        <TextInput
          style={styles.input}
          value={inputValue}
          onChangeText={(text) => setInputValue(text)}
          autoFocus={true}
        />
      </Autocomplete>
      <Button
        title="Add new item"
        onPress={() => {
          if (inputValue.trim().length === 0) {
            Alert.alert('The input cannot be empty!');
            return;
          }
          addItem(inputValue);
          navigation.navigate('ShoppingList');
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#000000',
  },
});
