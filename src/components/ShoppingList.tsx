import React from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useShoppingList} from '../contexts/ShoppingListProvider';
import {NavProps} from '../ParamList';
import ControlsButton from './ControlsButton';
import {ShoppingListItem} from './ShoppingListItem';

export const ShoppingList: React.FC<NavProps<'ShoppingList'>> = ({
  navigation,
}) => {
  const {shoppingListItems, deleteAllItems} = useShoppingList();
  return (
    <View style={styles.wrap}>
      <FlatList
        data={shoppingListItems}
        renderItem={({item}) => <ShoppingListItem item={item} />}
      />
      <View style={[styles.controls, styles.controlsDeleteAllButton]}>
        <ControlsButton
          text="Delete all"
          iconName="delete-sweep"
          iconColor="firebrick"
          iconSize={50}
          onPressHandler={() => {
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
      <View style={[styles.controls, styles.controlsAddButton]}>
        <ControlsButton
          iconName="library-add"
          onPressHandler={() => navigation.navigate('NewItem')}
          iconSize={50}
          iconColor="#327ace"
          text="Add new item"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
  },
  controls: {
    paddingHorizontal: 10,
    position: 'absolute',
    bottom: 40,
    zIndex: 2,
  },
  controlsAddButton: {
    right: 30,
  },
  controlsDeleteAllButton: {
    left: 30,
  },
});
