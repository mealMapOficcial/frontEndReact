'use client';
import React, { useState } from 'react';
import Swal from 'sweetalert2'; // Asegúrate de instalar la librería: `npm install sweetalert2`

interface CartItem {
  name: string;
}

interface ShoppingCartProps {
  cartItems: CartItem[];
  removeFromCart: (name: string) => void;
}

const ShoppingCart: React.FC<ShoppingCartProps> = ({ cartItems, removeFromCart }) => {
  const [isVisible, setIsVisible] = useState(true); // Estado para mostrar/ocultar el carrito

  const handleOrder = () => {
    // Mostrar la alerta con SweetAlert2
    Swal.fire({
      title: 'Order Success!',
      text: 'Table 101',
      icon: 'success',
      confirmButtonText: 'OK',
    });
  };

  const handleCloseCart = () => {
    setIsVisible(false); // Ocultar el carrito
  };

  if (!isVisible) return null ; // No mostrar nada si el carrito está oculto

  return (
    <aside className="fixed right-0 top-0 w-80 h-full bg-gray-100 p-4 shadow-lg">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Shopping Cart</h2>
        <button onClick={handleCloseCart} className="text-dark-500 font-bold">
          X
        </button>
      </div>
      {cartItems.length === 0 ? (
        <p className="text-gray-500 mt-4">No items in the cart</p>
      ) : (
        <ul className="mt-4">
          {cartItems.map((item) => (
            <li key={item.name} className="mb-4">
              <details>
                <summary className="cursor-pointer flex items-center justify-between">
                  <h3 className="text-lg font-semibold">{item.name}</h3>
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
      )}

      {/* Botón de Ordenar */}
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
