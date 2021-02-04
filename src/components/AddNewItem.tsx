import React from 'react';
import {Text, View} from 'react-native';
import {NavProps} from '../ParamList';

export const AddNewItem: React.FC<NavProps<'NewItem'>> = ({navigation}) => {
  return (
    <View>
      <Text>Add a new item</Text>
    </View>
  );
};
