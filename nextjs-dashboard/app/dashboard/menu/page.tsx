// /app/dashboard/menu/page.tsx
'use client';

import Card from '@/app/ui/menu-dishes/components/cards';
import ShoppingCart from '@/app/ui/menu-shopping-card/components/shoppingCart';
import { useCart } from '@/app/ui/menu-dishes/hooks/useCart';

export default function MenusPage() {
  const { cartItems, addToCart, removeFromCart, isCartVisible, handleCloseCart, clearCart, getTotal } = useCart();

  return (
    <div className="p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      <Card
        image="https://via.placeholder.com/150"
        name="Dish 1"
        description="This is a delicious dish."
        price={10.00}  // Incluye el precio
        addToCart={addToCart}
      />
      <Card
        image="https://via.placeholder.com/150"
        name="Dish 2"
        description="This is another tasty dish."
        price={15.00}  // Incluye el precio
        addToCart={addToCart}
      />
      <Card
        image="https://via.placeholder.com/150"
        name="Dish 3"
        description="Enjoy this amazing dish."
        price={20.00}  // Incluye el precio
        addToCart={addToCart}
      />

      {isCartVisible && (
        <ShoppingCart
          cartItems={cartItems}
          removeFromCart={removeFromCart}
          clearCart={clearCart}
          onClose={handleCloseCart}
          getTotal={getTotal}  // Pasar getTotal como prop
        />
      )}
    </div>
  );
}
