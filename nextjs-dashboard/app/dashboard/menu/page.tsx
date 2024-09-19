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
  const [isCartVisible, setIsCartVisible] = useState(false); // Controlar la visibilidad del carrito

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
    setIsCartVisible(true); // Mostrar el carrito cuando se añade un ítem
  };

  const removeFromCart = (name: string) => {
    setCartItems(cartItems.filter((item) => item.name !== name));
  };

  const handleCloseCart = () => {
    setIsCartVisible(false); // Cerrar el carrito
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
      {isCartVisible && (
        <ShoppingCart
          cartItems={cartItems}
          removeFromCart={removeFromCart}
          onClose={handleCloseCart} // Pasar la función para cerrar el carrito
        />
      )}
    </div>
  );
}
