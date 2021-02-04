import React from 'react';
import {createStackNavigator, HeaderTitle} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {ShoppingList} from './components/ShoppingList';
import {AddNewItem} from './components/AddNewItem';
import {ParamList} from './ParamList';

interface RoutesProps {}

const Stack = createStackNavigator<ParamList>();

export const Routes: React.FC<RoutesProps> = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="ShoppingList">
        <Stack.Screen
          options={{headerTitle: 'My shopping list'}}
          name="ShoppingList"
          component={ShoppingList}
        />
        <Stack.Screen
          options={{headerTitle: 'Add a new item'}}
          name="NewItem"
          component={AddNewItem}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
