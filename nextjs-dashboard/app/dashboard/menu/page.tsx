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
}

export default function MenusPage() {
  const { cartItems, addToCart, removeFromCart, isCartVisible, handleCloseCart, clearCart, getTotal } = useCart();
  const socket = useSocket("localhost:3000");
  const [dishesData, setDishesData] = useState<Dish[]>([]);

  useEffect(() => {
    // Escuchar el evento para recibir platos
    console.log(socket.data)

    socket.socket?.on("message", (data : any[]) => { 
      console.log(data);
      setDishesData(data);});
    // socket.current?.on('menu-dishes', (data: Dish[]) => {
    //   setDishesData(data);
    // });

    return () => {
      // socket.current?.off('menu-dishes'); // Limpiar el evento al desmontar
    };
  }, [socket]);

  const handleAddToCart = (name: string, quantity: number, price: number) => {
    addToCart(name, quantity, price);

    // socket.current?.emit('addToCart', { dish: name, quantity });
  };

  return (
    <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {dishesData.map(dish => (
        <Card
          key={dish.id}
          image="https://via.placeholder.com/150"
          name={dish.name}
          description={`Price: $${dish.price.toFixed(2)}`}
          ingredients={dish.ingredients}
          addToCart={handleAddToCart}
        />
      ))}

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
