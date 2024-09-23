import { useState } from 'react';
import { CartItem } from '@/app/shared/interfaces/CartItem';

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartVisible, setIsCartVisible] = useState(false);

  const addToCart = (name: string, quantity: number, price: number) => {
    const existingItem = cartItems.find((item) => item.name === name);
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.name === name ? { ...item, quantity: item.quantity + quantity } : item
        )
      );
    } else {
      setCartItems([...cartItems, { name, quantity, price }]);
    }
    setIsCartVisible(true);
  };

  const removeFromCart = (name: string) => {
    setCartItems(cartItems.filter((item) => item.name !== name));
  };

  const clearCart = () => {
    setCartItems([]); // Esta función vacía el carrito
  };

  const handleCloseCart = () => {
    setIsCartVisible(false);
  };

  const getTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return { cartItems, addToCart, removeFromCart, isCartVisible, handleCloseCart, clearCart, getTotal };
};
