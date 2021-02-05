import React, {useState} from 'react';
import {Alert, Text, View} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {useShoppingList} from '../contexts/ShoppingListProvider';
import {NavProps} from '../ParamList';
import {Autocomplete} from './Autocomplete';
import {StyleSheet} from 'react-native';

export const AddNewItem: React.FC<NavProps<'NewItem'>> = ({navigation}) => {
  const [inputValue, setInputValue] = useState('');
  const {addItem} = useShoppingList();

  return (
    <View style={styles.wrap}>
      <Autocomplete inputValue={inputValue} setInputValue={setInputValue}>
        <TextInput
          style={styles.input}
          value={inputValue}
          onChangeText={(text) => setInputValue(text)}
          autoFocus={true}
        />
      </Autocomplete>
      <View>
        <TouchableOpacity
          onPress={() => {
            if (inputValue.trim().length === 0) {
              Alert.alert('The input cannot be empty!');
              return;
            }
            addItem(inputValue);
            navigation.navigate('ShoppingList');
          }}
          style={styles.button}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    margin: 10,
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#175691',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 17,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    borderColor: '#000000',
  },
});
