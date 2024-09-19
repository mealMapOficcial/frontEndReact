'use client';

import { useState } from 'react';
import Card from '@/app/ui/menu-dishes/cards';
import ShoppingCart from '@/app/ui/menu-shopping-card/shoppingCart';

interface CartItem {
  name: string;
  quantity: number;
}

export default function MenusPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (name: string, quantity: number) => {
    const existingItem = cartItems.find((item) => item.name === name);
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.name === name
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { name, quantity }]);
    }
  };

  const removeFromCart = (name: string) => {
    setCartItems(cartItems.filter((item) => item.name !== name));
  };

  const updateQuantity = (name: string, newQuantity: number) => {
    setCartItems(
      cartItems.map((item) =>
        item.name === name ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  return (
    <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <Card
        image="https://via.placeholder.com/150"
        name="Dish 1"
        description="This is a delicious dish."
        addToCart={addToCart}
      />
      <Card
        image="https://via.placeholder.com/150"
        name="Dish 2"
        description="This is another tasty dish."
        addToCart={addToCart}
      />
      <Card
        image="https://via.placeholder.com/150"
        name="Dish 3"
        description="Enjoy this amazing dish."
        addToCart={addToCart}
      />

      {/* Menú de carrito lateral */}
      {cartItems.length > 0 && (
        <ShoppingCart
          cartItems={cartItems}
          removeFromCart={removeFromCart}
        />
      )}
    </div>
  );
}
