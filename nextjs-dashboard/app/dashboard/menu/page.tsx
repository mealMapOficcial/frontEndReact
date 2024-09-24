'use client';

import { useEffect, useState } from 'react';
import Card from '@/app/ui/menu-dishes/components/cards';
import ShoppingCart from '@/app/ui/menu-shopping-card/components/shoppingCart';
import { useCart } from '@/app/ui/menu-dishes/hooks/useCart';
import useSocket from '@/app/ui/menu-dishes/hooks/useSocket';

interface Dish {
  id: number;
  name: string;
  price: number;
  promotion: boolean;
  typeOfDishes: string;
  ingredients: { id: number; name: string; price: number; measure: string }[];
  imageUrl: string; // Agrega la propiedad imageUrl
}

export default function MenusPage() {
  const { cartItems, addToCart, removeFromCart, isCartVisible, handleCloseCart, clearCart, getTotal } = useCart();
  const { data: dishesData } = useSocket("http://localhost:3000");

  const [dishes, setDishes] = useState<Dish[]>([]);

  useEffect(() => {
    console.log('dishesData:', dishesData); // Debugging
    if (dishesData && Array.isArray(dishesData.dishes)) {
      setDishes(dishesData.dishes);
    } else {
      console.warn('dishesData is not in the expected format:', dishesData);
    }
  }, [dishesData]);

  const handleAddToCart = (name: string, quantity: number, price: number) => {
    addToCart(name, quantity, price);
  };

  return (
    <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {dishes.length > 0 ? (
        dishes.map(dish => (
          <Card
            key={dish.id}
            image={dish.imageUrl} // Usa la propiedad imageUrl
            name={dish.name}
            description={`Price: $${dish.price.toFixed(2)}`}
            ingredients={dish.ingredients}
            addToCart={handleAddToCart}
          />
        ))
      ) : (
        <p>No dishes available.</p>
      )}

      {isCartVisible && (
        <ShoppingCart
          cartItems={cartItems}
          removeFromCart={removeFromCart}
          clearCart={clearCart}
          onClose={handleCloseCart}
          getTotal={getTotal}
        />
      )}
    </div>
  );
}
