import { useState } from 'react';
import { CartItem } from '@/app/shared/interfaces/CartItem';
import { Ingredient } from '../../../shared/interfaces/ingredients'
import axios from 'axios';

export const useCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartVisible, setIsCartVisible] = useState(false);

  const addToCart = (name: string, quantity: number, price: number, ingredients: Ingredient[], removedIngredients: number[]) => {
    const existingItem = cartItems.find((item) => item.name === name);
    const itemToAdd = { name, quantity, price, ingredients, removedIngredients }; // Agrega los ingredientes y removedIngredients
  
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.name === name ? { ...item, quantity: item.quantity + quantity } : item
        )
      );
    } else {
      setCartItems([...cartItems, itemToAdd]);
    }
    setIsCartVisible(true);
  };
  

  const removeFromCart = (name: string) => {
    setCartItems(cartItems.filter((item) => item.name !== name));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const handleCloseCart = () => {
    setIsCartVisible(false);
  };

  const getTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const placeOrder = async (quantityOfPeoples: number) => {
    const dishes = cartItems.map(item => ({
      name: item.name,
      ingredient: item.ingredients,
      notIngredients: [] // aquí puedes agregar la lógica para ingredientes no deseados
    }));

    const orderData = {
      quantityOfPeoples,
      dishes,
      drinks: [], // Aquí puedes agregar la lógica para bebidas opcionales
      totalPrice: getTotal(),
    };

    try {
      const response = await axios.post('http://localhost:3000/orders', orderData);
      return response.data; // Retorna la respuesta del servidor
    } catch (error) {
      console.error('Error placing order:', error);
      throw error; // Maneja el error adecuadamente
    }
  };

  return { cartItems, addToCart, removeFromCart, isCartVisible, handleCloseCart, clearCart, getTotal, placeOrder };
};
