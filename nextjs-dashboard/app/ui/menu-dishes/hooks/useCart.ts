// /app/ui/menu-dishes/hooks/useCart.ts

import { useState } from 'react';
import { CartItem } from '@/app/shared/interfaces/CartItem';

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartVisible, setIsCartVisible] = useState(false);

  const addToCart = (name: string, quantity: number) => {
    const existingItem = cartItems.find((item) => item.name === name);
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.name === name ? { ...item, quantity: item.quantity + quantity } : item
        )
      );
    } else {
      setCartItems([...cartItems, { name, quantity }]);
    }
    setIsCartVisible(true);
  };

  const removeFromCart = (name: string) => {
    setCartItems(cartItems.filter((item) => item.name !== name));
  };

  const handleCloseCart = () => {
    setIsCartVisible(false);
  };

  return { cartItems, addToCart, removeFromCart, isCartVisible, handleCloseCart };
};
