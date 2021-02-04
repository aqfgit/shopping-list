import {StackNavigationProp} from '@react-navigation/stack/lib/typescript/src/types';

export type ParamList = {
  ShoppingList: undefined;
  NewItem: undefined;
};

export type NavProps<T extends keyof ParamList> = {
  navigation: StackNavigationProp<ParamList, T>;
};
