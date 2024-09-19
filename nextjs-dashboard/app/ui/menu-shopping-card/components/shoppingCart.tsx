'use client';

import React from 'react';
import Swal from 'sweetalert2';
import { CartItem } from '@/app/shared/interfaces/CartItem';

interface ShoppingCartProps {
  cartItems: CartItem[];
  removeFromCart: (name: string) => void;
  clearCart: () => void;  // Añadimos clearCart como prop
  onClose: () => void;
}


const ShoppingCart: React.FC<ShoppingCartProps> = ({ cartItems, removeFromCart, onClose, clearCart }) => {
  const handleOrder = () => {
    Swal.fire({
      title: 'Order Success!',
      text: 'Table 101',
      icon: 'success',
      confirmButtonText: 'OK',
    }).then(() => {
      clearCart();  // Llamamos a clearCart para vaciar el carrito
      onClose();
    });
  };
  

  if (cartItems.length === 0) return null;

  return (
    <aside className="fixed right-0 top-0 w-80 h-full bg-gray-100 p-4 shadow-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Shopping Cart</h2>
        <button onClick={onClose} className="text-dark-500 font-bold">
          X
        </button>
      </div>
      <ul className="mt-4">
        {cartItems.map((item) => (
          <li key={item.name} className="mb-4">
            <details>
              <summary className="cursor-pointer flex items-center justify-between">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <span className="text-gray-700">Quantity: {item.quantity}</span>
              </summary>
              <button
                onClick={() => removeFromCart(item.name)}
                className="bg-red-500 text-white px-4 py-2 mt-2 rounded-lg"
              >
                Remove
              </button>
            </details>
          </li>
        ))}
      </ul>

      {cartItems.length > 0 && (
        <button
          onClick={handleOrder}
          className="bg-green-500 text-white w-full py-2 mt-6 rounded-lg"
        >
          Order
        </button>
      )}
    </aside>
  );
};

export default ShoppingCart;
;