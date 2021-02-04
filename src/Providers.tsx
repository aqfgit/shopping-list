import React from 'react';
import {ShoppingListProvider} from './contexts/ShoppingListProvider';
import {Routes} from './Routes';

export const Providers: React.FC = () => {
  return (
    <ShoppingListProvider>
      <Routes />
    </ShoppingListProvider>
  );
};
