'use client';

import Card from '@/app/ui/menu-dishes/components/cards';
import ShoppingCart from '@/app/ui/menu-shopping-card/components/shoppingCart';
import { useCart } from '@/app/ui/menu-dishes/hooks/useCart';

const dishesData = [
  {
    id: 1,
    name: "Bandeja Paisa",
    price: 20000,
    promotion: false,
    typeOfDishes: "AFTERNOON",
    ingredients: [
      {
        id: 1,
        name: "chicharron",
        price: 6000,
        measure: "lb"
      }
    ]
  },
  {
    id: 2,
    name: "Arepa",
    price: 5000,
    promotion: false,
    typeOfDishes: "MORNING",
    ingredients: [
      {
        id: 2,
        name: "maiz",
        price: 1000,
        measure: "kg"
      }
    ]
  },
  {
    id: 3,
    name: "Sancocho",
    price: 15000,
    promotion: true,
    typeOfDishes: "GENERAL",
    ingredients: [
      {
        id: 3,
        name: "pollo",
        price: 8000,
        measure: "lb"
      }
    ]
  }
];

export default function MenusPage() {
  const { cartItems, addToCart, removeFromCart, isCartVisible, handleCloseCart, clearCart, getTotal } = useCart();

  return (
    <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {dishesData.map(dish => (
        <Card
          key={dish.id}
          image="https://via.placeholder.com/150" // Aquí puedes poner una imagen real
          name={dish.name}
          description={`Price: $${dish.price.toFixed(2)}`}
          ingredients={dish.ingredients} // Pasar los ingredientes aquí
          addToCart={(name, quantity) => addToCart(name, quantity, dish.price)} // Asegúrate de pasar el precio
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
